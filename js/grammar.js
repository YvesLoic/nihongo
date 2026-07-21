// ========================================
// Grammar Module
// ========================================

window.GrammarModule = {
    currentTab: 'grammar-lessons',
    exerciseState: null,

    init() {
        document.querySelectorAll('.grammar-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.grammar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                this.render();
            });
        });
        this.render();
    },

    getFilteredGrammar() {
        const level = LevelFilter.get();
        if (level === 'N5') return AppData.grammarN5;
        if (level === 'N4') return AppData.grammarN4;
        return [...AppData.grammarN5, ...AppData.grammarN4];
    },

    render() {
        const container = document.getElementById('grammar-content');
        if (this.currentTab === 'grammar-lessons') {
            this.renderLessons(container);
        } else {
            this.renderExercises(container);
        }
    },

    renderLessons(container) {
        const grammar = this.getFilteredGrammar();

        container.innerHTML = `
            <div class="filter-bar">
                <input type="text" class="search-input" id="grammar-search" placeholder="${I18n.t('grammar_search')}">
                <span style="color:var(--text-muted); font-size:13px;">${grammar.length} ${I18n.t('grammar_points')}</span>
            </div>
            <div class="grammar-list" id="grammar-list">
                ${grammar.map((g, i) => `
                    <div class="grammar-card" data-index="${i}">
                        <div class="grammar-card-header">
                            <span class="grammar-title">${g.title}</span>
                            <span class="grammar-structure">${g.structure}</span>
                        </div>
                        <div class="grammar-meaning">${L(g,"meaning")}</div>
                        <div class="grammar-example">
                            <div class="grammar-jp">${g.examples[0].jp}</div>
                            <div class="grammar-fr">${L(g.examples[0],"fr")}</div>
                        </div>
                        <div class="grammar-detail" id="grammar-detail-${i}">
                            <div class="grammar-note">${L(g,"explanation")}</div>
                            ${g.examples.slice(1).map(ex => `
                                <div class="grammar-example">
                                    <div class="grammar-jp">${ex.jp}${ex.reading && Furigana.enabled ? '<div class="grammar-reading-furigana">'+ ex.reading +'</div>' : ''}</div>
                                    ${ex.reading ? `<div style="font-size:12px; color:var(--text-muted); margin-bottom:4px;">${ex.reading}</div>` : ''}
                                    <div class="grammar-fr">${L(ex,"fr")}</div>
                                </div>
                            `).join('')}
                            <div style="margin-top:12px;">
                                <span class="kanji-level-tag ${g.level.toLowerCase()}">${g.level}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>`;

        document.getElementById('grammar-search').addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            container.querySelectorAll('.grammar-card').forEach((card, i) => {
                const g = grammar[i];
                const match = g.title.toLowerCase().includes(q) ||
                              L(g,"meaning").toLowerCase().includes(q) ||
                              g.structure.toLowerCase().includes(q);
                card.style.display = match ? '' : 'none';
            });
        });

        container.querySelectorAll('.grammar-card').forEach(card => {
            card.addEventListener('click', () => {
                const detail = document.getElementById(`grammar-detail-${card.dataset.index}`);
                detail.classList.toggle('show');
                const g = grammar[card.dataset.index];
                Storage.recordStudy('grammar', g.id, true);
            });
        });
    },

    renderExercises(container) {
        if (!this.exerciseState) {
            this.generateExercises();
        }

        const es = this.exerciseState;

        if (es.current >= es.questions.length) {
            this.renderExerciseResults(container);
            return;
        }

        const q = es.questions[es.current];
        const pct = (es.current / es.questions.length) * 100;

        container.innerHTML = `
            <div class="exercise-container">
                <div class="quiz-top-bar">
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                        <span class="quiz-counter">${es.current + 1}/${es.questions.length}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm quiz-quit-btn" id="grammar-quit">${I18n.t('quiz_quit')}</button>
                </div>
                <div class="exercise-card">
                    <div class="exercise-question">${q.question}</div>
                    <div class="quiz-options">
                        ${q.choices.map(c => `
                            <button class="quiz-option" data-answer="${c}">${c}</button>
                        `).join('')}
                    </div>
                    <div class="quiz-feedback" id="grammar-feedback"></div>
                    <div style="margin-top:12px;">
                        <span class="kanji-level-tag ${q.level.toLowerCase()}">${q.level}</span>
                        <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">${q.grammarPoint}</span>
                    </div>
                </div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="grammar-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const feedback = document.getElementById('grammar-feedback');
        const nextBtn = document.getElementById('grammar-next');
        let answered = false;

        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const correct = opt.dataset.answer === q.correct;
                es.answers.push({ correct });
                if (correct) es.score++;

                if (correct) {
                    opt.classList.add('correct');
                    feedback.className = 'quiz-feedback show correct-fb';
                    feedback.innerHTML = `${I18n.t('correct')}<br><span style="font-size:13px; opacity:0.85;"><em>${L(q,"explanation")}</em></span>`;
                } else {
                    opt.classList.add('incorrect');
                    container.querySelector(`[data-answer="${q.correct}"]`)?.classList.add('correct');
                    feedback.className = 'quiz-feedback show incorrect-fb';
                    feedback.innerHTML = `${I18n.t('incorrect')} ${I18n.t('grammar_answer')} <strong>${q.correct}</strong><br><em>${L(q,"explanation")}</em>`;
                }

                Storage.recordStudy('grammar', q.id, correct);
                nextBtn.style.display = 'inline-flex';
                nextBtn.focus();
            });
        });

        nextBtn.addEventListener('click', () => {
            es.current++;
            this.renderExercises(container);
        });

        document.addEventListener('keydown', function onEnter(e) {
            if (e.key === 'Enter' && answered) {
                document.removeEventListener('keydown', onEnter);
                es.current++;
                GrammarModule.renderExercises(container);
            }
        });

        document.getElementById('grammar-quit')?.addEventListener('click', () => {
            this.exerciseState = null;
            this.currentTab = 'grammar-lessons';
            document.querySelectorAll('.grammar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.grammar-tabs .tab-btn[data-tab="grammar-lessons"]')?.classList.add('active');
            this.render();
        });
    },

    generateExercises() {
        const grammar = this.getFilteredGrammar();
        const questions = [];

        grammar.forEach(g => {
            if (g.examples.length >= 2) {
                const ex = g.examples[0];
                const correctAnswer = g.title;

                const wrongs = grammar.filter(x => x.id !== g.id)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(x => x.title);

                questions.push({
                    id: g.id,
                    question: `${I18n.t('grammar_which_structure')}<br><br>
                        <span style="font-family:'Noto Sans JP'; font-size:18px;">${ex.jp}</span><br>
                        <em style="color:var(--text-muted);">${L(ex,"fr")}</em>`,
                    choices: [correctAnswer, ...wrongs].sort(() => Math.random() - 0.5),
                    correct: correctAnswer,
                    explanation: L(g,"meaning"),
                    grammarPoint: g.title,
                    level: g.level
                });
            }

            const wrongMeanings = grammar.filter(x => x.id !== g.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(x => L(x,"meaning"));

            questions.push({
                id: g.id,
                question: `${I18n.t('grammar_what_means')} <strong>${g.title}</strong> (${g.structure}) ?`,
                choices: [L(g,"meaning"), ...wrongMeanings].sort(() => Math.random() - 0.5),
                correct: L(g,"meaning"),
                explanation: L(g,"explanation"),
                grammarPoint: g.title,
                level: g.level
            });
        });

        const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 15);
        this.exerciseState = { questions: shuffled, current: 0, score: 0, answers: [] };
    },

    renderExerciseResults(container) {
        const es = this.exerciseState;
        const pct = Math.round((es.score / es.questions.length) * 100);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${es.score}/${es.questions.length} ${I18n.t('good_answers')}</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-primary" id="grammar-retry">${I18n.t('retry')}</button>
                        <button class="btn btn-secondary" id="grammar-back">${I18n.t('grammar_back_lessons')}</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('grammar-retry')?.addEventListener('click', () => {
            this.exerciseState = null;
            this.renderExercises(container);
        });
        document.getElementById('grammar-back')?.addEventListener('click', () => {
            this.exerciseState = null;
            this.currentTab = 'grammar-lessons';
            document.querySelectorAll('.grammar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.grammar-tabs .tab-btn[data-tab="grammar-lessons"]').classList.add('active');
            this.render();
        });

        App.updateDashboard();
    }
};
