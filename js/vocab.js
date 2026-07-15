// ========================================
// Vocabulary Module
// ========================================

window.VocabModule = {
    currentTab: 'vocab-themes',
    currentTheme: null,
    flashcardIndex: 0,
    flashcardList: [],
    quizState: null,

    init() {
        document.querySelectorAll('.vocab-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.vocab-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                this.render();
            });
        });
        this.render();
    },

    getFilteredVocab() {
        const level = LevelFilter.get();
        if (level === 'N5') return AppData.vocabN5;
        if (level === 'N4') return AppData.vocabN4;
        return [...AppData.vocabN5, ...AppData.vocabN4];
    },

    getAllWords() {
        const themes = this.getFilteredVocab();
        return themes.flatMap(t => t.words);
    },

    render() {
        const container = document.getElementById('vocab-content');
        switch (this.currentTab) {
            case 'vocab-themes':
                if (this.currentTheme) {
                    this.renderThemeWords(container);
                } else {
                    this.renderThemes(container);
                }
                break;
            case 'vocab-flashcard': this.renderFlashcards(container); break;
            case 'vocab-quiz': this.renderQuiz(container); break;
        }
    },

    renderThemes(container) {
        const themes = this.getFilteredVocab();

        container.innerHTML = `
            <div class="vocab-themes-grid">
                ${themes.map((t, i) => `
                    <div class="vocab-theme-card" data-index="${i}">
                        <div class="vocab-theme-icon">${t.icon}</div>
                        <div class="vocab-theme-name">${t.theme}</div>
                        <div class="vocab-theme-count">${t.words.length} ${I18n.t('vocab_words')}</div>
                    </div>
                `).join('')}
            </div>`;

        container.querySelectorAll('.vocab-theme-card').forEach(card => {
            card.addEventListener('click', () => {
                this.currentTheme = themes[card.dataset.index];
                this.render();
            });
        });
    },

    renderThemeWords(container) {
        const t = this.currentTheme;

        container.innerHTML = `
            <div class="vocab-back-btn">
                <button class="btn btn-secondary" id="vocab-back">
                    &larr; ${I18n.t('vocab_back_themes')}
                </button>
                <span style="margin-left:16px; font-size:24px;">${t.icon}</span>
                <span style="margin-left:8px; font-size:20px; font-weight:600;">${t.theme}</span>
            </div>
            <div class="filter-bar">
                <input type="text" class="search-input" id="vocab-search" placeholder="${I18n.t('vocab_search')}">
            </div>
            <div class="vocab-word-list" id="vocab-word-list">
                ${t.words.map(w => `
                    <div class="vocab-word-item" data-kana="${w.kana}">
                        <span class="vocab-kanji-col">${w.kanji || w.kana}</span>
                        <span class="vocab-reading-col">${w.kanji ? w.kana : ''}</span>
                        <span class="vocab-meaning-col">${w.meaning}</span>
                        <span class="vocab-level-col kanji-level-tag ${w.level.toLowerCase()}">${w.level}</span>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top:24px; text-align:center;">
                <button class="btn btn-primary" id="vocab-quiz-theme">${I18n.t('vocab_quiz_theme')}</button>
                <button class="btn btn-secondary" id="vocab-speak" style="margin-left:12px;">${I18n.t('listen')}</button>
            </div>`;

        document.getElementById('vocab-back').addEventListener('click', () => {
            this.currentTheme = null;
            this.render();
        });

        document.getElementById('vocab-search').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            container.querySelectorAll('.vocab-word-item').forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(q) ? '' : 'none';
            });
        });

        document.getElementById('vocab-quiz-theme')?.addEventListener('click', () => {
            this.startThemeQuiz(t);
        });

        document.getElementById('vocab-speak')?.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                const words = t.words.map(w => w.kana).join('\u3001');
                const utterance = new SpeechSynthesisUtterance(words);
                utterance.lang = 'ja-JP';
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            } else {
                App.toast(I18n.t('tts_unsupported'), 'error');
            }
        });

        // Click word to hear it
        container.querySelectorAll('.vocab-word-item').forEach(item => {
            item.addEventListener('click', () => {
                const kana = item.dataset.kana;
                if ('speechSynthesis' in window) {
                    speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(kana);
                    u.lang = 'ja-JP';
                    u.rate = 0.8;
                    speechSynthesis.speak(u);
                }
                Storage.recordStudy('vocab', kana, true);
            });
        });
    },

    renderFlashcards(container) {
        const allWords = this.getAllWords();

        if (this.flashcardList.length === 0) {
            this.flashcardList = allWords.sort(() => Math.random() - 0.5);
            this.flashcardIndex = 0;
        }

        if (this.flashcardList.length === 0) {
            container.innerHTML = `<div class="empty-state">${I18n.t('vocab_no_data')}</div>`;
            return;
        }

        const w = this.flashcardList[this.flashcardIndex];

        container.innerHTML = `
            <div class="flashcard-container">
                <div class="flashcard" id="vocab-flashcard">
                    <div class="flashcard-face">
                        <div class="flashcard-char" style="font-size:60px;">${w.kanji || w.kana}</div>
                        ${w.kanji ? `<div class="flashcard-reading" style="font-size:16px;">${w.kana}</div>` : ''}
                        <div style="margin-top:12px; font-size:14px; color:var(--text-muted);">${I18n.t('click_to_see')}</div>
                    </div>
                    <div class="flashcard-face flashcard-back">
                        <div class="flashcard-char" style="font-size:48px;">${w.kanji || w.kana}</div>
                        ${w.kanji ? `<div class="flashcard-reading">${w.kana}</div>` : ''}
                        <div class="flashcard-meaning">${w.meaning}</div>
                        <span class="kanji-level-tag ${w.level.toLowerCase()}">${w.level}</span>
                    </div>
                </div>
                <div class="srs-buttons" id="vocab-srs" style="display:none;">
                    <button class="srs-btn again" data-score="0">${I18n.t('srs_again')}</button>
                    <button class="srs-btn hard" data-score="1">${I18n.t('srs_hard')}</button>
                    <button class="srs-btn good" data-score="2">${I18n.t('srs_good')}</button>
                    <button class="srs-btn easy" data-score="3">${I18n.t('srs_easy')}</button>
                </div>
                <div class="flashcard-nav">
                    <button class="btn btn-secondary" id="vfc-prev">${I18n.t('previous')}</button>
                    <span class="flashcard-counter">${this.flashcardIndex + 1} / ${this.flashcardList.length}</span>
                    <button class="btn btn-secondary" id="vfc-next">${I18n.t('next')}</button>
                </div>
                <div style="text-align:center; margin-top:12px;">
                    <button class="btn btn-secondary btn-sm" id="vfc-shuffle">${I18n.t('shuffle')}</button>
                    <button class="btn btn-secondary btn-sm" id="vfc-speak" style="margin-left:8px;">${I18n.t('listen')}</button>
                </div>
            </div>`;

        const flashcard = document.getElementById('vocab-flashcard');
        const srs = document.getElementById('vocab-srs');

        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
            if (flashcard.classList.contains('flipped')) srs.style.display = 'flex';
        });

        srs.querySelectorAll('.srs-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                Storage.recordStudy('vocab', w.kana, parseInt(btn.dataset.score) >= 2);
                this.flashcardIndex = (this.flashcardIndex + 1) % this.flashcardList.length;
                this.renderFlashcards(container);
            });
        });

        document.getElementById('vfc-prev').addEventListener('click', () => {
            this.flashcardIndex = (this.flashcardIndex - 1 + this.flashcardList.length) % this.flashcardList.length;
            this.renderFlashcards(container);
        });
        document.getElementById('vfc-next').addEventListener('click', () => {
            this.flashcardIndex = (this.flashcardIndex + 1) % this.flashcardList.length;
            this.renderFlashcards(container);
        });
        document.getElementById('vfc-shuffle').addEventListener('click', () => {
            this.flashcardList.sort(() => Math.random() - 0.5);
            this.flashcardIndex = 0;
            this.renderFlashcards(container);
        });
        document.getElementById('vfc-speak')?.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(w.kana);
                u.lang = 'ja-JP';
                u.rate = 0.8;
                speechSynthesis.speak(u);
            }
        });
    },

    startThemeQuiz(theme) {
        const words = theme.words;
        if (words.length < 4) {
            App.toast(I18n.t('vocab_not_enough'), 'error');
            return;
        }

        const shuffled = words.sort(() => Math.random() - 0.5).slice(0, Math.min(15, words.length));
        this.quizState = { questions: shuffled, allWords: words, current: 0, score: 0, answers: [], theme: theme.theme };

        this.currentTab = 'vocab-quiz';
        document.querySelectorAll('.vocab-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.vocab-tabs .tab-btn[data-tab="vocab-quiz"]').classList.add('active');
        this.render();
    },

    renderQuiz(container) {
        if (!this.quizState) {
            const allWords = this.getAllWords();
            if (allWords.length < 4) {
                container.innerHTML = `<div class="empty-state">${I18n.t('vocab_no_data')}</div>`;
                return;
            }
            const shuffled = allWords.sort(() => Math.random() - 0.5).slice(0, 15);
            this.quizState = { questions: shuffled, allWords: allWords, current: 0, score: 0, answers: [], theme: I18n.t('all') };
        }

        const qs = this.quizState;

        if (qs.current >= qs.questions.length) {
            this.renderQuizResults(container);
            return;
        }

        const q = qs.questions[qs.current];
        const pct = (qs.current / qs.questions.length) * 100;

        const jpToFr = Math.random() > 0.5;

        let prompt, correctAnswer, wrongAnswers;

        if (jpToFr) {
            prompt = q.kanji || q.kana;
            correctAnswer = q.meaning;
            wrongAnswers = qs.allWords.filter(w => w.meaning !== q.meaning)
                .sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.meaning);
        } else {
            prompt = q.meaning;
            correctAnswer = q.kanji || q.kana;
            wrongAnswers = qs.allWords.filter(w => (w.kanji || w.kana) !== correctAnswer)
                .sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.kanji || w.kana);
        }

        const choices = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-progress">
                    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                    <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt" style="font-size:${jpToFr ? '56px' : '28px'}">${prompt}</div>
                    <div class="quiz-hint">${jpToFr ? I18n.t('vocab_what_translation') : I18n.t('vocab_what_japanese')}</div>
                </div>
                <div class="quiz-options">
                    ${choices.map(c => `
                        <button class="quiz-option" data-answer="${c}" style="font-family:${jpToFr ? 'inherit' : "'Noto Sans JP', sans-serif"};">${c}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="vocab-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="vocab-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const feedback = document.getElementById('vocab-feedback');
        const nextBtn = document.getElementById('vocab-next');
        let answered = false;

        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const correct = opt.dataset.answer === correctAnswer;
                qs.answers.push({ correct });
                if (correct) qs.score++;

                if (correct) {
                    opt.classList.add('correct');
                    feedback.className = 'quiz-feedback show correct-fb';
                    feedback.textContent = `${I18n.t('correct')} ${q.kanji || q.kana} = ${q.meaning}`;
                } else {
                    opt.classList.add('incorrect');
                    container.querySelector(`[data-answer="${correctAnswer}"]`)?.classList.add('correct');
                    feedback.className = 'quiz-feedback show incorrect-fb';
                    feedback.innerHTML = `${I18n.t('incorrect')} <strong>${q.kanji || q.kana}</strong> (${q.kana}) = ${q.meaning}`;
                }

                Storage.recordStudy('vocab', q.kana, correct);
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
                VocabModule.renderQuiz(container);
            }
        });
    },

    renderQuizResults(container) {
        const qs = this.quizState;
        const pct = Math.round((qs.score / qs.questions.length) * 100);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} - ${qs.theme}</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-primary" id="vocab-retry">${I18n.t('retry')}</button>
                        <button class="btn btn-secondary" id="vocab-back-themes">${I18n.t('vocab_back_themes')}</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('vocab-retry')?.addEventListener('click', () => {
            this.quizState = null;
            this.renderQuiz(container);
        });
        document.getElementById('vocab-back-themes')?.addEventListener('click', () => {
            this.quizState = null;
            this.currentTheme = null;
            this.currentTab = 'vocab-themes';
            document.querySelectorAll('.vocab-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.vocab-tabs .tab-btn[data-tab="vocab-themes"]').classList.add('active');
            this.render();
        });

        App.updateDashboard();
    }
};
