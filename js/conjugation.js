// ========================================
// Conjugation Practice Module
// ========================================

window.ConjugationModule = {
    currentForm: null,
    quizState: null,

    // Verb database with groups and base forms
    verbs: [
        // Group 1 (五段 godan) - u-verbs
        {dict:"飲む",kana:"のむ",meaningFr:"boire",meaningEn:"to drink",group:1,stem:"のm",level:"N5"},
        {dict:"書く",kana:"かく",meaningFr:"ecrire",meaningEn:"to write",group:1,stem:"かk",level:"N5"},
        {dict:"話す",kana:"はなす",meaningFr:"parler",meaningEn:"to speak",group:1,stem:"はなs",level:"N5"},
        {dict:"待つ",kana:"まつ",meaningFr:"attendre",meaningEn:"to wait",group:1,stem:"まt",level:"N5"},
        {dict:"読む",kana:"よむ",meaningFr:"lire",meaningEn:"to read",group:1,stem:"よm",level:"N5"},
        {dict:"行く",kana:"いく",meaningFr:"aller",meaningEn:"to go",group:1,stem:"いk",level:"N5",teIrr:"いって",taIrr:"いった"},
        {dict:"買う",kana:"かう",meaningFr:"acheter",meaningEn:"to buy",group:1,stem:"かw",level:"N5"},
        {dict:"遊ぶ",kana:"あそぶ",meaningFr:"jouer",meaningEn:"to play",group:1,stem:"あそb",level:"N5"},
        {dict:"死ぬ",kana:"しぬ",meaningFr:"mourir",meaningEn:"to die",group:1,stem:"しn",level:"N5"},
        {dict:"帰る",kana:"かえる",meaningFr:"rentrer",meaningEn:"to return",group:1,stem:"かえr",level:"N5"},
        {dict:"泳ぐ",kana:"およぐ",meaningFr:"nager",meaningEn:"to swim",group:1,stem:"およg",level:"N5"},
        {dict:"歩く",kana:"あるく",meaningFr:"marcher",meaningEn:"to walk",group:1,stem:"あるk",level:"N5"},
        {dict:"立つ",kana:"たつ",meaningFr:"se lever",meaningEn:"to stand",group:1,stem:"たt",level:"N5"},
        {dict:"持つ",kana:"もつ",meaningFr:"tenir",meaningEn:"to hold",group:1,stem:"もt",level:"N5"},
        {dict:"走る",kana:"はしる",meaningFr:"courir",meaningEn:"to run",group:1,stem:"はしr",level:"N5"},
        {dict:"送る",kana:"おくる",meaningFr:"envoyer",meaningEn:"to send",group:1,stem:"おくr",level:"N5"},
        {dict:"売る",kana:"うる",meaningFr:"vendre",meaningEn:"to sell",group:1,stem:"うr",level:"N5"},
        {dict:"作る",kana:"つくる",meaningFr:"fabriquer",meaningEn:"to make",group:1,stem:"つくr",level:"N5"},
        {dict:"座る",kana:"すわる",meaningFr:"s'asseoir",meaningEn:"to sit",group:1,stem:"すわr",level:"N5"},
        {dict:"歌う",kana:"うたう",meaningFr:"chanter",meaningEn:"to sing",group:1,stem:"うたw",level:"N5"},
        // Group 2 (一段 ichidan) - ru-verbs
        {dict:"食べる",kana:"たべる",meaningFr:"manger",meaningEn:"to eat",group:2,stem:"たべ",level:"N5"},
        {dict:"見る",kana:"みる",meaningFr:"regarder",meaningEn:"to watch",group:2,stem:"み",level:"N5"},
        {dict:"起きる",kana:"おきる",meaningFr:"se lever",meaningEn:"to wake up",group:2,stem:"おき",level:"N5"},
        {dict:"寝る",kana:"ねる",meaningFr:"dormir",meaningEn:"to sleep",group:2,stem:"ね",level:"N5"},
        {dict:"教える",kana:"おしえる",meaningFr:"enseigner",meaningEn:"to teach",group:2,stem:"おしえ",level:"N5"},
        {dict:"出る",kana:"でる",meaningFr:"sortir",meaningEn:"to go out",group:2,stem:"で",level:"N5"},
        {dict:"入れる",kana:"いれる",meaningFr:"mettre dedans",meaningEn:"to put in",group:2,stem:"いれ",level:"N5"},
        {dict:"開ける",kana:"あける",meaningFr:"ouvrir",meaningEn:"to open",group:2,stem:"あけ",level:"N5"},
        {dict:"閉める",kana:"しめる",meaningFr:"fermer",meaningEn:"to close",group:2,stem:"しめ",level:"N5"},
        {dict:"着る",kana:"きる",meaningFr:"porter",meaningEn:"to wear",group:2,stem:"き",level:"N5"},
        {dict:"忘れる",kana:"わすれる",meaningFr:"oublier",meaningEn:"to forget",group:2,stem:"わすれ",level:"N5"},
        {dict:"答える",kana:"こたえる",meaningFr:"repondre",meaningEn:"to answer",group:2,stem:"こたえ",level:"N5"},
        {dict:"始める",kana:"はじめる",meaningFr:"commencer",meaningEn:"to begin",group:2,stem:"はじめ",level:"N4"},
        {dict:"決める",kana:"きめる",meaningFr:"decider",meaningEn:"to decide",group:2,stem:"きめ",level:"N4"},
        {dict:"調べる",kana:"しらべる",meaningFr:"examiner",meaningEn:"to examine",group:2,stem:"しらべ",level:"N4"},
        {dict:"続ける",kana:"つづける",meaningFr:"continuer",meaningEn:"to continue",group:2,stem:"つづけ",level:"N4"},
        // Group 3 (irregular)
        {dict:"する",kana:"する",meaningFr:"faire",meaningEn:"to do",group:3,stem:"し",level:"N5"},
        {dict:"来る",kana:"くる",meaningFr:"venir",meaningEn:"to come",group:3,stem:"き",level:"N5"},
    ],

    // Conjugation forms
    forms: [
        {id:"masu",     nameFr:"Forme polie (ます)", nameEn:"Polite form (ます)", level:"N5"},
        {id:"nai",      nameFr:"Forme negative (ない)", nameEn:"Negative form (ない)", level:"N5"},
        {id:"te",       nameFr:"Forme en て", nameEn:"Te-form (て)", level:"N5"},
        {id:"ta",       nameFr:"Forme passee (た)", nameEn:"Past form (た)", level:"N5"},
        {id:"tai",      nameFr:"Forme volitive (たい)", nameEn:"Desire form (たい)", level:"N5"},
        {id:"potential", nameFr:"Forme potentielle", nameEn:"Potential form", level:"N4"},
        {id:"passive",  nameFr:"Forme passive", nameEn:"Passive form", level:"N4"},
        {id:"causative", nameFr:"Forme causative", nameEn:"Causative form", level:"N4"},
        {id:"imperative", nameFr:"Forme imperative", nameEn:"Imperative form", level:"N4"},
        {id:"conditional", nameFr:"Forme conditionnelle (ば)", nameEn:"Conditional form (ば)", level:"N4"},
    ],

    // Conjugation rules engine
    conjugate(verb, formId) {
        const g = verb.group;
        const s = verb.stem;

        // Group 3 irregulars
        if (g === 3) {
            if (verb.dict === 'する') {
                return {masu:'します',nai:'しない',te:'して',ta:'した',tai:'したい',
                        potential:'できる',passive:'される',causative:'させる',imperative:'しろ',conditional:'すれば'}[formId];
            }
            if (verb.dict === '来る') {
                return {masu:'きます',nai:'こない',te:'きて',ta:'きた',tai:'きたい',
                        potential:'こられる',passive:'こられる',causative:'こさせる',imperative:'こい',conditional:'くれば'}[formId];
            }
        }

        // Group 2 (ichidan)
        if (g === 2) {
            return {
                masu: s + 'ます', nai: s + 'ない', te: s + 'て', ta: s + 'た', tai: s + 'たい',
                potential: s + 'られる', passive: s + 'られる', causative: s + 'させる',
                imperative: s + 'ろ', conditional: s + 'れば'
            }[formId];
        }

        // Group 1 (godan) — complex te/ta rules
        const lastChar = verb.kana.slice(-1);
        const base = verb.kana.slice(0, -1);

        // Masu stem (u→i row)
        const iRow = {'く':'き','ぐ':'ぎ','す':'し','つ':'ち','ぬ':'に','ぶ':'び','む':'み','る':'り','う':'い'};
        const masuStem = base + iRow[lastChar];

        // A-row (for nai)
        const aRow = {'く':'か','ぐ':'が','す':'さ','つ':'た','ぬ':'な','ぶ':'ば','む':'ま','る':'ら','う':'わ'};
        const aStem = base + aRow[lastChar];

        // E-row (for potential, imperative, conditional)
        const eRow = {'く':'け','ぐ':'げ','す':'せ','つ':'て','ぬ':'ね','ぶ':'べ','む':'め','る':'れ','う':'え'};
        const eStem = base + eRow[lastChar];

        // Te/Ta forms
        let te, ta;
        if (verb.teIrr) { te = verb.teIrr; ta = verb.taIrr; }
        else if ('す' === lastChar) { te = base + 'して'; ta = base + 'した'; }
        else if ('く' === lastChar) { te = base + 'いて'; ta = base + 'いた'; }
        else if ('ぐ' === lastChar) { te = base + 'いで'; ta = base + 'いだ'; }
        else if ('む' === lastChar || 'ぶ' === lastChar || 'ぬ' === lastChar) { te = base + 'んで'; ta = base + 'んだ'; }
        else if ('つ' === lastChar || 'る' === lastChar || 'う' === lastChar) { te = base + 'って'; ta = base + 'った'; }

        return {
            masu: masuStem + 'ます', nai: aStem + 'ない', te, ta, tai: masuStem + 'たい',
            potential: eStem + 'る', passive: aStem + 'れる', causative: aStem + 'せる',
            imperative: eStem, conditional: eStem + 'ば'
        }[formId];
    },

    init() {
        this.render();
    },

    render() {
        const container = document.getElementById('conjugation-content');
        if (!container) return;
        if (this.quizState) {
            this.renderQuiz(container);
        } else {
            this.renderFormSelect(container);
        }
    },

    renderFormSelect(container) {
        const level = LevelFilter.get();
        const forms = this.forms.filter(f => level === 'all' || level === 'N4' || f.level === level);

        container.innerHTML = `
            <div style="max-width:600px; margin:0 auto; text-align:center;">
                <div style="font-size:48px; margin-bottom:16px;">🔄</div>
                <h2>${I18n.t('conj_title')}</h2>
                <p style="color:var(--text-secondary); margin-bottom:24px;">${I18n.t('conj_desc')}</p>
                <div class="conj-form-grid">
                    ${forms.map(f => `
                        <button class="conj-form-card" data-form="${f.id}">
                            <div class="conj-form-name">${I18n.locale === 'en' ? f.nameEn : f.nameFr}</div>
                            <span class="kanji-level-tag ${f.level.toLowerCase()}">${f.level}</span>
                        </button>
                    `).join('')}
                </div>
                <button class="btn btn-primary btn-lg" id="conj-start-all" style="margin-top:24px;">${I18n.t('conj_mix_all')}</button>
            </div>`;

        container.querySelectorAll('.conj-form-card').forEach(card => {
            card.addEventListener('click', () => this.startQuiz(card.dataset.form));
        });
        document.getElementById('conj-start-all')?.addEventListener('click', () => this.startQuiz('all'));
    },

    startQuiz(formId) {
        const level = LevelFilter.get();
        let verbs = this.verbs.filter(v => level === 'all' || v.level === level || level === 'N4');
        let forms;
        if (formId === 'all') {
            forms = this.forms.filter(f => level === 'all' || level === 'N4' || f.level === level);
        } else {
            forms = this.forms.filter(f => f.id === formId);
        }

        const questions = [];
        const shuffled = [...verbs].sort(() => Math.random() - 0.5).slice(0, 15);
        shuffled.forEach(v => {
            const f = forms[Math.floor(Math.random() * forms.length)];
            const answer = this.conjugate(v, f.id);
            if (answer) {
                questions.push({ verb: v, form: f, answer });
            }
        });

        this.quizState = { questions, current: 0, score: 0, answers: [] };
        this.render();
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
                    <button class="btn btn-secondary btn-sm quiz-quit-btn" id="conj-quit">${I18n.t('quiz_quit')}</button>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt" style="font-size:40px;">${F(q.verb.dict, q.verb.kana)}</div>
                    <div class="quiz-hint" style="font-size:16px;">${L(q.verb,"meaning")} — <strong>${I18n.locale === 'en' ? q.form.nameEn : q.form.nameFr}</strong></div>
                    <div style="margin-top:4px; font-size:13px; color:var(--text-muted);">
                        ${I18n.t('conj_group')} ${q.verb.group === 1 ? I18n.t('conj_g1') : q.verb.group === 2 ? I18n.t('conj_g2') : I18n.t('conj_g3')}
                    </div>
                </div>
                ${!answered ? `
                    <div class="quiz-input-wrap">
                        <input type="text" class="quiz-input" id="conj-answer" placeholder="${I18n.t('conj_placeholder')}" autocomplete="off" autofocus>
                        <button class="btn btn-primary" id="conj-submit">${I18n.t('exam_validate')}</button>
                    </div>
                ` : ''}
                <div class="quiz-feedback" id="conj-feedback"${answered ? '' : ' style="display:none"'}></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="conj-next" style="display:${answered ? 'inline-flex' : 'none'}">${I18n.t('next')}</button>
                </div>
            </div>`;

        if (answered) {
            const fb = document.getElementById('conj-feedback');
            const a = qs.answers[qs.current];
            fb.style.display = '';
            fb.className = 'quiz-feedback show ' + (a.correct ? 'correct-fb' : 'incorrect-fb');
            fb.innerHTML = a.correct
                ? `${I18n.t('correct')} <strong>${q.answer}</strong>`
                : `${I18n.t('incorrect')} ${I18n.t('exam_expected')} <strong>${q.answer}</strong><br><span style="font-size:13px;">${I18n.t('exam_your_input')} ${a.userAnswer}</span>`;
        }

        if (!answered) {
            const input = document.getElementById('conj-answer');
            const check = () => {
                const val = input.value.trim();
                if (!val) return;
                const correct = val === q.answer;
                if (correct) qs.score++;
                qs.answers[qs.current] = { userAnswer: val, correct };
                speakJP(q.answer);
                Storage.recordStudy('grammar', 'conj_' + q.verb.dict + '_' + q.form.id, correct);
                this.renderQuiz(container);
            };
            document.getElementById('conj-submit')?.addEventListener('click', check);
            input?.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
            input?.focus();
        }

        document.getElementById('conj-next')?.addEventListener('click', () => {
            qs.current++;
            this.renderQuiz(container);
        });

        document.getElementById('conj-quit')?.addEventListener('click', () => {
            this.quizState = null;
            this.render();
        });

        if (answered) {
            document.addEventListener('keydown', function onEnter(e) {
                if (e.key === 'Enter') {
                    document.removeEventListener('keydown', onEnter);
                    qs.current++;
                    ConjugationModule.renderQuiz(container);
                }
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
                        <button class="btn btn-primary" id="conj-retry">${I18n.t('retry')}</button>
                        <button class="btn btn-secondary" id="conj-back">${I18n.t('back')}</button>
                    </div>
                </div>
                <div style="margin-top:32px; text-align:left;">
                    ${qs.questions.map((q, i) => {
                        const a = qs.answers[i];
                        return `<div style="padding:8px 12px; margin-bottom:4px; border-radius:6px; background:${a.correct ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)'}; font-size:14px;">
                            <strong>${F(q.verb.dict, q.verb.kana)}</strong> → ${I18n.locale === 'en' ? q.form.nameEn : q.form.nameFr}:
                            ${a.correct ? '✓ ' + q.answer : '✗ ' + a.userAnswer + ' → <strong>' + q.answer + '</strong>'}
                        </div>`;
                    }).join('')}
                </div>
            </div>`;

        document.getElementById('conj-retry')?.addEventListener('click', () => {
            this.quizState = null;
            this.startQuiz(this.currentForm || 'all');
        });
        document.getElementById('conj-back')?.addEventListener('click', () => {
            this.quizState = null;
            this.render();
        });
    }
};
