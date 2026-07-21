// ========================================
// Listening Practice Module
// ========================================

window.ListeningModule = {
    quizState: null,

    init() {},

    render() {
        const container = document.getElementById('listening-content');
        if (!container) return;
        if (this.quizState) {
            this.renderQuiz(container);
        } else {
            this.renderSetup(container);
        }
    },

    renderSetup(container) {
        container.innerHTML = `
            <div style="max-width:600px; margin:0 auto; text-align:center;">
                <div style="font-size:48px; margin-bottom:16px;">&#x1F3A7;</div>
                <h2>${I18n.t('listening_title')}</h2>
                <p style="color:var(--text-secondary); margin-bottom:32px;">${I18n.t('listening_desc')}</p>
                <div class="exam-type-grid">
                    <div class="exam-type-card selected" data-type="vocab">
                        <div class="exam-type-icon">&#x8A00;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_vocab')}</div>
                    </div>
                    <div class="exam-type-card" data-type="kanji">
                        <div class="exam-type-icon">&#x6F22;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_kanji')}</div>
                    </div>
                    <div class="exam-type-card" data-type="grammar">
                        <div class="exam-type-icon">&#x6587;</div>
                        <div class="exam-type-title">${I18n.t('exam_type_grammar')}</div>
                    </div>
                </div>
                <button class="btn btn-primary btn-lg" id="listening-start" style="margin-top:24px;">${I18n.t('start')}</button>
            </div>`;

        let selectedType = 'vocab';
        container.querySelectorAll('.exam-type-card').forEach(card => {
            card.addEventListener('click', () => {
                container.querySelectorAll('.exam-type-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedType = card.dataset.type;
            });
        });

        document.getElementById('listening-start')?.addEventListener('click', () => {
            this.startQuiz(selectedType);
        });
    },

    startQuiz(type) {
        const level = LevelFilter.get();
        const questions = [];
        const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

        if (type === 'vocab') {
            const themes = level === 'N4' ? AppData.vocabN4 : level === 'N5' ? AppData.vocabN5 : [...AppData.vocabN5, ...AppData.vocabN4];
            const words = shuffle(themes.flatMap(t => t.words)).slice(0, 15);
            words.forEach(w => {
                const pool = themes.flatMap(t => t.words);
                const wrongs = shuffle(pool.filter(x => x.kana !== w.kana)).slice(0, 3);
                questions.push({
                    audio: w.kana,
                    question: I18n.t('vocab_what_translation'),
                    choices: shuffle([w, ...wrongs]).map(x => ({ text: L(x, "meaning"), correct: x.kana === w.kana })),
                    detail: `${F(w.kanji,w.kana)||w.kana} (${w.kana}) = ${L(w, "meaning")}`
                });
            });
        } else if (type === 'kanji') {
            const pool = level === 'N4' ? AppData.kanjiN4 : level === 'N5' ? AppData.kanjiN5 : [...AppData.kanjiN5, ...AppData.kanjiN4];
            const kanjis = shuffle(pool).slice(0, 15);
            kanjis.forEach(k => {
                const reading = k.kun ? k.kun.split('、')[0].replace(/[-.]/g, '') : (k.on || k.kanji);
                const wrongs = shuffle(pool.filter(x => x.kanji !== k.kanji)).slice(0, 3);
                questions.push({
                    audio: reading,
                    question: I18n.t('exam_kanji_meaning_q'),
                    choices: shuffle([k, ...wrongs]).map(x => ({ text: x.kanji + ' (' + L(x, "meaning") + ')', correct: x.kanji === k.kanji })),
                    detail: `${k.kanji} : ${L(k, "meaning")} (${k.on || '-'} / ${k.kun || '-'})`
                });
            });
        } else if (type === 'grammar') {
            const pool = level === 'N4' ? AppData.grammarN4 : level === 'N5' ? AppData.grammarN5 : [...AppData.grammarN5, ...AppData.grammarN4];
            const items = shuffle(pool.filter(g => g.examples?.length > 0)).slice(0, 10);
            items.forEach(g => {
                const ex = g.examples[0];
                const reading = ex.reading || '';
                if (!reading) return;
                questions.push({
                    audio: reading,
                    question: I18n.t('vocab_what_translation'),
                    choices: [
                        { text: L(ex, "fr"), correct: true },
                        ...shuffle(pool.filter(x => x.id !== g.id && x.examples?.length > 0)).slice(0, 3)
                            .map(x => ({ text: L(x.examples[0], "fr"), correct: false }))
                    ].sort(() => Math.random() - 0.5),
                    detail: `${g.title}: ${reading} = ${L(ex, "fr")}`
                });
            });
        }

        this.quizState = { questions, current: 0, score: 0, answers: [] };
        this.render();
    },

    speak(text) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'ja-JP';
            u.rate = 0.75;
            speechSynthesis.speak(u);
        }
    },

    renderQuiz(container) {
        const qs = this.quizState;
        if (qs.current >= qs.questions.length) {
            this.renderResults(container);
            return;
        }

        const q = qs.questions[qs.current];
        const pct = (qs.current / qs.questions.length) * 100;
        const answered = qs.answers[qs.current] !== undefined;

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-top-bar">
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                        <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm quiz-quit-btn" id="listen-quit">${I18n.t('quiz_quit')}</button>
                </div>
                <div class="quiz-card" style="text-align:center;">
                    <button class="btn btn-primary btn-lg" id="listen-play" style="font-size:24px; padding:20px 40px;">
                        &#x1F50A; ${I18n.t(answered ? 'listening_replay' : 'listening_play')}
                    </button>
                    <div class="quiz-hint" style="margin-top:16px;">${q.question}</div>
                </div>
                <div class="quiz-options">
                    ${q.choices.map(c => {
                        let cls = '';
                        if (answered) {
                            if (c.correct) cls = 'correct';
                            else if (qs.answers[qs.current]?.text === c.text && !c.correct) cls = 'incorrect';
                        }
                        return `<button class="quiz-option ${cls}" data-text="${c.text}" ${answered ? 'disabled' : ''}>${c.text}</button>`;
                    }).join('')}
                </div>
                <div class="quiz-feedback" id="listen-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="listen-next" style="display:${answered ? 'inline-flex' : 'none'}">${I18n.t('next')}</button>
                </div>
            </div>`;

        // Auto-play audio
        setTimeout(() => this.speak(q.audio), 300);

        document.getElementById('listen-play')?.addEventListener('click', () => this.speak(q.audio));

        if (answered) {
            const fb = document.getElementById('listen-feedback');
            const a = qs.answers[qs.current];
            fb.className = 'quiz-feedback show ' + (a.correct ? 'correct-fb' : 'incorrect-fb');
            fb.innerHTML = (a.correct ? I18n.t('correct') : I18n.t('incorrect')) + `<br><span style="font-size:13px;">${q.detail}</span>`;
        }

        if (!answered) {
            container.querySelectorAll('.quiz-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    const chosen = q.choices.find(c => c.text === opt.dataset.text);
                    const correct = chosen?.correct || false;
                    if (correct) qs.score++;
                    qs.answers[qs.current] = { text: opt.dataset.text, correct };
                    this.renderQuiz(container);
                });
            });
        }

        document.getElementById('listen-next')?.addEventListener('click', () => { qs.current++; this.renderQuiz(container); });
        document.getElementById('listen-quit')?.addEventListener('click', () => { this.quizState = null; this.render(); });

        if (answered) {
            document.addEventListener('keydown', function onEnter(e) {
                if (e.key === 'Enter') { document.removeEventListener('keydown', onEnter); qs.current++; ListeningModule.renderQuiz(container); }
            });
        }
    },

    renderResults(container) {
        const qs = this.quizState;
        const pct = Math.round((qs.score / qs.questions.length) * 100);
        container.innerHTML = `
            <div class="quiz-container" style="text-align:center;">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} ${I18n.t('good_answers')}</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center;">
                        <button class="btn btn-primary" id="listen-retry">${I18n.t('retry')}</button>
                        <button class="btn btn-secondary" id="listen-back">${I18n.t('back')}</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('listen-retry')?.addEventListener('click', () => { this.quizState = null; this.render(); });
        document.getElementById('listen-back')?.addEventListener('click', () => { this.quizState = null; this.render(); });
    }
};
