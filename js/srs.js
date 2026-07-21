// ========================================
// SRS (Spaced Repetition System) — SM-2 Algorithm
// ========================================

window.SRS = {
    init() {},

    // SM-2 algorithm: calculate next review
    calcNext(card) {
        // card: { ease, interval, repetitions, due }
        // Returns updated card
        const now = Date.now();
        if (!card) return { ease: 2.5, interval: 1, repetitions: 0, due: now };
        return card;
    },

    // Record a review with quality (0-5)
    review(type, id, quality) {
        const key = 'nihongo_srs';
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        const cardKey = `${type}_${id}`;
        const card = data[cardKey] || { ease: 2.5, interval: 1, repetitions: 0, due: 0 };

        if (quality >= 3) {
            // Correct
            if (card.repetitions === 0) card.interval = 1;
            else if (card.repetitions === 1) card.interval = 6;
            else card.interval = Math.round(card.interval * card.ease);
            card.repetitions++;
        } else {
            // Incorrect — reset
            card.repetitions = 0;
            card.interval = 1;
        }

        // Update ease factor
        card.ease = Math.max(1.3, card.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
        card.due = Date.now() + card.interval * 24 * 60 * 60 * 1000;
        card.lastReview = Date.now();

        data[cardKey] = card;
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Get all cards due for review
    getDueCards() {
        const data = JSON.parse(localStorage.getItem('nihongo_srs') || '{}');
        const now = Date.now();
        const due = [];
        for (const [key, card] of Object.entries(data)) {
            if (card.due <= now) {
                const [type, ...idParts] = key.split('_');
                due.push({ type, id: idParts.join('_'), ...card });
            }
        }
        return due;
    },

    getDueCount() {
        return this.getDueCards().length;
    },

    // Render SRS review section on dashboard
    renderWidget() {
        const due = this.getDueCount();
        if (due === 0) {
            return `<div class="srs-widget">
                <div class="srs-widget-icon">&#x2705;</div>
                <div class="srs-widget-text">${I18n.t('srs_no_review')}</div>
            </div>`;
        }
        return `<div class="srs-widget has-reviews">
            <div class="srs-widget-icon">&#x1F4DA;</div>
            <div class="srs-widget-text"><strong>${due}</strong> ${I18n.t('srs_cards_due')}</div>
            <button class="btn btn-primary btn-sm" id="srs-start-review">${I18n.t('start')}</button>
        </div>`;
    }
};

// Hook into existing Storage.recordStudy to also feed SRS
const _origRecordStudy = Storage.recordStudy.bind(Storage);
Storage.recordStudy = function(type, id, correct) {
    _origRecordStudy(type, id, correct);
    SRS.review(type, id, correct ? 4 : 1);
};
