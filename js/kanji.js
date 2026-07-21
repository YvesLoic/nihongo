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
                <input type="text" class="search-input" id="kanji-search" placeholder="${I18n.t('kanji_search')}">
                <span style="color:var(--text-muted); font-size:13px;">${uniqueKanji.length} kanji</span>
            </div>
            <div class="kanji-grid" id="kanji-grid">
                ${uniqueKanji.map(k => {
                    const st = Storage.getItemStatus('kanji', k.kanji);
                    const cls = st && st.level >= 4 ? 'mastered' : '';
                    return `
                    <div class="kanji-card-mini ${cls}" data-kanji="${k.kanji}">
                        <span class="kanji-char">${k.kanji}</span>
                        <span class="kanji-meaning">${L(k,"meaning")}</span>
                        <span class="kanji-level-tag ${k.level.toLowerCase()}">${k.level}</span>
                    </div>`;
                }).join('')}
            </div>`;

        document.getElementById('kanji-search').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            container.querySelectorAll('.kanji-card-mini').forEach(card => {
                const kanji = card.dataset.kanji;
                const kData = uniqueKanji.find(k => k.kanji === kanji);
                const match = kanji.includes(q) || L(kData,"meaning").toLowerCase().includes(q) ||
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
                    <div style="font-size:20px; color:var(--accent-light); margin-bottom:4px;">${L(k,"meaning")}</div>
                    <div style="font-size:14px; color:var(--text-secondary); margin-bottom:4px;">
                        <strong>ON:</strong> ${k.on || '-'} &nbsp; <strong>KUN:</strong> ${k.kun || '-'}
                    </div>
                </div>
                <div style="margin-top:20px; text-align:left;">
                    <h4 style="margin-bottom:8px; color:var(--text-secondary);">${I18n.t('kanji_examples')}</h4>
                    ${(I18n.locale==="en"?k.examplesEn:k.examplesFr).map(ex => `
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
            container.innerHTML = `<div class="empty-state">${I18n.t('kanji_no_data')}</div>`;
            return;
        }

        const k = this.flashcardList[this.flashcardIndex];

        container.innerHTML = `
            <div class="flashcard-container">
                <div class="flashcard" id="kanji-flashcard">
                    <div class="flashcard-face">
                        <div class="flashcard-char">${k.kanji}</div>
                        <span class="kanji-level-tag ${k.level.toLowerCase()}">${k.level}</span>
                        <div style="margin-top:12px; font-size:14px; color:var(--text-muted);">${I18n.t('click_to_flip')}</div>
                    </div>
                    <div class="flashcard-face flashcard-back">
                        <div class="flashcard-char" style="font-size:48px;">${k.kanji}</div>
                        <div class="flashcard-meaning">${L(k,"meaning")}</div>
                        <div class="flashcard-reading">ON: ${k.on || '-'} | KUN: ${k.kun || '-'}</div>
                        <div class="flashcard-examples">
                            ${(I18n.locale==="en"?k.examplesEn:k.examplesFr).slice(0, 3).map(e => `<div>${e}</div>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="srs-buttons" id="srs-btns" style="display:none;">
                    <button class="srs-btn again" data-score="0">${I18n.t('srs_again')}</button>
                    <button class="srs-btn hard" data-score="1">${I18n.t('srs_hard')}</button>
                    <button class="srs-btn good" data-score="2">${I18n.t('srs_good')}</button>
                    <button class="srs-btn easy" data-score="3">${I18n.t('srs_easy')}</button>
                </div>
                <div class="flashcard-nav">
                    <button class="btn btn-secondary" id="fc-prev">${I18n.t('previous')}</button>
                    <span class="flashcard-counter">${this.flashcardIndex + 1} / ${this.flashcardList.length}</span>
                    <button class="btn btn-secondary" id="fc-next">${I18n.t('next')}</button>
                </div>
                <div style="text-align:center; margin-top:16px; display:flex; gap:8px; justify-content:center;">
                    <button class="btn btn-secondary btn-sm" id="fc-shuffle">${I18n.t('shuffle')}</button>
                    <button class="btn btn-secondary btn-sm" id="kfc-speak">&#x1F50A; ${I18n.t('listen')}</button>
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
                App.toast(score >= 2 ? I18n.t('srs_noted_good') : I18n.t('srs_review_soon'), score >= 2 ? 'success' : 'info');
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

        // TTS - read kanji aloud
        const speakKanji = (e) => {
            e.stopPropagation();
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
                const reading = k.kun ? k.kun.split('、')[0].replace(/[-.]/g, '') : (k.on ? k.on.split('、')[0] : k.kanji);
                const u = new SpeechSynthesisUtterance(reading);
                u.lang = 'ja-JP';
                u.rate = 0.8;
                speechSynthesis.speak(u);
            } else {
                App.toast(I18n.t('tts_unsupported'), 'error');
            }
        };
        document.getElementById('kfc-speak')?.addEventListener('click', speakKanji);
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

        const allKanji = this.getFilteredKanji();
        const wrong = allKanji.filter(k => k.kanji !== q.kanji)
            .sort(() => Math.random() - 0.5).slice(0, 3);
        const choices = [q, ...wrong].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-top-bar">
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                        <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm quiz-quit-btn" id="kanji-quit">${I18n.t('quiz_quit')}</button>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt">${q.kanji}</div>
                    <div class="quiz-hint">${I18n.t('kanji_what_meaning')}</div>
                </div>
                <div class="quiz-options">
                    ${choices.map(c => `
                        <button class="quiz-option" data-answer="${L(c,"meaning")}">${L(c,"meaning")}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="kanji-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="kanji-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const feedback = document.getElementById('kanji-feedback');
        const nextBtn = document.getElementById('kanji-next');
        let answered = false;

        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const correct = opt.dataset.answer === L(q,"meaning");
                qs.answers.push({ kanji: q.kanji, correct, expected: L(q,"meaning") });

                if (correct) {
                    qs.score++;
                    opt.classList.add('correct');
                    feedback.className = 'quiz-feedback show correct-fb';
                    speakJP(q.kun ? q.kun.split('、')[0].replace(/[-.]/g,'') : q.on || q.kanji);
                    feedback.innerHTML = `${I18n.t('correct')} ${q.kanji} = ${L(q,"meaning")}<br><span style="font-size:13px; opacity:0.85;">ON: ${q.on || '-'} | KUN: ${q.kun || '-'}</span>`;
                } else {
                    opt.classList.add('incorrect');
                    container.querySelector(`[data-answer="${L(q,"meaning")}"]`)?.classList.add('correct');
                    feedback.className = 'quiz-feedback show incorrect-fb';
                    speakJP(q.kun ? q.kun.split('、')[0].replace(/[-.]/g,'') : q.on || q.kanji);
                    feedback.innerHTML = `${I18n.t('incorrect')} ${q.kanji} = <strong>${L(q,"meaning")}</strong> (ON: ${q.on}, KUN: ${q.kun})`;
                }

                Storage.recordStudy('kanji', q.kanji, correct);
                nextBtn.style.display = 'inline-flex';
                nextBtn.focus();
            });
        });

        nextBtn.addEventListener('click', () => {
            qs.current++;
            this.renderQuiz(container);
        });

        document.addEventListener('keydown', function onEnter(e) {
            if (e.key === 'Enter' && answered) {
                document.removeEventListener('keydown', onEnter);
                qs.current++;
                KanjiModule.renderQuiz(container);
            }
        });

        document.getElementById('kanji-quit')?.addEventListener('click', () => {
            this.quizState = null;
            this.currentTab = 'kanji-list';
            document.querySelectorAll('.kanji-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.kanji-tabs .tab-btn[data-tab="kanji-list"]')?.classList.add('active');
            this.render();
        });
    },

    renderQuizResults(container) {
        const qs = this.quizState;
        const pct = Math.round((qs.score / qs.questions.length) * 100);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} ${I18n.t('good_answers')}</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-primary" id="kanji-retry">${I18n.t('retry')}</button>
                        <button class="btn btn-secondary" id="kanji-back-list">${I18n.t('kanji_back_list')}</button>
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
