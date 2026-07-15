// ========================================
// Kanji Module
// ========================================

window.KanjiModule = {
    currentTab: 'kanji-list',
    flashcardIndex: 0,
    flashcardList: [],
    quizState: null,

    init() {
        document.querySelectorAll('.kanji-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.kanji-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                this.render();
            });
        });
        this.render();
    },

    getFilteredKanji() {
        const level = LevelFilter.get();
        if (level === 'N5') return AppData.kanjiN5.map(k => ({...k, level:'N5'}));
        if (level === 'N4') return AppData.kanjiN4.map(k => ({...k, level:'N4'}));
        return [
            ...AppData.kanjiN5.map(k => ({...k, level:'N5'})),
            ...AppData.kanjiN4.map(k => ({...k, level:'N4'}))
        ];
    },

    render() {
        const container = document.getElementById('kanji-content');
        switch (this.currentTab) {
            case 'kanji-list': this.renderList(container); break;
            case 'kanji-flashcard': this.renderFlashcards(container); break;
            case 'kanji-quiz': this.renderQuiz(container); break;
        }
    },

    renderList(container) {
        const kanji = this.getFilteredKanji();
        const uniqueKanji = [];
        const seen = new Set();
        kanji.forEach(k => { if (!seen.has(k.kanji)) { seen.add(k.kanji); uniqueKanji.push(k); }});

        container.innerHTML = `
            <div class="filter-bar">
                <input type="text" class="search-input" id="kanji-search" placeholder="Rechercher un kanji ou sa signification...">
                <span style="color:var(--text-muted); font-size:13px;">${uniqueKanji.length} kanji</span>
            </div>
            <div class="kanji-grid" id="kanji-grid">
                ${uniqueKanji.map(k => {
                    const st = Storage.getItemStatus('kanji', k.kanji);
                    const cls = st && st.level >= 4 ? 'mastered' : '';
                    return `
                    <div class="kanji-card-mini ${cls}" data-kanji="${k.kanji}">
                        <span class="kanji-char">${k.kanji}</span>
                        <span class="kanji-meaning">${k.meaning}</span>
                        <span class="kanji-level-tag ${k.level.toLowerCase()}">${k.level}</span>
                    </div>`;
                }).join('')}
            </div>`;

        document.getElementById('kanji-search').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            container.querySelectorAll('.kanji-card-mini').forEach(card => {
                const kanji = card.dataset.kanji;
                const kData = uniqueKanji.find(k => k.kanji === kanji);
                const match = kanji.includes(q) || kData.meaning.toLowerCase().includes(q) ||
                              kData.on.toLowerCase().includes(q) || kData.kun.toLowerCase().includes(q);
                card.style.display = match ? '' : 'none';
            });
        });

        container.querySelectorAll('.kanji-card-mini').forEach(card => {
            card.addEventListener('click', () => {
                const kData = uniqueKanji.find(k => k.kanji === card.dataset.kanji);
                this.showKanjiDetail(kData);
            });
        });
    },

    showKanjiDetail(k) {
        App.showModal(`
            <div style="text-align:center;">
                <div style="font-size:100px; font-family:'Noto Sans JP'; font-weight:700; margin-bottom:8px;">${k.kanji}</div>
                <span class="kanji-level-tag ${k.level.toLowerCase()}" style="font-size:13px; padding:4px 12px;">${k.level}</span>
                <div style="margin-top:16px;">
                    <div style="font-size:20px; color:var(--accent-light); margin-bottom:4px;">${k.meaning}</div>
                    <div style="font-size:14px; color:var(--text-secondary); margin-bottom:4px;">
                        <strong>ON:</strong> ${k.on || '-'} &nbsp; <strong>KUN:</strong> ${k.kun || '-'}
                    </div>
                </div>
                <div style="margin-top:20px; text-align:left;">
                    <h4 style="margin-bottom:8px; color:var(--text-secondary);">Exemples :</h4>
                    ${k.examples.map(ex => `
                        <div style="background:var(--bg-input); padding:8px 12px; border-radius:8px; margin-bottom:6px; font-size:14px; font-family:'Noto Sans JP','Inter',sans-serif;">
                            ${ex}
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
    },

    renderFlashcards(container) {
        const kanji = this.getFilteredKanji();
        const uniqueKanji = [];
        const seen = new Set();
        kanji.forEach(k => { if (!seen.has(k.kanji)) { seen.add(k.kanji); uniqueKanji.push(k); }});

        if (this.flashcardList.length === 0 || this.flashcardList[0]?.level !== kanji[0]?.level) {
            this.flashcardList = uniqueKanji.sort(() => Math.random() - 0.5);
            this.flashcardIndex = 0;
        }

        if (this.flashcardList.length === 0) {
            container.innerHTML = '<div class="empty-state">Aucun kanji disponible pour ce niveau.</div>';
            return;
        }

        const k = this.flashcardList[this.flashcardIndex];

        container.innerHTML = `
            <div class="flashcard-container">
                <div class="flashcard" id="kanji-flashcard">
                    <div class="flashcard-face">
                        <div class="flashcard-char">${k.kanji}</div>
                        <span class="kanji-level-tag ${k.level.toLowerCase()}">${k.level}</span>
                        <div style="margin-top:16px; font-size:14px; color:var(--text-muted);">Cliquez pour retourner</div>
                    </div>
                    <div class="flashcard-face flashcard-back">
                        <div class="flashcard-char" style="font-size:60px;">${k.kanji}</div>
                        <div class="flashcard-meaning">${k.meaning}</div>
                        <div class="flashcard-reading">ON: ${k.on || '-'} | KUN: ${k.kun || '-'}</div>
                        <div class="flashcard-examples">
                            ${k.examples.slice(0, 3).map(e => `<div>${e}</div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="srs-buttons" id="srs-btns" style="display:none;">
                    <button class="srs-btn again" data-score="0">A revoir</button>
                    <button class="srs-btn hard" data-score="1">Difficile</button>
                    <button class="srs-btn good" data-score="2">Bien</button>
                    <button class="srs-btn easy" data-score="3">Facile</button>
                </div>
                <div class="flashcard-nav">
                    <button class="btn btn-secondary" id="fc-prev">Precedent</button>
                    <span class="flashcard-counter">${this.flashcardIndex + 1} / ${this.flashcardList.length}</span>
                    <button class="btn btn-secondary" id="fc-next">Suivant</button>
                </div>
                <div style="text-align:center; margin-top:16px;">
                    <button class="btn btn-secondary btn-sm" id="fc-shuffle">Melanger</button>
                </div>
            </div>`;

        const flashcard = document.getElementById('kanji-flashcard');
        const srsBtns = document.getElementById('srs-btns');

        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
            if (flashcard.classList.contains('flipped')) {
                srsBtns.style.display = 'flex';
            }
        });

        srsBtns.querySelectorAll('.srs-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const score = parseInt(btn.dataset.score);
                Storage.recordStudy('kanji', k.kanji, score >= 2);
                App.toast(score >= 2 ? 'Bien note !' : 'A revoir bientot', score >= 2 ? 'success' : 'info');
                this.flashcardIndex = (this.flashcardIndex + 1) % this.flashcardList.length;
                this.renderFlashcards(container);
            });
        });

        document.getElementById('fc-prev').addEventListener('click', () => {
            this.flashcardIndex = (this.flashcardIndex - 1 + this.flashcardList.length) % this.flashcardList.length;
            this.renderFlashcards(container);
        });
        document.getElementById('fc-next').addEventListener('click', () => {
            this.flashcardIndex = (this.flashcardIndex + 1) % this.flashcardList.length;
            this.renderFlashcards(container);
        });
        document.getElementById('fc-shuffle').addEventListener('click', () => {
            this.flashcardList.sort(() => Math.random() - 0.5);
            this.flashcardIndex = 0;
            this.renderFlashcards(container);
        });
    },

    renderQuiz(container) {
        if (!this.quizState) {
            const kanji = this.getFilteredKanji();
            const uniqueKanji = [];
            const seen = new Set();
            kanji.forEach(k => { if (!seen.has(k.kanji)) { seen.add(k.kanji); uniqueKanji.push(k); }});

            const shuffled = uniqueKanji.sort(() => Math.random() - 0.5).slice(0, 15);
            this.quizState = { questions: shuffled, current: 0, score: 0, answers: [] };
        }

        const qs = this.quizState;

        if (qs.current >= qs.questions.length) {
            this.renderQuizResults(container);
            return;
        }

        const q = qs.questions[qs.current];
        const pct = (qs.current / qs.questions.length) * 100;

        // Generate 4 choices
        const allKanji = this.getFilteredKanji();
        const wrong = allKanji.filter(k => k.kanji !== q.kanji)
            .sort(() => Math.random() - 0.5).slice(0, 3);
        const choices = [q, ...wrong].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-progress">
                    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                    <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt">${q.kanji}</div>
                    <div class="quiz-hint">Quelle est la signification ?</div>
                </div>
                <div class="quiz-options">
                    ${choices.map(c => `
                        <button class="quiz-option" data-answer="${c.meaning}">${c.meaning}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="kanji-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="kanji-next" style="display:none">Suivant</button>
                </div>
            </div>`;

        const feedback = document.getElementById('kanji-feedback');
        const nextBtn = document.getElementById('kanji-next');
        let answered = false;

        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const correct = opt.dataset.answer === q.meaning;
                qs.answers.push({ kanji: q.kanji, correct, expected: q.meaning });

                if (correct) {
                    qs.score++;
                    opt.classList.add('correct');
                    feedback.className = 'quiz-feedback show correct-fb';
                    feedback.textContent = `Correct ! ${q.kanji} = ${q.meaning}`;
                } else {
                    opt.classList.add('incorrect');
                    container.querySelector(`[data-answer="${q.meaning}"]`)?.classList.add('correct');
                    feedback.className = 'quiz-feedback show incorrect-fb';
                    feedback.innerHTML = `Incorrect. ${q.kanji} = <strong>${q.meaning}</strong> (ON: ${q.on}, KUN: ${q.kun})`;
                }

                Storage.recordStudy('kanji', q.kanji, correct);
                nextBtn.style.display = 'inline-flex';
            });
        });

        nextBtn.addEventListener('click', () => {
            qs.current++;
            this.renderQuiz(container);
        });
    },

    renderQuizResults(container) {
        const qs = this.quizState;
        const pct = Math.round((qs.score / qs.questions.length) * 100);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} bonnes reponses</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-primary" id="kanji-retry">Recommencer</button>
                        <button class="btn btn-secondary" id="kanji-back-list">Retour a la liste</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('kanji-retry')?.addEventListener('click', () => {
            this.quizState = null;
            this.renderQuiz(container);
        });
        document.getElementById('kanji-back-list')?.addEventListener('click', () => {
            this.quizState = null;
            this.currentTab = 'kanji-list';
            document.querySelectorAll('.kanji-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.kanji-tabs .tab-btn[data-tab="kanji-list"]').classList.add('active');
            this.render();
        });

        App.updateDashboard();
    }
};
