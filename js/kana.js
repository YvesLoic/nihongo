// ========================================
// Kana Module - Hiragana & Katakana
// ========================================

window.KanaModule = {
    currentTab: 'hiragana',
    quizState: null,

    init() {
        this.bindTabs();
        this.render();
    },

    bindTabs() {
        document.querySelectorAll('.kana-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.kana-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                this.render();
            });
        });
    },

    render() {
        const container = document.getElementById('kana-content');
        if (this.currentTab === 'kana-quiz') {
            this.renderQuiz(container);
        } else {
            this.renderGrid(container);
        }
    },

    renderGrid(container) {
        const type = this.currentTab; // hiragana or katakana
        const data = AppData[type];
        const title = type === 'hiragana' ? 'Hiragana' : 'Katakana';
        const titleFull = type === 'hiragana' ? 'Hiragana (\u3072\u3089\u304C\u306A)' : 'Katakana (\u30AB\u30BF\u30AB\u30CA)';

        let html = '';

        const renderSection = (label, items, isCombo) => {
            html += `<h3 class="kana-section-title">${label}</h3>`;
            html += `<div class="kana-grid${isCombo ? ' kana-grid-combo' : ''}">`;
            items.forEach(k => {
                const status = Storage.getItemStatus('kana', k.char);
                let cls = isCombo ? 'combo' : '';
                if (status) {
                    cls += status.level >= 4 ? ' mastered' : status.level > 0 ? ' learning' : '';
                }
                html += `
                    <div class="kana-cell ${cls}" data-char="${k.char}" data-romaji="${k.romaji}" title="${k.romaji}">
                        <span class="kana-char">${k.char}</span>
                        <span class="kana-romaji">${k.romaji}</span>
                    </div>`;
            });
            html += '</div>';
        };

        renderSection(`${titleFull} - ${I18n.t('kana_base')}`, data.basic, false);
        renderSection(I18n.t('kana_dakuten'), data.dakuten, false);
        renderSection(I18n.t('kana_combo'), data.combo, true);

        html += `
            <div style="margin-top:32px; text-align:center;">
                <button class="btn btn-primary btn-lg" id="btn-kana-quiz-start">
                    ${I18n.t('kana_start_quiz')} ${title}
                </button>
            </div>`;

        container.innerHTML = html;

        document.getElementById('btn-kana-quiz-start')?.addEventListener('click', () => {
            document.querySelectorAll('.kana-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.kana-tabs .tab-btn[data-tab="kana-quiz"]').classList.add('active');
            this.currentTab = 'kana-quiz';
            this.startQuiz(type);
        });

        container.querySelectorAll('.kana-cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const char = cell.dataset.char;
                const romaji = cell.dataset.romaji;
                App.showModal(`
                    <div style="text-align:center;">
                        <div style="font-size:120px; font-family:'Noto Sans JP'; margin-bottom:16px; white-space:nowrap; letter-spacing:-0.05em;">${char}</div>
                        <div style="font-size:24px; color:var(--accent-light); margin-bottom:8px;">${romaji}</div>
                        <div style="font-size:14px; color:var(--text-muted);">${type === 'hiragana' ? 'Hiragana' : 'Katakana'}</div>
                    </div>
                `);
            });
        });
    },

    startQuiz(type) {
        type = type || 'hiragana';
        const data = AppData[type];
        const allKana = [...data.basic, ...data.dakuten, ...data.combo];

        const shuffled = allKana.sort(() => Math.random() - 0.5).slice(0, 20);

        this.quizState = {
            type,
            questions: shuffled,
            current: 0,
            score: 0,
            answers: []
        };
        this.renderQuiz(document.getElementById('kana-content'));
    },

    renderQuiz(container) {
        if (!this.quizState) {
            container.innerHTML = `
                <div class="quiz-container" style="text-align:center; padding:40px;">
                    <h2 style="margin-bottom:24px;">${I18n.t('kana_choose_type')}</h2>
                    <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
                        <button class="btn btn-primary btn-lg" id="quiz-hiragana">${I18n.t('kana_tab_hiragana')}</button>
                        <button class="btn btn-primary btn-lg" id="quiz-katakana" style="background:linear-gradient(135deg, var(--sakura), var(--sakura-dark));">${I18n.t('kana_tab_katakana')}</button>
                        <button class="btn btn-secondary btn-lg" id="quiz-both">${I18n.t('kana_both')}</button>
                    </div>
                    <div style="margin-top:32px;">
                        <h3 style="margin-bottom:16px;">${I18n.t('kana_mode')}</h3>
                        <div style="display:flex; gap:12px; justify-content:center;">
                            <button class="btn btn-secondary quiz-mode-btn active" data-mode="type">${I18n.t('kana_mode_type')}</button>
                            <button class="btn btn-secondary quiz-mode-btn" data-mode="choose">${I18n.t('kana_mode_choose')}</button>
                        </div>
                    </div>
                </div>`;

            let mode = 'type';
            container.querySelectorAll('.quiz-mode-btn').forEach(b => {
                b.addEventListener('click', () => {
                    container.querySelectorAll('.quiz-mode-btn').forEach(x => x.classList.remove('active'));
                    b.classList.add('active');
                    mode = b.dataset.mode;
                });
            });

            const startWith = (type) => {
                this.quizMode = mode;
                this.startQuiz(type);
            };

            document.getElementById('quiz-hiragana')?.addEventListener('click', () => startWith('hiragana'));
            document.getElementById('quiz-katakana')?.addEventListener('click', () => startWith('katakana'));
            document.getElementById('quiz-both')?.addEventListener('click', () => {
                this.quizMode = mode;
                const allH = [...AppData.hiragana.basic, ...AppData.hiragana.dakuten, ...AppData.hiragana.combo];
                const allK = [...AppData.katakana.basic, ...AppData.katakana.dakuten, ...AppData.katakana.combo];
                const all = [...allH, ...allK].sort(() => Math.random() - 0.5).slice(0, 20);
                this.quizState = { type: 'both', questions: all, current: 0, score: 0, answers: [] };
                this.renderQuiz(container);
            });
            return;
        }

        const qs = this.quizState;

        if (qs.current >= qs.questions.length) {
            this.renderQuizResults(container);
            return;
        }

        const q = qs.questions[qs.current];
        const pct = (qs.current / qs.questions.length) * 100;

        if (this.quizMode === 'choose') {
            this.renderMCQ(container, q, pct);
        } else {
            this.renderTypeQuiz(container, q, pct);
        }
    },

    renderTypeQuiz(container, q, pct) {
        const qs = this.quizState;
        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-progress">
                    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                    <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt">${q.char}</div>
                    <div class="quiz-hint">${I18n.t('kana_type_prompt')}</div>
                </div>
                <div class="quiz-input-wrap">
                    <input type="text" class="quiz-input" id="kana-answer" placeholder="${I18n.t('kana_your_answer')}" autocomplete="off" autofocus>
                    <button class="btn btn-primary" id="kana-submit">${I18n.t('kana_validate')}</button>
                </div>
                <div class="quiz-feedback" id="kana-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="kana-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const input = document.getElementById('kana-answer');
        const submitBtn = document.getElementById('kana-submit');
        const feedback = document.getElementById('kana-feedback');
        const nextBtn = document.getElementById('kana-next');

        const checkAnswer = () => {
            const answer = input.value.trim().toLowerCase();
            if (!answer) return;

            const correct = answer === q.romaji.toLowerCase();
            qs.answers.push({ char: q.char, answer, correct, expected: q.romaji });

            if (correct) {
                qs.score++;
                input.classList.add('correct');
                feedback.className = 'quiz-feedback show correct-fb';
                feedback.textContent = I18n.t('correct');
            } else {
                input.classList.add('incorrect');
                feedback.className = 'quiz-feedback show incorrect-fb';
                feedback.innerHTML = `${I18n.t('incorrect')} ${I18n.t('kana_correct_was')} <strong>${q.romaji}</strong>`;
            }

            Storage.recordStudy('kana', q.char, correct);
            submitBtn.style.display = 'none';
            input.disabled = true;
            nextBtn.style.display = 'inline-flex';
        };

        submitBtn.addEventListener('click', checkAnswer);
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                if (input.disabled) {
                    qs.current++;
                    this.renderQuiz(container);
                } else {
                    checkAnswer();
                }
            }
        });
        input.focus();

        nextBtn.addEventListener('click', () => {
            qs.current++;
            this.renderQuiz(container);
        });
    },

    renderMCQ(container, q, pct) {
        const qs = this.quizState;
        const type = qs.type === 'both' ? 'hiragana' : qs.type;
        const allData = [...AppData[type].basic, ...AppData[type].dakuten, ...AppData[type].combo];

        const wrongChoices = allData.filter(k => k.romaji !== q.romaji)
            .sort(() => Math.random() - 0.5).slice(0, 3);
        const choices = [q, ...wrongChoices].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-progress">
                    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                    <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt">${q.char}</div>
                    <div class="quiz-hint">${I18n.t('kana_what_romaji')}</div>
                </div>
                <div class="quiz-options">
                    ${choices.map(c => `
                        <button class="quiz-option" data-answer="${c.romaji}">${c.romaji}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="kana-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="kana-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const feedback = document.getElementById('kana-feedback');
        const nextBtn = document.getElementById('kana-next');
        let answered = false;

        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const answer = opt.dataset.answer;
                const correct = answer === q.romaji;
                qs.answers.push({ char: q.char, answer, correct, expected: q.romaji });

                if (correct) {
                    qs.score++;
                    opt.classList.add('correct');
                    feedback.className = 'quiz-feedback show correct-fb';
                    feedback.textContent = I18n.t('correct');
                } else {
                    opt.classList.add('incorrect');
                    container.querySelector(`[data-answer="${q.romaji}"]`).classList.add('correct');
                    feedback.className = 'quiz-feedback show incorrect-fb';
                    feedback.innerHTML = `${I18n.t('incorrect')} ${I18n.t('kana_correct_was')} <strong>${q.romaji}</strong>`;
                }

                Storage.recordStudy('kana', q.char, correct);
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
                KanaModule.renderQuiz(container);
            }
        });
    },

    renderQuizResults(container) {
        const qs = this.quizState;
        const pct = Math.round((qs.score / qs.questions.length) * 100);
        let msg = pct >= 90 ? I18n.t('kana_result_excellent') :
                  pct >= 70 ? I18n.t('kana_result_good') :
                  pct >= 50 ? I18n.t('kana_result_ok') :
                  I18n.t('kana_result_practice');

        let wrongList = qs.answers.filter(a => !a.correct);
        let wrongHtml = '';
        if (wrongList.length > 0) {
            wrongHtml = `
                <div style="margin-top:24px; text-align:left;">
                    <h3 style="margin-bottom:12px;">${I18n.t('kana_to_review')}</h3>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        ${wrongList.map(w => `
                            <div style="background:var(--bg-input); padding:8px 16px; border-radius:8px; text-align:center;">
                                <div style="font-size:28px; font-family:'Noto Sans JP';">${w.char}</div>
                                <div style="font-size:12px; color:var(--accent-light);">${w.expected}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>`;
        }

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} - ${msg}</div>
                    ${wrongHtml}
                    <div style="margin-top:32px; display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-primary" id="kana-retry">${I18n.t('retry')}</button>
                        <button class="btn btn-secondary" id="kana-back">${I18n.t('back')}</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('kana-retry')?.addEventListener('click', () => {
            this.quizState = null;
            this.renderQuiz(container);
        });
        document.getElementById('kana-back')?.addEventListener('click', () => {
            this.quizState = null;
            this.currentTab = 'hiragana';
            document.querySelectorAll('.kana-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.kana-tabs .tab-btn[data-tab="hiragana"]').classList.add('active');
            this.render();
        });

        App.updateDashboard();
    }
};
