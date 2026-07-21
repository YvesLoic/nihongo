// ========================================
// Sentence Building Module (drag & drop)
// ========================================

window.SentenceModule = {
    quizState: null,

    // Sentence templates with word order
    sentences: [
        {words:["私","は","学生","です"],reading:"わたしはがくせいです",meaningFr:"Je suis etudiant.",meaningEn:"I am a student.",level:"N5"},
        {words:["毎日","日本語","を","勉強","します"],reading:"まいにちにほんごをべんきょうします",meaningFr:"J'etudie le japonais chaque jour.",meaningEn:"I study Japanese every day.",level:"N5"},
        {words:["東京","に","住んで","います"],reading:"とうきょうにすんでいます",meaningFr:"J'habite a Tokyo.",meaningEn:"I live in Tokyo.",level:"N5"},
        {words:["友達","と","映画","を","見ます"],reading:"ともだちとえいがをみます",meaningFr:"Je regarde un film avec un ami.",meaningEn:"I watch a movie with a friend.",level:"N5"},
        {words:["朝","七時","に","起きます"],reading:"あさしちじにおきます",meaningFr:"Je me leve a 7h le matin.",meaningEn:"I wake up at 7 in the morning.",level:"N5"},
        {words:["バス","で","学校","に","行きます"],reading:"バスでがっこうにいきます",meaningFr:"Je vais a l'ecole en bus.",meaningEn:"I go to school by bus.",level:"N5"},
        {words:["この","本","は","面白い","です"],reading:"このほんはおもしろいです",meaningFr:"Ce livre est interessant.",meaningEn:"This book is interesting.",level:"N5"},
        {words:["日本","の","食べ物","が","好き","です"],reading:"にほんのたべものがすきです",meaningFr:"J'aime la nourriture japonaise.",meaningEn:"I like Japanese food.",level:"N5"},
        {words:["図書館","で","本","を","読みます"],reading:"としょかんでほんをよみます",meaningFr:"Je lis des livres a la bibliotheque.",meaningEn:"I read books at the library.",level:"N5"},
        {words:["寿司","を","食べ","たい","です"],reading:"すしをたべたいです",meaningFr:"Je veux manger des sushis.",meaningEn:"I want to eat sushi.",level:"N5"},
        {words:["昨日","映画","を","見","ました"],reading:"きのうえいがをみました",meaningFr:"J'ai regarde un film hier.",meaningEn:"I watched a movie yesterday.",level:"N5"},
        {words:["ここ","で","写真","を","撮って","も","いい","です","か"],reading:"ここでしゃしんをとってもいいですか",meaningFr:"Puis-je prendre une photo ici ?",meaningEn:"May I take a photo here?",level:"N5"},
        {words:["日本語","を","話す","こと","が","できます"],reading:"にほんごをはなすことができます",meaningFr:"Je peux parler japonais.",meaningEn:"I can speak Japanese.",level:"N5"},
        {words:["薬","を","飲んだ","方","が","いい","です"],reading:"くすりをのんだほうがいいです",meaningFr:"Vous feriez mieux de prendre un medicament.",meaningEn:"You should take medicine.",level:"N5"},
        {words:["雨","が","降ったら","家","に","います"],reading:"あめがふったらいえにいます",meaningFr:"S'il pleut, je reste a la maison.",meaningEn:"If it rains, I'll stay home.",level:"N4"},
        {words:["音楽","を","聞き","ながら","勉強","します"],reading:"おんがくをききながらべんきょうします",meaningFr:"J'etudie en ecoutant de la musique.",meaningEn:"I study while listening to music.",level:"N4"},
        {words:["この","料理","を","食べて","みて","ください"],reading:"このりょうりをたべてみてください",meaningFr:"Essayez de gouter ce plat.",meaningEn:"Please try this dish.",level:"N4"},
        {words:["日本語","が","話せる","ように","なりました"],reading:"にほんごがはなせるようになりました",meaningFr:"J'en suis arrive a pouvoir parler japonais.",meaningEn:"I became able to speak Japanese.",level:"N4"},
        {words:["毎日","運動","する","ように","しています"],reading:"まいにちうんどうするようにしています",meaningFr:"Je fais en sorte de faire du sport chaque jour.",meaningEn:"I make sure to exercise every day.",level:"N4"},
        {words:["勉強","した","のに","試験","に","落ちました"],reading:"べんきょうしたのにしけんにおちました",meaningFr:"Bien que j'aie etudie, j'ai rate l'examen.",meaningEn:"Even though I studied, I failed the exam.",level:"N4"},
        {words:["宿題","を","全部","やって","しまいました"],reading:"しゅくだいをぜんぶやってしまいました",meaningFr:"J'ai fini tous mes devoirs.",meaningEn:"I finished all my homework.",level:"N4"},
        {words:["旅行","の","前","に","ホテル","を","予約","しておきます"],reading:"りょこうのまえにホテルをよやくしておきます",meaningFr:"Je reserve l'hotel avant le voyage.",meaningEn:"I'll book the hotel before the trip.",level:"N4"},
    ],

    init() {},

    render() {
        const container = document.getElementById('sentence-content');
        if (!container) return;
        if (this.quizState) {
            this.renderQuiz(container);
        } else {
            this.startQuiz();
        }
    },

    startQuiz() {
        const level = LevelFilter.get();
        let pool = this.sentences.filter(s => level === 'all' || s.level === level || (level === 'N4'));
        const questions = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
        this.quizState = { questions, current: 0, score: 0 };
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
        const shuffled = [...q.words].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-top-bar">
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                        <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm quiz-quit-btn" id="sent-quit">${I18n.t('quiz_quit')}</button>
                </div>
                <div class="quiz-card">
                    <div class="quiz-hint" style="font-size:16px;">${I18n.locale === 'en' ? q.meaningEn : q.meaningFr}</div>
                </div>
                <div class="sentence-answer" id="sent-answer"></div>
                <div class="sentence-pool" id="sent-pool">
                    ${shuffled.map(w => `<button class="sentence-word" data-word="${w}">${w}</button>`).join('')}
                </div>
                <div style="display:flex; gap:12px; justify-content:center; margin-top:20px;">
                    <button class="btn btn-secondary" id="sent-reset">${I18n.t('sentence_reset')}</button>
                    <button class="btn btn-primary" id="sent-check">${I18n.t('sentence_check')}</button>
                </div>
                <div class="quiz-feedback" id="sent-feedback" style="margin-top:20px;"></div>
                <div class="quiz-actions" style="margin-top:16px;">
                    <button class="btn btn-secondary" id="sent-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const pool = document.getElementById('sent-pool');
        const answer = document.getElementById('sent-answer');
        let answered = false;

        // Click word to move to answer area
        pool.querySelectorAll('.sentence-word').forEach(btn => {
            btn.addEventListener('click', () => {
                if (answered) return;
                btn.style.display = 'none';
                const placed = document.createElement('button');
                placed.className = 'sentence-word placed';
                placed.textContent = btn.dataset.word;
                placed.dataset.word = btn.dataset.word;
                placed.addEventListener('click', () => {
                    if (answered) return;
                    placed.remove();
                    btn.style.display = '';
                });
                answer.appendChild(placed);
            });
        });

        document.getElementById('sent-reset')?.addEventListener('click', () => {
            if (answered) return;
            answer.innerHTML = '';
            pool.querySelectorAll('.sentence-word').forEach(b => b.style.display = '');
        });

        document.getElementById('sent-check')?.addEventListener('click', () => {
            if (answered) return;
            const placed = answer.querySelectorAll('.sentence-word');
            if (placed.length !== q.words.length) return;

            answered = true;
            const userOrder = Array.from(placed).map(b => b.dataset.word);
            const correct = JSON.stringify(userOrder) === JSON.stringify(q.words);
            if (correct) qs.score++;

            const fb = document.getElementById('sent-feedback');
            fb.className = 'quiz-feedback show ' + (correct ? 'correct-fb' : 'incorrect-fb');
            fb.innerHTML = correct
                ? `${I18n.t('correct')} <strong>${q.words.join('')}</strong>`
                : `${I18n.t('incorrect')}<br>${I18n.t('exam_expected')} <strong>${q.words.join('')}</strong><br><span style="font-size:13px;">${q.reading}</span>`;

            // Color placed words
            placed.forEach((b, i) => {
                b.classList.add(b.dataset.word === q.words[i] ? 'correct' : 'incorrect');
            });

            document.getElementById('sent-next').style.display = 'inline-flex';
        });

        document.getElementById('sent-next')?.addEventListener('click', () => { qs.current++; this.renderQuiz(container); });
        document.getElementById('sent-quit')?.addEventListener('click', () => { this.quizState = null; this.startQuiz(); });
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
                        <button class="btn btn-primary" id="sent-retry">${I18n.t('retry')}</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('sent-retry')?.addEventListener('click', () => { this.quizState = null; this.startQuiz(); });
    }
};
