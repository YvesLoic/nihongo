// ========================================
// Badges / Achievements System
// ========================================

window.Badges = {
    definitions: [
        { id: 'first_kanji', icon: '&#x6F22;', nameFr: 'Premier kanji', nameEn: 'First kanji', descFr: 'Etudier votre premier kanji', descEn: 'Study your first kanji', check: p => Object.keys(p.kanji || {}).length >= 1 },
        { id: 'kanji_10', icon: '&#x1F3AF;', nameFr: '10 kanji', nameEn: '10 kanji', descFr: 'Etudier 10 kanji', descEn: 'Study 10 kanji', check: p => Object.keys(p.kanji || {}).length >= 10 },
        { id: 'kanji_50', icon: '&#x1F31F;', nameFr: '50 kanji', nameEn: '50 kanji', descFr: 'Etudier 50 kanji', descEn: 'Study 50 kanji', check: p => Object.keys(p.kanji || {}).length >= 50 },
        { id: 'kanji_100', icon: '&#x1F451;', nameFr: '100 kanji', nameEn: '100 kanji', descFr: 'Etudier 100 kanji', descEn: 'Study 100 kanji', check: p => Object.keys(p.kanji || {}).length >= 100 },
        { id: 'vocab_10', icon: '&#x1F4D6;', nameFr: '10 mots', nameEn: '10 words', descFr: 'Etudier 10 mots de vocabulaire', descEn: 'Study 10 vocabulary words', check: p => Object.keys(p.vocab || {}).length >= 10 },
        { id: 'vocab_50', icon: '&#x1F4DA;', nameFr: '50 mots', nameEn: '50 words', descFr: 'Etudier 50 mots', descEn: 'Study 50 words', check: p => Object.keys(p.vocab || {}).length >= 50 },
        { id: 'vocab_100', icon: '&#x1F4AF;', nameFr: '100 mots', nameEn: '100 words', descFr: '100 mots etudies', descEn: '100 words studied', check: p => Object.keys(p.vocab || {}).length >= 100 },
        { id: 'vocab_300', icon: '&#x1F525;', nameFr: '300 mots', nameEn: '300 words', descFr: '300 mots etudies', descEn: '300 words studied', check: p => Object.keys(p.vocab || {}).length >= 300 },
        { id: 'grammar_5', icon: '&#x6587;', nameFr: '5 grammaires', nameEn: '5 grammar', descFr: 'Etudier 5 points de grammaire', descEn: 'Study 5 grammar points', check: p => Object.keys(p.grammar || {}).length >= 5 },
        { id: 'grammar_20', icon: '&#x1F4DD;', nameFr: '20 grammaires', nameEn: '20 grammar', descFr: '20 points de grammaire', descEn: '20 grammar points', check: p => Object.keys(p.grammar || {}).length >= 20 },
        { id: 'kana_master', icon: '&#x3042;', nameFr: 'Kana complet', nameEn: 'Kana master', descFr: 'Etudier tous les kana', descEn: 'Study all kana', check: p => Object.keys(p.kana || {}).length >= 100 },
        { id: 'streak_3', icon: '&#x1F525;', nameFr: '3 jours', nameEn: '3-day streak', descFr: 'Serie de 3 jours', descEn: '3-day study streak', check: p => (p.streak || 0) >= 3 },
        { id: 'streak_7', icon: '&#x1F31F;', nameFr: '7 jours', nameEn: '7-day streak', descFr: 'Serie de 7 jours', descEn: '7-day study streak', check: p => (p.streak || 0) >= 7 },
        { id: 'streak_30', icon: '&#x1F3C6;', nameFr: '30 jours', nameEn: '30-day streak', descFr: 'Serie de 30 jours !', descEn: '30-day study streak!', check: p => (p.streak || 0) >= 30 },
        { id: 'total_100', icon: '&#x2B50;', nameFr: '100 elements', nameEn: '100 items', descFr: '100 elements etudies au total', descEn: '100 total items studied', check: p => { const t = Object.keys(p.kana||{}).length + Object.keys(p.kanji||{}).length + Object.keys(p.grammar||{}).length + Object.keys(p.vocab||{}).length; return t >= 100; }},
        { id: 'total_500', icon: '&#x1F48E;', nameFr: '500 elements', nameEn: '500 items', descFr: '500 elements etudies !', descEn: '500 total items studied!', check: p => { const t = Object.keys(p.kana||{}).length + Object.keys(p.kanji||{}).length + Object.keys(p.grammar||{}).length + Object.keys(p.vocab||{}).length; return t >= 500; }},
    ],

    init() {
        this.checkAll();
    },

    getUnlocked() {
        return JSON.parse(localStorage.getItem('nihongo_badges') || '[]');
    },

    unlock(badgeId) {
        const unlocked = this.getUnlocked();
        if (!unlocked.includes(badgeId)) {
            unlocked.push(badgeId);
            localStorage.setItem('nihongo_badges', JSON.stringify(unlocked));
            const badge = this.definitions.find(b => b.id === badgeId);
            if (badge) {
                App.toast(`${badge.icon} ${I18n.locale === 'en' ? badge.nameEn : badge.nameFr}`, 'success');
            }
        }
    },

    checkAll() {
        const progress = Storage.getProgress();
        this.definitions.forEach(b => {
            if (b.check(progress)) this.unlock(b.id);
        });
    },

    renderWidget() {
        const unlocked = this.getUnlocked();
        const count = unlocked.length;
        const total = this.definitions.length;
        return `<div class="badges-widget">
            <div class="badges-widget-header">
                <span>${I18n.t('badges_title')}</span>
                <span class="badges-count">${count}/${total}</span>
            </div>
            <div class="badges-grid">
                ${this.definitions.map(b => {
                    const isUnlocked = unlocked.includes(b.id);
                    return `<div class="badge-item ${isUnlocked ? 'unlocked' : 'locked'}" title="${isUnlocked ? (I18n.locale === 'en' ? b.descEn : b.descFr) : I18n.t('badges_locked')}">
                        <span class="badge-icon">${b.icon}</span>
                        <span class="badge-name">${I18n.locale === 'en' ? b.nameEn : b.nameFr}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }
};
