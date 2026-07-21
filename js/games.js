// ========================================
// Mini-Games Module
// ========================================
window.GamesModule = {
    init() {},

    render() {
        const container = document.getElementById('games-content');
        if (!container) return;
        container.innerHTML = this.renderMenu();
        document.getElementById('game-memory')?.addEventListener('click', () => this.startMemory(container));
        document.getElementById('game-speed')?.addEventListener('click', () => this.startSpeed(container));
    },

    renderMenu() {
        return `
            <div style="max-width:600px; margin:0 auto; text-align:center;">
                <div style="font-size:48px; margin-bottom:16px;">🎮</div>
                <h2>${I18n.t('games_title')}</h2>
                <div class="exam-type-grid" style="margin-top:24px;">
                    <div class="exam-type-card" id="game-memory">
                        <div class="exam-type-icon">🃏</div>
                        <div class="exam-type-title">${I18n.t('games_memory')}</div>
                        <div class="exam-type-desc">${I18n.t('games_memory_desc')}</div>
                    </div>
                    <div class="exam-type-card" id="game-speed">
                        <div class="exam-type-icon">⚡</div>
                        <div class="exam-type-title">${I18n.t('games_speed')}</div>
                        <div class="exam-type-desc">${I18n.t('games_speed_desc')}</div>
                    </div>
                </div>
            </div>`;
    },

    // ---- MEMORY GAME ----
    startMemory(container) {
        const level = LevelFilter.get();
        const pool = level === 'N4' ? AppData.kanjiN4 : level === 'N5' ? AppData.kanjiN5 : [...AppData.kanjiN5, ...AppData.kanjiN4];
        const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, 6);
        const cards = [...selected.map(k => ({id:k.kanji,type:'kanji',text:k.kanji})),
                       ...selected.map(k => ({id:k.kanji,type:'meaning',text:L(k,'meaning')}))].sort(() => Math.random() - 0.5);

        let flipped = [], matched = [], moves = 0;

        const render = () => {
            container.innerHTML = `
                <div class="quiz-top-bar">
                    <span style="font-size:14px; color:var(--text-secondary);">Moves: ${moves} | Matched: ${matched.length/2}/${selected.length}</span>
                    <button class="btn btn-secondary btn-sm" id="mem-quit">${I18n.t('back')}</button>
                </div>
                <div class="memory-grid">
                    ${cards.map((c,i) => {
                        const isFlipped = flipped.includes(i) || matched.includes(i);
                        return `<div class="memory-card ${isFlipped ? 'flipped' : ''} ${matched.includes(i) ? 'matched' : ''}" data-idx="${i}">
                            <div class="memory-card-inner">
                                <div class="memory-card-front">?</div>
                                <div class="memory-card-back">${c.text}</div>
                            </div>
                        </div>`;
                    }).join('')}
                </div>`;

            container.querySelectorAll('.memory-card:not(.matched)').forEach(card => {
                card.addEventListener('click', () => {
                    const idx = parseInt(card.dataset.idx);
                    if (flipped.includes(idx) || flipped.length >= 2) return;
                    flipped.push(idx);
                    render();

                    if (flipped.length === 2) {
                        moves++;
                        const [a, b] = flipped;
                        if (cards[a].id === cards[b].id && cards[a].type !== cards[b].type) {
                            matched.push(a, b);
                            flipped = [];
                            setTimeout(() => {
                                if (matched.length === cards.length) {
                                    container.innerHTML = `<div class="quiz-container" style="text-align:center;">
                                        <div style="font-size:48px;">🎉</div>
                                        <h2>${I18n.t('correct')}</h2>
                                        <p>${moves} moves</p>
                                        <button class="btn btn-primary" id="mem-retry" style="margin-top:16px;">${I18n.t('retry')}</button>
                                    </div>`;
                                    document.getElementById('mem-retry')?.addEventListener('click', () => GamesModule.startMemory(container));
                                } else { render(); }
                            }, 300);
                        } else {
                            setTimeout(() => { flipped = []; render(); }, 800);
                        }
                    }
                });
            });

            document.getElementById('mem-quit')?.addEventListener('click', () => this.render());
        };
        render();
    },

    // ---- SPEED QUIZ ----
    startSpeed(container) {
        const level = LevelFilter.get();
        const pool = level === 'N4' ? AppData.kanjiN4 : level === 'N5' ? AppData.kanjiN5 : [...AppData.kanjiN5, ...AppData.kanjiN4];
        const questions = [...pool].sort(() => Math.random() - 0.5).slice(0, 20);
        let current = 0, score = 0, timeLeft = 60;

        const timer = setInterval(() => {
            timeLeft--;
            const el = document.getElementById('speed-timer');
            if (el) el.textContent = timeLeft + 's';
            if (timeLeft <= 0) { clearInterval(timer); showResult(); }
        }, 1000);

        const showResult = () => {
            container.innerHTML = `<div class="quiz-container" style="text-align:center;">
                <div class="quiz-score-value">${score}</div>
                <div class="quiz-score-label">${I18n.t('good_answers')} (60s)</div>
                <button class="btn btn-primary" id="speed-retry" style="margin-top:16px;">${I18n.t('retry')}</button>
                <button class="btn btn-secondary" id="speed-back" style="margin-top:16px;">${I18n.t('back')}</button>
            </div>`;
            document.getElementById('speed-retry')?.addEventListener('click', () => GamesModule.startSpeed(container));
            document.getElementById('speed-back')?.addEventListener('click', () => GamesModule.render());
        };

        const renderQ = () => {
            if (current >= questions.length) { current = 0; questions.sort(() => Math.random() - 0.5); }
            const q = questions[current];
            const wrongs = [...pool].filter(x => x.kanji !== q.kanji).sort(() => Math.random() - 0.5).slice(0, 3);
            const choices = [q, ...wrongs].sort(() => Math.random() - 0.5);

            container.innerHTML = `
                <div class="quiz-container">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <span style="font-size:24px; font-weight:700; color:var(--accent);">${score}</span>
                        <span id="speed-timer" style="font-size:20px; font-weight:700; color:${timeLeft <= 10 ? 'var(--danger)' : 'var(--text-secondary)'};">${timeLeft}s</span>
                    </div>
                    <div class="quiz-card">
                        <div class="quiz-prompt">${q.kanji}</div>
                    </div>
                    <div class="quiz-options">
                        ${choices.map(c => `<button class="quiz-option" data-answer="${L(c,'meaning')}">${L(c,'meaning')}</button>`).join('')}
                    </div>
                </div>`;

            container.querySelectorAll('.quiz-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    const isCorrect = opt.dataset.answer === L(q,'meaning');
                    if (isCorrect) { score++; }
                    Storage.recordStudy('kanji', q.kanji, isCorrect);
                    current++;
                    renderQ();
                });
            });
        };
        renderQ();
    },

    // ---- WORD OF THE DAY ----
    getWordOfDay() {
        const allWords = [...AppData.vocabN5, ...AppData.vocabN4].flatMap(t => t.words);
        const dayIndex = Math.floor(Date.now() / 86400000) % allWords.length;
        return allWords[dayIndex];
    },

    renderWordOfDay() {
        const w = this.getWordOfDay();
        return `<div class="wod-widget">
            <div class="wod-label">${I18n.t('word_of_day')}</div>
            <div class="wod-word">${F(w.kanji, w.kana) || w.kana}</div>
            <div class="wod-reading">${w.kanji ? w.kana : ''}</div>
            <div class="wod-meaning">${L(w,'meaning')}</div>
        </div>`;
    }
};
