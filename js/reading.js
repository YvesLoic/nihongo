// ========================================
// Reading Comprehension Module
// ========================================

window.ReadingModule = {
    currentTextIndex: null,
    quizState: null,

    // N5 Reading passages with questions
    textsN5: [
        {
            id: 'n5_1',
            title: 'My Daily Life',
            titleJp: '私の一日',
            text: '私はたなかゆきです。毎朝(まいあさ)六時半(ろくじはん)に起(お)きます。七時(しちじ)に朝(あさ)ご飯(はん)を食(た)べます。朝ご飯はパンと卵(たまご)とコーヒーです。八時(はちじ)に家(いえ)を出(で)て、電車(でんしゃ)で学校(がっこう)に行(い)きます。学校は九時(くじ)から三時(さんじ)までです。学校の後(あと)、図書館(としょかん)で日本語(にほんご)を勉強(べんきょう)します。六時(ろくじ)に家に帰(かえ)ります。晩(ばん)ご飯(はん)の後、テレビを見(み)たり、本(ほん)を読(よ)んだりします。十一時(じゅういちじ)に寝(ね)ます。',
            translation: "Je suis Tanaka Yuki. Chaque matin, je me leve a 6h30. Je mange le petit-dejeuner a 7h. C'est du pain, des oeufs et du cafe. Je quitte la maison a 8h et vais a l'ecole en train. L'ecole est de 9h a 15h. Apres l'ecole, j'etudie le japonais a la bibliotheque. Je rentre a la maison a 18h. Apres le diner, je regarde la tele ou lis des livres. Je me couche a 23h.",
            level: 'N5',
            questions: [
                { q: 'たなかさんは何時(なんじ)に起(お)きますか？', choices: ['六時', '六時半', '七時', '七時半'], correct: '六時半', explanation: 'Le texte dit: 六時半に起きます = se lever a 6h30' },
                { q: '朝(あさ)ご飯(はん)に何(なに)を食(た)べますか？', choices: ['ご飯と魚', 'パンと卵とコーヒー', 'おにぎりとお茶', 'パンと牛乳'], correct: 'パンと卵とコーヒー', explanation: 'Le texte dit: パンと卵とコーヒーです = pain, oeufs et cafe' },
                { q: '学校(がっこう)に何(なに)で行(い)きますか？', choices: ['バス', '自転車', '電車', '歩いて'], correct: '電車', explanation: 'Le texte dit: 電車で学校に行きます = aller en train' },
                { q: '学校の後(あと)、どこで勉強(べんきょう)しますか？', choices: ['家', 'カフェ', '図書館', '学校'], correct: '図書館', explanation: 'Le texte dit: 図書館で日本語を勉強します = etudier a la bibliotheque' },
                { q: '何時(なんじ)に寝(ね)ますか？', choices: ['十時', '十一時', '十二時', '九時'], correct: '十一時', explanation: 'Le texte dit: 十一時に寝ます = se coucher a 23h' }
            ]
        },
        {
            id: 'n5_2',
            title: 'At the Restaurant',
            titleJp: 'レストランで',
            text: '土曜日(どようび)に友達(ともだち)のさとうさんと日本(にほん)のレストランに行(い)きました。レストランは駅(えき)の近(ちか)くにあります。私(わたし)は魚(さかな)の料理(りょうり)を食(た)べました。とてもおいしかったです。さとうさんは肉(にく)の料理を食べました。飲(の)み物(もの)はお茶(ちゃ)を飲みました。全部(ぜんぶ)で三千円(さんぜんえん)でした。安(やす)くておいしいレストランでした。また行(い)きたいです。',
            translation: "Samedi, je suis alle dans un restaurant japonais avec mon ami Sato. Le restaurant est pres de la gare. J'ai mange un plat de poisson. C'etait tres bon. Sato a mange un plat de viande. Comme boisson, nous avons bu du the. Au total, c'etait 3000 yens. C'etait un restaurant pas cher et delicieux. Je veux y retourner.",
            level: 'N5',
            questions: [
                { q: 'いつレストランに行(い)きましたか？', choices: ['日曜日', '土曜日', '金曜日', '月曜日'], correct: '土曜日', explanation: '土曜日に行きました = samedi' },
                { q: 'レストランはどこにありますか？', choices: ['学校の近く', '家の近く', '駅の近く', '公園の近く'], correct: '駅の近く', explanation: '駅の近くにあります = pres de la gare' },
                { q: '私(わたし)は何(なに)を食(た)べましたか？', choices: ['肉の料理', '魚の料理', '野菜の料理', 'ラーメン'], correct: '魚の料理', explanation: '魚の料理を食べました = plat de poisson' },
                { q: 'いくらでしたか？', choices: ['千円', '二千円', '三千円', '五千円'], correct: '三千円', explanation: '全部で三千円でした = 3000 yens au total' },
                { q: 'レストランはどうでしたか？', choices: ['高くておいしい', '安くておいしい', '高くてまずい', '安くてまずい'], correct: '安くておいしい', explanation: '安くておいしいレストランでした = pas cher et delicieux' }
            ]
        },
        {
            id: 'n5_3',
            title: 'My Family',
            titleJp: '私の家族',
            text: '私(わたし)の家族(かぞく)は五人(ごにん)です。父(ちち)と母(はは)と姉(あね)と弟(おとうと)と私です。父は会社員(かいしゃいん)で、毎日(まいにち)電車(でんしゃ)で会社(かいしゃ)に行(い)きます。母は病院(びょういん)で働(はたら)いています。姉は大学生(だいがくせい)で、英語(えいご)を勉強(べんきょう)しています。弟は中学生(ちゅうがくせい)で、サッカーが好(す)きです。日曜日(にちようび)に家族で公園(こうえん)に行(い)ったり、映画(えいが)を見(み)たりします。',
            translation: "Ma famille est composee de 5 personnes. Mon pere, ma mere, ma grande soeur, mon petit frere et moi. Mon pere est employe et va au bureau en train tous les jours. Ma mere travaille a l'hopital. Ma grande soeur est etudiante et etudie l'anglais. Mon petit frere est collegien et aime le football. Le dimanche, nous allons au parc ou regardons des films en famille.",
            level: 'N5',
            questions: [
                { q: '家族(かぞく)は何人(なんにん)ですか？', choices: ['三人', '四人', '五人', '六人'], correct: '五人', explanation: '家族は五人です = 5 personnes' },
                { q: 'お父(とう)さんの仕事(しごと)は何(なん)ですか？', choices: ['先生', '医者', '会社員', '店員'], correct: '会社員', explanation: '父は会社員で = employe de bureau' },
                { q: 'お母(かあ)さんはどこで働(はたら)いていますか？', choices: ['学校', '病院', '会社', 'レストラン'], correct: '病院', explanation: '母は病院で働いています = travaille a l\'hopital' },
                { q: 'お姉(ねえ)さんは何(なに)を勉強(べんきょう)していますか？', choices: ['日本語', '英語', 'フランス語', '数学'], correct: '英語', explanation: '英語を勉強しています = etudie l\'anglais' },
                { q: '弟(おとうと)は何(なに)が好(す)きですか？', choices: ['野球', 'テニス', 'サッカー', 'バスケ'], correct: 'サッカー', explanation: 'サッカーが好きです = aime le football' }
            ]
        },
        {
            id: 'n5_4',
            title: 'Asking for Directions',
            titleJp: '道を聞く',
            text: 'すみません、郵便局(ゆうびんきょく)はどこですか？\nまっすぐ行(い)って、二(ふた)つ目(め)の信号(しんごう)を右(みぎ)に曲(ま)がってください。大(おお)きい白(しろ)い建物(たてもの)の隣(となり)にあります。\n歩(ある)いてどのくらいですか？\n十五分(じゅうごふん)ぐらいです。\nありがとうございます。',
            translation: "Excusez-moi, ou est la poste ?\nAllez tout droit, puis tournez a droite au deuxieme feu. C'est a cote du grand batiment blanc.\nCombien de temps a pied ?\nEnviron 15 minutes.\nMerci.",
            level: 'N5',
            questions: [
                { q: 'この人(ひと)はどこを探(さが)していますか？', choices: ['銀行', '病院', '郵便局', '駅'], correct: '郵便局', explanation: '郵便局はどこですか = ou est la poste' },
                { q: '何番目(なんばんめ)の信号(しんごう)を曲(ま)がりますか？', choices: ['一つ目', '二つ目', '三つ目', '四つ目'], correct: '二つ目', explanation: '二つ目の信号 = deuxieme feu' },
                { q: 'どちらに曲(ま)がりますか？', choices: ['左', '右', 'まっすぐ', '後ろ'], correct: '右', explanation: '右に曲がってください = tournez a droite' },
                { q: '郵便局(ゆうびんきょく)の近(ちか)くに何(なに)がありますか？', choices: ['小さい店', '大きい白い建物', '公園', '学校'], correct: '大きい白い建物', explanation: '大きい白い建物の隣 = a cote du grand batiment blanc' },
                { q: '歩(ある)いてどのくらいですか？', choices: ['五分', '十分', '十五分', '二十分'], correct: '十五分', explanation: '十五分ぐらい = environ 15 minutes' }
            ]
        }
    ],

    textsN4: [
        {
            id: 'n4_1',
            title: 'Travel Plans',
            titleJp: '旅行の計画',
            text: '来月(らいげつ)、友達(ともだち)と京都(きょうと)に旅行(りょこう)に行(い)く予定(よてい)です。京都には有名(ゆうめい)なお寺(てら)や神社(じんじゃ)がたくさんあります。特(とく)に金閣寺(きんかくじ)に行(い)ってみたいです。旅行は二泊三日(にはくみっか)の予定です。ホテルはインターネットで予約(よやく)しました。一泊(いっぱく)八千円(はっせんえん)でした。京都までは新幹線(しんかんせん)で行(い)きます。二時間(にじかん)ぐらいかかります。京都の料理(りょうり)も楽(たの)しみです。特に湯豆腐(ゆどうふ)が食(た)べたいです。天気(てんき)がよければ、嵐山(あらしやま)も散歩(さんぽ)したいと思(おも)います。',
            translation: "Le mois prochain, je prevois de voyager a Kyoto avec des amis. A Kyoto, il y a beaucoup de temples et sanctuaires celebres. Je veux surtout visiter le Kinkaku-ji. Le voyage est prevu pour 2 nuits et 3 jours. J'ai reserve l'hotel sur internet. C'etait 8000 yens par nuit. On ira a Kyoto en shinkansen. Ca prend environ 2 heures. J'ai aussi hate de gouter la cuisine de Kyoto. Je veux surtout manger du yudofu. S'il fait beau, je voudrais aussi me promener a Arashiyama.",
            level: 'N4',
            questions: [
                { q: 'いつ京都(きょうと)に行(い)きますか？', choices: ['来週', '来月', '来年', '今月'], correct: '来月', explanation: '来月 = le mois prochain' },
                { q: '旅行(りょこう)は何日間(なんにちかん)ですか？', choices: ['一泊二日', '二泊三日', '三泊四日', '日帰り'], correct: '二泊三日', explanation: '二泊三日 = 2 nuits 3 jours' },
                { q: 'ホテルは一泊(いっぱく)いくらですか？', choices: ['五千円', '六千円', '八千円', '一万円'], correct: '八千円', explanation: '一泊八千円 = 8000 yens par nuit' },
                { q: '京都(きょうと)まで何(なに)で行(い)きますか？', choices: ['飛行機', 'バス', '電車', '新幹線'], correct: '新幹線', explanation: '新幹線で行きます = en shinkansen' },
                { q: '京都(きょうと)で何(なに)が食(た)べたいですか？', choices: ['寿司', 'ラーメン', '湯豆腐', '焼肉'], correct: '湯豆腐', explanation: '湯豆腐が食べたい = veut manger du yudofu' }
            ]
        },
        {
            id: 'n4_2',
            title: 'Part-time Job',
            titleJp: 'アルバイト',
            text: '私(わたし)は大学生(だいがくせい)で、カフェでアルバイトをしています。月曜日(げつようび)から金曜日(きんようび)まで大学(だいがく)に行(い)って、土曜日(どようび)と日曜日(にちようび)にカフェで働(はたら)いています。時給(じきゅう)は千円(せんえん)で、朝九時(くじ)から夕方(ゆうがた)五時(ごじ)まで働きます。店長(てんちょう)はとても優(やさ)しい人(ひと)で、わからないことがあれば、いつも教(おし)えてくれます。お客(きゃく)さんと話(はな)すのが楽(たの)しいです。このアルバイトのおかげで、敬語(けいご)も上手(じょうず)になりました。将来(しょうらい)、自分(じぶん)のカフェを開(ひら)きたいと思(おも)っています。',
            translation: "Je suis etudiant et je travaille a temps partiel dans un cafe. Du lundi au vendredi je vais a l'universite, et le samedi et dimanche je travaille au cafe. Le salaire horaire est de 1000 yens, et je travaille de 9h a 17h. Le gerant est une personne tres gentille, et quand je ne comprends pas quelque chose, il m'explique toujours. C'est amusant de parler avec les clients. Grace a ce travail, je suis devenu bon en langage poli. A l'avenir, je voudrais ouvrir mon propre cafe.",
            level: 'N4',
            questions: [
                { q: 'この人(ひと)はいつアルバイトをしますか？', choices: ['月曜と火曜', '水曜と木曜', '金曜と土曜', '土曜と日曜'], correct: '土曜と日曜', explanation: '土曜日と日曜日にカフェで働いています' },
                { q: '時給(じきゅう)はいくらですか？', choices: ['八百円', '九百円', '千円', '千二百円'], correct: '千円', explanation: '時給は千円 = 1000 yens de l\'heure' },
                { q: '店長(てんちょう)はどんな人(ひと)ですか？', choices: ['厳しい', '優しい', '面白い', '静か'], correct: '優しい', explanation: 'とても優しい人で = personne tres gentille' },
                { q: 'アルバイトで何(なに)が上手(じょうず)になりましたか？', choices: ['料理', '英語', '敬語', '日本語'], correct: '敬語', explanation: '敬語も上手になりました = devenu bon en langage poli' },
                { q: '将来(しょうらい)、何(なに)をしたいですか？', choices: ['先生になる', '会社を作る', 'カフェを開く', '外国に行く'], correct: 'カフェを開く', explanation: '自分のカフェを開きたい = ouvrir son propre cafe' }
            ]
        },
        {
            id: 'n4_3',
            title: 'Weather and Seasons',
            titleJp: '日本の季節',
            text: '日本(にほん)には四(よっ)つの季節(きせつ)があります。春(はる)は三月(さんがつ)から五月(ごがつ)までで、桜(さくら)がとてもきれいです。多(おお)くの人(ひと)がお花見(はなみ)をします。夏(なつ)は六月(ろくがつ)から八月(はちがつ)までで、とても暑(あつ)くて湿度(しつど)が高(たか)いです。夏には花火大会(はなびたいかい)があります。秋(あき)は九月(くがつ)から十一月(じゅういちがつ)までで、紅葉(こうよう)がきれいです。秋の食(た)べ物(もの)もおいしいです。冬(ふゆ)は十二月(じゅうにがつ)から二月(にがつ)までで、寒(さむ)いですが、雪(ゆき)がきれいです。北海道(ほっかいどう)では雪(ゆき)がたくさん降(ふ)ります。',
            translation: "Le Japon a 4 saisons. Le printemps va de mars a mai, et les cerisiers sont tres beaux. Beaucoup de gens font le hanami. L'ete va de juin a aout, il fait tres chaud et humide. En ete il y a des feux d'artifice. L'automne va de septembre a novembre, les feuilles d'automne sont belles. La nourriture d'automne est aussi delicieuse. L'hiver va de decembre a fevrier, il fait froid mais la neige est belle. A Hokkaido, il neige beaucoup.",
            level: 'N4',
            questions: [
                { q: '春(はる)はいつからいつまでですか？', choices: ['1月～3月', '3月～5月', '4月～6月', '2月～4月'], correct: '3月～5月', explanation: '三月から五月まで = de mars a mai' },
                { q: '春(はる)に何(なに)をしますか？', choices: ['花火を見る', 'お花見', '雪まつり', '紅葉を見る'], correct: 'お花見', explanation: 'お花見をします = faire le hanami' },
                { q: '夏(なつ)はどんな天気(てんき)ですか？', choices: ['寒い', '涼しい', '暑くて湿度が高い', '暖かい'], correct: '暑くて湿度が高い', explanation: '暑くて湿度が高い = chaud et humide' },
                { q: '秋(あき)に何(なに)がきれいですか？', choices: ['桜', '雪', '紅葉', '花火'], correct: '紅葉', explanation: '紅葉がきれい = les feuilles d\'automne sont belles' },
                { q: 'どこで雪(ゆき)がたくさん降(ふ)りますか？', choices: ['東京', '大阪', '京都', '北海道'], correct: '北海道', explanation: '北海道では雪がたくさん降ります = beaucoup de neige a Hokkaido' }
            ]
        }
    ],

    init() {
        this.render();
    },

    getFilteredTexts() {
        const level = LevelFilter.get();
        if (level === 'N5') return this.textsN5;
        if (level === 'N4') return this.textsN4;
        return [...this.textsN5, ...this.textsN4];
    },

    render() {
        const container = document.getElementById('reading-content');
        if (!container) return;

        if (this.quizState) {
            this.renderQuiz(container);
        } else if (this.currentTextIndex !== null) {
            this.renderText(container);
        } else {
            this.renderList(container);
        }
    },

    renderList(container) {
        const texts = this.getFilteredTexts();

        container.innerHTML = `
            <div class="reading-list">
                ${texts.map((t, i) => `
                    <div class="reading-card" data-index="${i}">
                        <div class="reading-card-header">
                            <span class="reading-card-title">${t.titleJp}</span>
                            <span class="kanji-level-tag ${t.level.toLowerCase()}">${t.level}</span>
                        </div>
                        <div class="reading-card-subtitle">${t.title}</div>
                        <div class="reading-card-meta">${t.questions.length} ${I18n.t('reading_questions')}</div>
                    </div>
                `).join('')}
            </div>`;

        container.querySelectorAll('.reading-card').forEach(card => {
            card.addEventListener('click', () => {
                this.currentTextIndex = parseInt(card.dataset.index);
                this.render();
            });
        });
    },

    renderText(container) {
        const texts = this.getFilteredTexts();
        const t = texts[this.currentTextIndex];

        container.innerHTML = `
            <div class="reading-back">
                <button class="btn btn-secondary" id="reading-back">&larr; ${I18n.t('back')}</button>
                <span class="kanji-level-tag ${t.level.toLowerCase()}" style="margin-left:12px;">${t.level}</span>
            </div>

            <div class="reading-passage">
                <h2 class="reading-title">${t.titleJp} <span class="reading-title-en">— ${t.title}</span></h2>
                <div class="reading-text-jp">${t.text.replace(/\n/g, '<br>')}</div>
                <details class="reading-translation">
                    <summary>${I18n.t('reading_show_translation')}</summary>
                    <div class="reading-text-fr">${t.translation}</div>
                </details>
            </div>

            <div style="text-align:center; margin-top:24px;">
                <button class="btn btn-primary btn-lg" id="reading-start-quiz">${I18n.t('reading_start_quiz')}</button>
            </div>`;

        document.getElementById('reading-back').addEventListener('click', () => {
            this.currentTextIndex = null;
            this.quizState = null;
            this.render();
        });

        document.getElementById('reading-start-quiz').addEventListener('click', () => {
            this.quizState = { questions: t.questions, current: 0, score: 0, answers: [], text: t };
            this.render();
        });
    },

    renderQuiz(container) {
        const qs = this.quizState;

        if (qs.current >= qs.questions.length) {
            this.renderResults(container);
            return;
        }

        const q = qs.questions[qs.current];
        const pct = (qs.current / qs.questions.length) * 100;

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-progress">
                    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
                    <span class="quiz-counter">${qs.current + 1}/${qs.questions.length}</span>
                </div>
                <div class="quiz-card">
                    <div class="quiz-prompt" style="font-size:20px;">${q.q}</div>
                </div>
                <div class="quiz-options">
                    ${q.choices.map(c => `
                        <button class="quiz-option" data-answer="${c}">${c}</button>
                    `).join('')}
                </div>
                <div class="quiz-feedback" id="reading-feedback"></div>
                <div class="quiz-actions">
                    <button class="btn btn-secondary" id="reading-next" style="display:none">${I18n.t('next')}</button>
                </div>
            </div>`;

        const feedback = document.getElementById('reading-feedback');
        const nextBtn = document.getElementById('reading-next');
        let answered = false;

        container.querySelectorAll('.quiz-option').forEach(opt => {
            opt.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                const correct = opt.dataset.answer === q.correct;
                qs.answers.push({ correct });
                if (correct) qs.score++;

                if (correct) {
                    opt.classList.add('correct');
                    feedback.className = 'quiz-feedback show correct-fb';
                    feedback.textContent = `${I18n.t('correct')} ${q.explanation}`;
                } else {
                    opt.classList.add('incorrect');
                    container.querySelector(`[data-answer="${q.correct}"]`)?.classList.add('correct');
                    feedback.className = 'quiz-feedback show incorrect-fb';
                    feedback.innerHTML = `${I18n.t('incorrect')} ${q.explanation}`;
                }

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
                ReadingModule.renderQuiz(container);
            }
        });
    },

    renderResults(container) {
        const qs = this.quizState;
        const pct = Math.round((qs.score / qs.questions.length) * 100);

        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-score">
                    <div class="quiz-score-value">${pct}%</div>
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} — ${qs.text.titleJp}</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                        <button class="btn btn-primary" id="reading-reread">${I18n.t('reading_reread')}</button>
                        <button class="btn btn-secondary" id="reading-back-list">${I18n.t('back')}</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('reading-reread')?.addEventListener('click', () => {
            this.quizState = null;
            this.render();
        });

        document.getElementById('reading-back-list')?.addEventListener('click', () => {
            this.currentTextIndex = null;
            this.quizState = null;
            this.render();
        });
    }
};
