// ========================================
// Exam Simulator Module — JLPT Format
// ========================================

window.ExamModule = {
    examState: null,
    timerInterval: null,

    init() {
        this.render();
    },

    render() {
        const container = document.getElementById('exam-content');
        if (this.examState && this.examState.started) {
            this.renderExam(container);
        } else if (this.examState && this.examState.finished) {
            this.renderResults(container);
        } else {
            this.renderSetup(container);
        }
    },

    renderSetup(container) {
        const level = LevelFilter.get();
        container.innerHTML = `
            <div class="exam-setup">
                <div style="font-size:64px; margin-bottom:16px;">&#x1F4DD;</div>
                <h2>${I18n.t('exam_setup_title')}</h2>
                <p style="color:var(--text-secondary); margin-top:8px;">
                    ${I18n.t('exam_setup_desc')}
                </p>

                <div class="exam-type-grid" id="exam-types">
                    <div class="exam-type-card selected" data-type="complete">
                        <div class="exam-type-icon">&#x1F4DA;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_complete')}</div>
                        <div class="exam-type-desc">${I18n.t('exam_type_complete_desc')}</div>
                    </div>
                    <div class="exam-type-card" data-type="kanji">
                        <div class="exam-type-icon">&#x6F22;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_kanji')}</div>
                        <div class="exam-type-desc">${I18n.t('exam_type_kanji_desc')}</div>
                    </div>
                    <div class="exam-type-card" data-type="grammar">
                        <div class="exam-type-icon">&#x6587;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_grammar')}</div>
                        <div class="exam-type-desc">${I18n.t('exam_type_grammar_desc')}</div>
                    </div>
                    <div class="exam-type-card" data-type="vocab">
                        <div class="exam-type-icon">&#x8A00;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_vocab')}</div>
                        <div class="exam-type-desc">${I18n.t('exam_type_vocab_desc')}</div>
                    </div>
                </div>

                <div style="margin-bottom:24px;">
                    <label style="color:var(--text-secondary); font-size:14px;">${I18n.t('exam_questions')}</label>
                    <div style="display:flex; gap:8px; justify-content:center; margin-top:8px; flex-wrap:wrap;">
                        <button class="filter-chip" data-count="10">10</button>
                        <button class="filter-chip active" data-count="20">20</button>
                        <button class="filter-chip" data-count="30">30</button>
                        <button class="filter-chip" data-count="50">50</button>
                    </div>
                </div>

                <div style="margin-bottom:24px;">
                    <label style="color:var(--text-secondary); font-size:14px;">${I18n.t('exam_timer')}</label>
                    <div style="display:flex; gap:8px; justify-content:center; margin-top:8px; flex-wrap:wrap;">
                        <button class="filter-chip timer-chip" data-time="0">${I18n.t('exam_no_limit')}</button>
                        <button class="filter-chip timer-chip active" data-time="30">30 min</button>
                        <button class="filter-chip timer-chip" data-time="60">60 min</button>
                    </div>
                </div>

                <button class="btn btn-primary btn-lg" id="btn-start-exam">
                    ${I18n.t('exam_start')}
                </button>

                <p style="color:var(--text-muted); font-size:12px; margin-top:16px;">
                    ${I18n.t('exam_current_level')} ${level === 'all' ? 'N5 + N4' : level}
                </p>
            </div>`;

        let selectedType = 'complete';
        let questionCount = 20;
        let timeLimit = 30;

        container.querySelectorAll('.exam-type-card').forEach(card => {
            card.addEventListener('click', () => {
                container.querySelectorAll('.exam-type-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedType = card.dataset.type;
            });
        });

        container.querySelectorAll('[data-count]').forEach(chip => {
            chip.addEventListener('click', () => {
                container.querySelectorAll('[data-count]').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                questionCount = parseInt(chip.dataset.count);
            });
        });

        container.querySelectorAll('.timer-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                container.querySelectorAll('.timer-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                timeLimit = parseInt(chip.dataset.time);
            });
        });

        document.getElementById('btn-start-exam').addEventListener('click', () => {
            this.startExam(selectedType, questionCount, timeLimit);
        });
    },

    // =============================================
    // JLPT-style question generators
    // =============================================
    generateQuestions(type, count) {
        const questions = [];
        const level = LevelFilter.get();

        const kanjiPool = level === 'N4' ? AppData.kanjiN4 :
                          level === 'N5' ? AppData.kanjiN5 :
                          [...AppData.kanjiN5, ...AppData.kanjiN4];

        const grammarPool = level === 'N4' ? AppData.grammarN4 :
                            level === 'N5' ? AppData.grammarN5 :
                            [...AppData.grammarN5, ...AppData.grammarN4];

        const vocabThemes = level === 'N4' ? AppData.vocabN4 :
                            level === 'N5' ? AppData.vocabN5 :
                            [...AppData.vocabN5, ...AppData.vocabN4];
        const vocabPool = vocabThemes.flatMap(t => t.words);

        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        // === KANJI SECTION ===
        if (type === 'complete' || type === 'kanji') {
            const kCount = type === 'kanji' ? count : Math.ceil(count * 0.3);
            const kShuf = shuffle(kanjiPool);

            // Partie A: Lecture des kanji (quel est le reading)
            kShuf.slice(0, Math.ceil(kCount / 2)).forEach(k => {
                const wrongs = shuffle(kanjiPool.filter(x => x.kanji !== k.kanji)).slice(0, 3).map(x => x.on || x.kun);
                questions.push({
                    section: I18n.t('exam_sec_kanji'),
                    sectionSub: I18n.t('exam_part_reading'),
                    text: `<span class="exam-jp-lg">${k.kanji}</span>`,
                    hint: I18n.t('exam_kanji_reading_q'),
                    translation: `${k.kanji} = ${k.meaning}`,
                    choices: shuffle([k.on || k.kun, ...wrongs]),
                    correct: k.on || k.kun,
                    detail: `${k.kanji} : ON: ${k.on}, KUN: ${k.kun} = ${k.meaning}`,
                    type: 'kanji'
                });
            });

            // Partie B: Signification des kanji
            kShuf.slice(Math.ceil(kCount / 2), kCount).forEach(k => {
                const wrongs = shuffle(kanjiPool.filter(x => x.kanji !== k.kanji)).slice(0, 3).map(x => x.meaning);
                questions.push({
                    section: I18n.t('exam_sec_kanji'),
                    sectionSub: I18n.t('exam_part_meaning'),
                    text: `<span class="exam-jp-lg">${k.kanji}</span>`,
                    hint: I18n.t('exam_kanji_meaning_q'),
                    translation: `${k.kanji} (${k.on || k.kun})`,
                    choices: shuffle([k.meaning, ...wrongs]),
                    correct: k.meaning,
                    detail: `${k.kanji} = ${k.meaning} (ON: ${k.on}, KUN: ${k.kun})`,
                    type: 'kanji'
                });
            });
        }

        // === VOCABULARY SECTION ===
        if (type === 'complete' || type === 'vocab') {
            const vCount = type === 'vocab' ? count : Math.ceil(count * 0.2);
            const vShuf = shuffle(vocabPool);

            vShuf.slice(0, vCount).forEach(w => {
                const jpToFr = Math.random() > 0.4;
                if (jpToFr) {
                    const wrongs = shuffle(vocabPool.filter(x => x.meaning !== w.meaning)).slice(0, 3).map(x => x.meaning);
                    questions.push({
                        section: I18n.t('exam_sec_vocab'),
                        sectionSub: I18n.t('exam_part_meaning'),
                        text: `<span class="exam-jp-lg">${w.kanji || w.kana}</span>${w.kanji ? `<br><span class="exam-reading">${w.kana}</span>` : ''}`,
                        hint: I18n.t('vocab_what_translation'),
                        translation: `${w.kanji || w.kana} (${w.kana})`,
                        choices: shuffle([w.meaning, ...wrongs]),
                        correct: w.meaning,
                        detail: `${w.kanji || w.kana} (${w.kana}) = ${w.meaning}`,
                        type: 'vocab'
                    });
                } else {
                    const wrongs = shuffle(vocabPool.filter(x => (x.kanji || x.kana) !== (w.kanji || w.kana))).slice(0, 3).map(x => x.kanji || x.kana);
                    questions.push({
                        section: I18n.t('exam_sec_vocab'),
                        sectionSub: I18n.t('exam_part_word'),
                        text: `<span class="exam-fr-prompt">${w.meaning}</span>`,
                        hint: I18n.t('vocab_what_japanese'),
                        translation: '',
                        choices: shuffle([w.kanji || w.kana, ...wrongs]),
                        correct: w.kanji || w.kana,
                        detail: `${w.meaning} = ${w.kanji || w.kana} (${w.kana})`,
                        type: 'vocab'
                    });
                }
            });
        }

        // === GRAMMAR SECTION ===
        if (type === 'complete' || type === 'grammar') {
            const gCount = type === 'grammar' ? count : Math.ceil(count * 0.3);
            const gShuf = shuffle(grammarPool);

            gShuf.slice(0, Math.ceil(gCount / 2)).forEach(g => {
                // Particules / structures: complete the sentence
                if (g.examples && g.examples.length > 0) {
                    const ex = g.examples[0];
                    const wrongs = shuffle(grammarPool.filter(x => x.id !== g.id)).slice(0, 3).map(x => x.title);
                    questions.push({
                        section: I18n.t('exam_sec_grammar'),
                        sectionSub: I18n.t('exam_part_structures'),
                        text: `<span class="exam-jp-md">${ex.jp}</span>`,
                        hint: I18n.t('grammar_which_structure'),
                        translation: ex.fr,
                        choices: shuffle([g.title, ...wrongs]),
                        correct: g.title,
                        detail: `${g.title} (${g.structure}) : ${g.meaning}`,
                        type: 'grammar'
                    });
                }
            });

            // Meaning of structures
            gShuf.slice(Math.ceil(gCount / 2), gCount).forEach(g => {
                const wrongs = shuffle(grammarPool.filter(x => x.id !== g.id)).slice(0, 3).map(x => x.meaning);
                questions.push({
                    section: I18n.t('exam_sec_grammar'),
                    sectionSub: I18n.t('exam_part_meaning'),
                    text: `<strong>${g.title}</strong><br><span class="exam-reading">${g.structure}</span>`,
                    hint: `${I18n.t('grammar_what_means')} ?`,
                    translation: '',
                    choices: shuffle([g.meaning, ...wrongs]),
                    correct: g.meaning,
                    detail: `${g.title} = ${g.meaning}. ${g.explanation}`,
                    type: 'grammar'
                });
            });
        }

        // === COMPREHENSION (only in complete) ===
        if (type === 'complete') {
            const readingTexts = LevelFilter.get() === 'N4' ? ReadingModule.textsN4 :
                                 LevelFilter.get() === 'N5' ? ReadingModule.textsN5 :
                                 [...ReadingModule.textsN5, ...ReadingModule.textsN4];
            if (readingTexts.length > 0) {
                const t = shuffle(readingTexts)[0];
                const rCount = Math.min(3, t.questions.length);
                shuffle(t.questions).slice(0, rCount).forEach(q => {
                    questions.push({
                        section: I18n.t('exam_sec_reading'),
                        sectionSub: t.titleJp,
                        text: `<div class="exam-reading-excerpt">${t.text.substring(0, 200)}...</div><div class="exam-jp-md" style="margin-top:12px;">${q.q}</div>`,
                        hint: '',
                        translation: t.translation.substring(0, 150) + '...',
                        choices: q.choices,
                        correct: q.correct,
                        detail: q.explanation,
                        type: 'reading'
                    });
                });
            }
        }

        return shuffle(questions).slice(0, count);
    },

    startExam(type, count, timeLimit) {
        const questions = this.generateQuestions(type, count);

        this.examState = {
            started: true,
            finished: false,
            type,
            questions,
            answers: new Array(questions.length).fill(null),
            current: 0,
            timeLimit: timeLimit * 60,
            timeRemaining: timeLimit * 60,
            startTime: Date.now()
        };

        if (timeLimit > 0) {
            this.startTimer();
        }

        this.render();
    },

    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.examState) {
                clearInterval(this.timerInterval);
                return;
            }
            this.examState.timeRemaining--;
            this.updateTimerDisplay();
            if (this.examState.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.finishExam();
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const el = document.getElementById('exam-timer-display');
        if (!el || !this.examState) return;
        const t = this.examState.timeRemaining;
        const m = Math.floor(t / 60);
        const s = t % 60;
        el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        el.className = 'timer-display';
        if (t < 60) el.classList.add('danger');
        else if (t < 300) el.classList.add('warning');
    },

    renderExam(container) {
        const es = this.examState;
        const q = es.questions[es.current];
        const answered = es.answers[es.current] !== null;

        const typeLabel = q.type === 'kanji' ? I18n.t('exam_q_kanji') :
                          q.type === 'grammar' ? I18n.t('exam_q_grammar') :
                          q.type === 'reading' ? I18n.t('exam_sec_reading') :
                          I18n.t('exam_q_vocab');

        const timeDisplay = es.timeLimit > 0
            ? `<span class="timer-display" id="exam-timer-display">
                ${String(Math.floor(es.timeRemaining / 60)).padStart(2, '0')}:${String(es.timeRemaining % 60).padStart(2, '0')}
               </span>`
            : `<span style="color:var(--text-muted);">${I18n.t('exam_no_limit')}</span>`;

        const dots = es.questions.map((_, i) => {
            let dotClass = 'background:var(--bg-input);';
            if (es.answers[i] !== null) dotClass = 'background:var(--accent);';
            if (i === es.current) dotClass = 'background:var(--sakura); transform:scale(1.3);';
            return `<div class="exam-dot" data-qi="${i}" style="width:10px; height:10px; border-radius:50%; ${dotClass} cursor:pointer; transition:all 0.2s;"></div>`;
        }).join('');

        container.innerHTML = `
            <div class="exam-timer">
                <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                    ${timeDisplay}
                    <span style="color:var(--text-muted); font-size:13px;">${I18n.t('exam_question')} ${es.current + 1}/${es.questions.length}</span>
                </div>
                <button class="btn btn-danger btn-sm" id="exam-finish">${I18n.t('exam_finish')}</button>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:20px; justify-content:center;">
                ${dots}
            </div>
            <div class="exam-question">
                <div class="exam-q-header">
                    <span class="exam-q-number">${I18n.t('exam_question')} ${es.current + 1} — ${typeLabel}</span>
                    ${q.sectionSub ? `<span class="exam-q-sub">${q.sectionSub}</span>` : ''}
                </div>
                <div class="exam-q-text">${q.text}</div>
                ${q.hint ? `<div class="exam-q-hint">${q.hint}</div>` : ''}
                ${q.translation && !answered ? `<div class="exam-q-translation">${q.translation}</div>` : ''}
                <div class="quiz-options">
                    ${q.choices.map((c, i) => {
                        let cls = '';
                        if (answered) {
                            if (c === q.correct) cls = 'correct';
                            else if (c === es.answers[es.current]) cls = 'incorrect';
                        }
                        return `<button class="quiz-option ${cls}" data-answer="${c}" ${answered ? 'disabled' : ''}>${c}</button>`;
                    }).join('')}
                </div>
                ${answered ? `
                    <div class="quiz-feedback show ${es.answers[es.current] === q.correct ? 'correct-fb' : 'incorrect-fb'}">
                        ${es.answers[es.current] === q.correct
                            ? `${I18n.t('correct')}`
                            : `${I18n.t('incorrect')}`
                        }
                        <div class="exam-detail-explanation">${q.detail}</div>
                        ${q.translation ? `<div class="exam-detail-translation">${q.translation}</div>` : ''}
                    </div>
                ` : ''}
            </div>
            <div class="exam-nav-buttons">
                <button class="btn btn-secondary" id="exam-prev" ${es.current === 0 ? 'disabled' : ''}>${I18n.t('previous')}</button>
                ${es.current < es.questions.length - 1
                    ? `<button class="btn btn-primary" id="exam-next-q">${I18n.t('next')}</button>`
                    : `<button class="btn btn-success" id="exam-submit">${I18n.t('exam_submit')}</button>`
                }
            </div>`;

        // Bind events
        if (!answered) {
            container.querySelectorAll('.quiz-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    es.answers[es.current] = opt.dataset.answer;
                    this.renderExam(container);
                });
            });
        }

        document.getElementById('exam-prev')?.addEventListener('click', () => {
            if (es.current > 0) { es.current--; this.renderExam(container); }
        });
        document.getElementById('exam-next-q')?.addEventListener('click', () => {
            if (es.current < es.questions.length - 1) { es.current++; this.renderExam(container); }
        });
        document.getElementById('exam-submit')?.addEventListener('click', () => this.finishExam());

        if (answered) {
            document.addEventListener('keydown', function onEnter(e) {
                if (e.key === 'Enter') {
                    document.removeEventListener('keydown', onEnter);
                    if (es.current < es.questions.length - 1) {
                        es.current++;
                        ExamModule.renderExam(container);
                    } else {
                        ExamModule.finishExam();
                    }
                }
            });
        }

        document.getElementById('exam-finish')?.addEventListener('click', () => {
            if (confirm(I18n.t('exam_confirm_finish'))) {
                this.finishExam();
            }
        });

        container.querySelectorAll('.exam-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                es.current = parseInt(dot.dataset.qi);
                this.renderExam(container);
            });
        });

        if (es.timeLimit > 0) this.updateTimerDisplay();
    },

    finishExam() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        const es = this.examState;
        es.started = false;
        es.finished = true;

        let correct = 0;
        const byType = {};

        es.questions.forEach((q, i) => {
            const isCorrect = es.answers[i] === q.correct;
            if (isCorrect) correct++;

            if (!byType[q.type]) byType[q.type] = { correct: 0, total: 0 };
            byType[q.type].total++;
            if (isCorrect) byType[q.type].correct++;
        });

        es.results = {
            total: es.questions.length,
            correct,
            pct: Math.round((correct / es.questions.length) * 100),
            byType,
            duration: Math.round((Date.now() - es.startTime) / 1000)
        };

        this.render();
    },

    renderResults(container) {
        const r = this.examState.results;
        const durMin = Math.floor(r.duration / 60);
        const durSec = r.duration % 60;

        let verdict = '';
        if (r.pct >= 90) verdict = I18n.t('exam_result_excellent');
        else if (r.pct >= 70) verdict = I18n.t('exam_result_good');
        else if (r.pct >= 50) verdict = I18n.t('exam_result_ok');
        else verdict = I18n.t('exam_result_bad');

        const typeLabels = {
            kanji: I18n.t('exam_q_kanji'),
            vocab: I18n.t('exam_q_vocab'),
            grammar: I18n.t('exam_q_grammar'),
            reading: I18n.t('exam_sec_reading')
        };

        const colors = { kanji: 'var(--accent-light)', vocab: 'var(--success)', grammar: 'var(--sakura)', reading: 'var(--info)' };

        container.innerHTML = `
            <div class="exam-results">
                <div style="font-size:48px; margin-bottom:16px;">&#x1F4CA;</div>
                <div class="exam-results-score">${r.pct}%</div>
                <p style="font-size:18px; color:var(--text-secondary); margin-top:8px;">${r.correct}/${r.total} ${I18n.t('good_answers')}</p>
                <p style="font-size:16px; color:var(--accent-light); margin-top:8px;">${verdict}</p>
                <p style="font-size:14px; color:var(--text-muted); margin-top:4px;">
                    ${I18n.t('exam_duration')} ${durMin}min ${durSec}s
                </p>

                <div class="exam-results-detail">
                    ${Object.entries(r.byType).map(([type, data]) => `
                    <div class="exam-detail-item">
                        <div class="exam-detail-value" style="color:${colors[type] || 'var(--accent-light)'};">${data.correct}/${data.total}</div>
                        <div class="exam-detail-label">${typeLabels[type] || type}</div>
                    </div>`).join('')}
                </div>

                <div style="margin-top:32px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                    <button class="btn btn-primary" id="exam-retry">${I18n.t('exam_retry')}</button>
                    <button class="btn btn-secondary" id="exam-review">${I18n.t('exam_review')}</button>
                </div>
            </div>`;

        document.getElementById('exam-retry')?.addEventListener('click', () => {
            this.examState = null;
            this.render();
        });

        document.getElementById('exam-review')?.addEventListener('click', () => {
            this.renderReview(container);
        });

        App.updateDashboard();
    },

    renderReview(container) {
        const es = this.examState;
        const errors = es.questions.map((q, i) => ({ ...q, userAnswer: es.answers[i], index: i }))
            .filter(q => q.userAnswer !== q.correct);

        if (errors.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding:40px;">
                    <div style="font-size:48px; margin-bottom:16px;">&#x1F389;</div>
                    <h2>${I18n.t('exam_perfect')}</h2>
                    <button class="btn btn-primary" id="exam-back-results" style="margin-top:24px;">${I18n.t('back')}</button>
                </div>`;
            document.getElementById('exam-back-results')?.addEventListener('click', () => this.render());
            return;
        }

        container.innerHTML = `
            <div class="exam-review-container">
                <h2 style="margin-bottom:24px;">${I18n.t('exam_review_title')} (${errors.length})</h2>
                ${errors.map(q => `
                    <div class="exam-review-card">
                        <div class="exam-review-header">
                            <span class="exam-q-number">Q${q.index + 1}</span>
                            <span class="exam-q-sub">${q.sectionSub || ''}</span>
                        </div>
                        <div class="exam-q-text">${q.text}</div>
                        ${q.translation ? `<div class="exam-q-translation">${q.translation}</div>` : ''}
                        <div class="exam-review-answers">
                            <div class="exam-review-wrong">
                                <span class="exam-review-label">${I18n.t('exam_your_answer')}</span>
                                ${q.userAnswer || I18n.t('exam_no_answer')}
                            </div>
                            <div class="exam-review-correct">
                                <span class="exam-review-label">${I18n.t('exam_correct_answer')}</span>
                                ${q.correct}
                            </div>
                        </div>
                        <div class="exam-review-detail">${q.detail}</div>
                    </div>
                `).join('')}
                <div style="text-align:center; margin-top:24px;">
                    <button class="btn btn-primary" id="exam-back-results">${I18n.t('exam_back_results')}</button>
                </div>
            </div>`;

        document.getElementById('exam-back-results')?.addEventListener('click', () => this.renderResults(container));
    }
};
