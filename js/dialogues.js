// ========================================
// Dialogues / Conversation Module
// ========================================
window.DialoguesModule = {
    scenarios: [
        {
            id:'restaurant', titleFr:'Au restaurant', titleEn:'At the restaurant', icon:'🍽️', level:'N5',
            lines: [
                {speaker:'staff',jp:'いらっしゃいませ！何名様(なんめいさま)ですか？',frFr:'Bienvenue ! Combien de personnes ?',frEn:'Welcome! How many people?'},
                {speaker:'you',choices:[
                    {jp:'二人(ふたり)です。',frFr:'Deux personnes.',frEn:'Two people.',correct:true},
                    {jp:'ありがとう。',frFr:'Merci.',frEn:'Thank you.',correct:false},
                    {jp:'すみません。',frFr:'Excusez-moi.',frEn:'Excuse me.',correct:false}
                ]},
                {speaker:'staff',jp:'こちらへどうぞ。メニューです。',frFr:'Par ici s\'il vous plait. Voici le menu.',frEn:'This way please. Here is the menu.'},
                {speaker:'staff',jp:'ご注文(ちゅうもん)はお決(き)まりですか？',frFr:'Avez-vous choisi ?',frEn:'Have you decided?'},
                {speaker:'you',choices:[
                    {jp:'ラーメンをお願(ねが)いします。',frFr:'Du ramen s\'il vous plait.',frEn:'Ramen please.',correct:true},
                    {jp:'分(わ)かりません。',frFr:'Je ne sais pas.',frEn:'I don\'t know.',correct:false},
                    {jp:'はい、元気(げんき)です。',frFr:'Oui, je vais bien.',frEn:'Yes, I\'m fine.',correct:false}
                ]},
                {speaker:'staff',jp:'お飲(の)み物(もの)はいかがですか？',frFr:'Voulez-vous une boisson ?',frEn:'Would you like a drink?'},
                {speaker:'you',choices:[
                    {jp:'お水(みず)をください。',frFr:'De l\'eau s\'il vous plait.',frEn:'Water please.',correct:true},
                    {jp:'おいしいです。',frFr:'C\'est delicieux.',frEn:'It\'s delicious.',correct:false}
                ]},
                {speaker:'staff',jp:'かしこまりました。少々(しょうしょう)お待(ま)ちください。',frFr:'Bien compris. Veuillez patienter.',frEn:'Understood. Please wait a moment.'}
            ]
        },
        {
            id:'station', titleFr:'A la gare', titleEn:'At the station', icon:'🚃', level:'N5',
            lines: [
                {speaker:'you_init',jp:'すみません。東京駅(とうきょうえき)はどこですか？',frFr:'Excusez-moi. Ou est la gare de Tokyo ?',frEn:'Excuse me. Where is Tokyo station?'},
                {speaker:'other',jp:'この道(みち)をまっすぐ行(い)ってください。',frFr:'Allez tout droit sur cette route.',frEn:'Go straight down this road.'},
                {speaker:'you',choices:[
                    {jp:'ありがとうございます。',frFr:'Merci beaucoup.',frEn:'Thank you very much.',correct:true},
                    {jp:'さようなら。',frFr:'Au revoir.',frEn:'Goodbye.',correct:false}
                ]},
                {speaker:'other',jp:'電車(でんしゃ)は三番線(さんばんせん)です。',frFr:'Le train est sur la voie 3.',frEn:'The train is on platform 3.'},
                {speaker:'you',choices:[
                    {jp:'切符(きっぷ)はどこで買(か)えますか？',frFr:'Ou puis-je acheter un billet ?',frEn:'Where can I buy a ticket?',correct:true},
                    {jp:'おはようございます。',frFr:'Bonjour.',frEn:'Good morning.',correct:false}
                ]},
                {speaker:'other',jp:'あそこの自動販売機(じどうはんばいき)で買えますよ。',frFr:'Vous pouvez l\'acheter a la machine la-bas.',frEn:'You can buy it at the machine over there.'}
            ]
        },
        {
            id:'doctor', titleFr:'Chez le medecin', titleEn:'At the doctor', icon:'🏥', level:'N4',
            lines: [
                {speaker:'doctor',jp:'今日(きょう)はどうしましたか？',frFr:'Qu\'est-ce qui ne va pas aujourd\'hui ?',frEn:'What brings you here today?'},
                {speaker:'you',choices:[
                    {jp:'頭(あたま)が痛(いた)いです。',frFr:'J\'ai mal a la tete.',frEn:'I have a headache.',correct:true},
                    {jp:'元気(げんき)です。',frFr:'Je vais bien.',frEn:'I\'m fine.',correct:false}
                ]},
                {speaker:'doctor',jp:'いつからですか？',frFr:'Depuis quand ?',frEn:'Since when?'},
                {speaker:'you',choices:[
                    {jp:'昨日(きのう)からです。',frFr:'Depuis hier.',frEn:'Since yesterday.',correct:true},
                    {jp:'毎日(まいにち)です。',frFr:'Tous les jours.',frEn:'Every day.',correct:false}
                ]},
                {speaker:'doctor',jp:'熱(ねつ)はありますか？',frFr:'Avez-vous de la fievre ?',frEn:'Do you have a fever?'},
                {speaker:'you',choices:[
                    {jp:'はい、少(すこ)しあります。',frFr:'Oui, un peu.',frEn:'Yes, a little.',correct:true},
                    {jp:'いいえ、ありません。',frFr:'Non.',frEn:'No.',correct:true}
                ]},
                {speaker:'doctor',jp:'この薬(くすり)を飲(の)んでください。お大事(だいじ)に。',frFr:'Prenez ce medicament. Prenez soin de vous.',frEn:'Take this medicine. Take care.'}
            ]
        },
        {
            id:'shopping', titleFr:'Au magasin', titleEn:'At the shop', icon:'🛍️', level:'N5',
            lines: [
                {speaker:'staff',jp:'いらっしゃいませ！何(なに)かお探(さが)しですか？',frFr:'Bienvenue ! Cherchez-vous quelque chose ?',frEn:'Welcome! Are you looking for something?'},
                {speaker:'you',choices:[
                    {jp:'Tシャツを探(さが)しています。',frFr:'Je cherche un T-shirt.',frEn:'I\'m looking for a T-shirt.',correct:true},
                    {jp:'おいしいです。',frFr:'C\'est delicieux.',frEn:'It\'s delicious.',correct:false}
                ]},
                {speaker:'staff',jp:'サイズはいくつですか？',frFr:'Quelle taille ?',frEn:'What size?'},
                {speaker:'you',choices:[
                    {jp:'Mサイズをお願(ねが)いします。',frFr:'Du M s\'il vous plait.',frEn:'Medium please.',correct:true},
                    {jp:'三つください。',frFr:'Trois s\'il vous plait.',frEn:'Three please.',correct:false}
                ]},
                {speaker:'staff',jp:'こちらはいかがですか？二千円(にせんえん)です。',frFr:'Que pensez-vous de celui-ci ? C\'est 2000 yens.',frEn:'How about this one? It\'s 2000 yen.'},
                {speaker:'you',choices:[
                    {jp:'これをください。',frFr:'Je prends celui-ci.',frEn:'I\'ll take this one.',correct:true},
                    {jp:'もう少(すこ)し安(やす)いのはありますか？',frFr:'En avez-vous un moins cher ?',frEn:'Do you have a cheaper one?',correct:true}
                ]}
            ]
        },
        {
            id:'hotel', titleFr:'A l\'hotel', titleEn:'At the hotel', icon:'🏨', level:'N5',
            lines: [
                {speaker:'staff',jp:'いらっしゃいませ。ご予約(よやく)はございますか？',frFr:'Bienvenue. Avez-vous une reservation ?',frEn:'Welcome. Do you have a reservation?'},
                {speaker:'you',choices:[
                    {jp:'はい、田中(たなか)です。',frFr:'Oui, au nom de Tanaka.',frEn:'Yes, under Tanaka.',correct:true},
                    {jp:'いいえ、ありません。',frFr:'Non.',frEn:'No, I don\'t.',correct:false}
                ]},
                {speaker:'staff',jp:'二泊(にはく)ですね。お部屋(へや)は三階(さんがい)です。',frFr:'Deux nuits, n\'est-ce pas. La chambre est au 3e etage.',frEn:'Two nights, right. Your room is on the 3rd floor.'},
                {speaker:'you',choices:[
                    {jp:'朝(あさ)ご飯(はん)は何時(なんじ)からですか？',frFr:'A quelle heure est le petit-dejeuner ?',frEn:'What time is breakfast?',correct:true},
                    {jp:'ありがとう。',frFr:'Merci.',frEn:'Thank you.',correct:false}
                ]},
                {speaker:'staff',jp:'七時(しちじ)から九時(くじ)までです。一階(いっかい)のレストランです。',frFr:'De 7h a 9h. Au restaurant du 1er etage.',frEn:'From 7 to 9. At the 1st floor restaurant.'},
                {speaker:'you',choices:[
                    {jp:'Wi-Fiのパスワードを教(おし)えてください。',frFr:'Pouvez-vous me donner le mot de passe Wi-Fi ?',frEn:'Could you tell me the Wi-Fi password?',correct:true},
                    {jp:'さようなら。',frFr:'Au revoir.',frEn:'Goodbye.',correct:false}
                ]},
                {speaker:'staff',jp:'こちらのカードに書(か)いてあります。ごゆっくりどうぞ。',frFr:'C\'est ecrit sur cette carte. Bon sejour.',frEn:'It\'s written on this card. Enjoy your stay.'}
            ]
        },
        {
            id:'post_office', titleFr:'A la poste', titleEn:'At the post office', icon:'📮', level:'N5',
            lines: [
                {speaker:'you_init',jp:'すみません。この手紙(てがみ)をフランスに送(おく)りたいです。',frFr:'Excusez-moi. Je voudrais envoyer cette lettre en France.',frEn:'Excuse me. I\'d like to send this letter to France.'},
                {speaker:'staff',jp:'航空便(こうくうびん)ですか？船便(ふなびん)ですか？',frFr:'Par avion ou par bateau ?',frEn:'By air or by sea?'},
                {speaker:'you',choices:[
                    {jp:'航空便(こうくうびん)でお願(ねが)いします。',frFr:'Par avion s\'il vous plait.',frEn:'By air please.',correct:true},
                    {jp:'分(わ)かりません。',frFr:'Je ne sais pas.',frEn:'I don\'t know.',correct:false}
                ]},
                {speaker:'staff',jp:'百二十円(ひゃくにじゅうえん)です。切手(きって)はこちらです。',frFr:'C\'est 120 yens. Voici le timbre.',frEn:'It\'s 120 yen. Here\'s the stamp.'},
                {speaker:'you',choices:[
                    {jp:'何日(なんにち)ぐらいかかりますか？',frFr:'Combien de jours ca prend ?',frEn:'About how many days will it take?',correct:true},
                    {jp:'高(たか)いですね。',frFr:'C\'est cher.',frEn:'That\'s expensive.',correct:false}
                ]},
                {speaker:'staff',jp:'一週間(いっしゅうかん)ぐらいです。',frFr:'Environ une semaine.',frEn:'About one week.'}
            ]
        },
        {
            id:'school', titleFr:'A l\'ecole', titleEn:'At school', icon:'🏫', level:'N5',
            lines: [
                {speaker:'other',jp:'おはようございます！今日(きょう)の授業(じゅぎょう)は何(なん)ですか？',frFr:'Bonjour ! Quel est le cours aujourd\'hui ?',frEn:'Good morning! What class is today?'},
                {speaker:'you',choices:[
                    {jp:'日本語(にほんご)と数学(すうがく)です。',frFr:'Japonais et mathematiques.',frEn:'Japanese and math.',correct:true},
                    {jp:'分(わ)かりません。',frFr:'Je ne sais pas.',frEn:'I don\'t know.',correct:false}
                ]},
                {speaker:'other',jp:'宿題(しゅくだい)はしましたか？',frFr:'Tu as fait les devoirs ?',frEn:'Did you do the homework?'},
                {speaker:'you',choices:[
                    {jp:'はい、全部(ぜんぶ)しました。',frFr:'Oui, j\'ai tout fait.',frEn:'Yes, I did everything.',correct:true},
                    {jp:'いいえ、忘(わす)れました。',frFr:'Non, j\'ai oublie.',frEn:'No, I forgot.',correct:true}
                ]},
                {speaker:'other',jp:'先生(せんせい)に質問(しつもん)がありますか？',frFr:'Tu as une question pour le professeur ?',frEn:'Do you have a question for the teacher?'},
                {speaker:'you',choices:[
                    {jp:'はい。この漢字(かんじ)の読(よ)み方(かた)を教(おし)えてください。',frFr:'Oui. Pouvez-vous me dire comment lire ce kanji ?',frEn:'Yes. Could you tell me how to read this kanji?',correct:true},
                    {jp:'いいえ、大丈夫(だいじょうぶ)です。',frFr:'Non, ca va.',frEn:'No, I\'m fine.',correct:true}
                ]}
            ]
        },
        {
            id:'bank', titleFr:'A la banque', titleEn:'At the bank', icon:'🏦', level:'N4',
            lines: [
                {speaker:'you_init',jp:'すみません。口座(こうざ)を開(ひら)きたいのですが。',frFr:'Excusez-moi. Je voudrais ouvrir un compte.',frEn:'Excuse me. I\'d like to open an account.'},
                {speaker:'staff',jp:'パスポートをお持(も)ちですか？',frFr:'Avez-vous votre passeport ?',frEn:'Do you have your passport?'},
                {speaker:'you',choices:[
                    {jp:'はい、ここにあります。',frFr:'Oui, le voici.',frEn:'Yes, here it is.',correct:true},
                    {jp:'いいえ、家(いえ)にあります。',frFr:'Non, il est a la maison.',frEn:'No, it\'s at home.',correct:false}
                ]},
                {speaker:'staff',jp:'この書類(しょるい)に名前(なまえ)と住所(じゅうしょ)を書(か)いてください。',frFr:'Veuillez ecrire votre nom et adresse sur ce formulaire.',frEn:'Please write your name and address on this form.'},
                {speaker:'you',choices:[
                    {jp:'カタカナで書(か)いてもいいですか？',frFr:'Puis-je ecrire en katakana ?',frEn:'May I write in katakana?',correct:true},
                    {jp:'日本語(にほんご)が分(わ)かりません。',frFr:'Je ne comprends pas le japonais.',frEn:'I don\'t understand Japanese.',correct:false}
                ]},
                {speaker:'staff',jp:'はい、大丈夫(だいじょうぶ)です。キャッシュカードは一週間(いっしゅうかん)で届(とど)きます。',frFr:'Oui, c\'est bon. La carte bancaire arrivera dans une semaine.',frEn:'Yes, that\'s fine. Your bank card will arrive in one week.'}
            ]
        },
        {
            id:'phone', titleFr:'Au telephone', titleEn:'On the phone', icon:'📞', level:'N4',
            lines: [
                {speaker:'other',jp:'もしもし、田中(たなか)ですが。',frFr:'Allo, c\'est Tanaka.',frEn:'Hello, this is Tanaka.'},
                {speaker:'you',choices:[
                    {jp:'ああ、田中さん。お元気(げんき)ですか？',frFr:'Ah, Tanaka. Comment allez-vous ?',frEn:'Ah, Tanaka. How are you?',correct:true},
                    {jp:'誰(だれ)ですか？',frFr:'Qui est-ce ?',frEn:'Who is this?',correct:false}
                ]},
                {speaker:'other',jp:'元気(げんき)ですよ。明日(あした)の約束(やくそく)の件(けん)ですが。',frFr:'Je vais bien. C\'est a propos du rendez-vous de demain.',frEn:'I\'m fine. It\'s about tomorrow\'s appointment.'},
                {speaker:'you',choices:[
                    {jp:'はい、何時(なんじ)に会(あ)いましょうか？',frFr:'Oui, a quelle heure on se retrouve ?',frEn:'Yes, what time shall we meet?',correct:true},
                    {jp:'明日(あした)は忙(いそが)しいです。',frFr:'Demain je suis occupe.',frEn:'I\'m busy tomorrow.',correct:false}
                ]},
                {speaker:'other',jp:'二時(にじ)に駅(えき)の前(まえ)はどうですか？',frFr:'A 14h devant la gare, ca va ?',frEn:'How about 2pm in front of the station?'},
                {speaker:'you',choices:[
                    {jp:'いいですよ。では、また明日(あした)。',frFr:'D\'accord. A demain alors.',frEn:'Sounds good. See you tomorrow then.',correct:true},
                    {jp:'ちょっと遠(とお)いですね。',frFr:'C\'est un peu loin.',frEn:'That\'s a bit far.',correct:false}
                ]}
            ]
        },
        {
            id:'lost', titleFr:'Perdu dans la rue', titleEn:'Lost in the street', icon:'🗺️', level:'N5',
            lines: [
                {speaker:'you_init',jp:'すみません。道(みち)に迷(まよ)ってしまいました。',frFr:'Excusez-moi. Je me suis perdu.',frEn:'Excuse me. I\'m lost.'},
                {speaker:'other',jp:'どこに行(い)きたいですか？',frFr:'Ou voulez-vous aller ?',frEn:'Where do you want to go?'},
                {speaker:'you',choices:[
                    {jp:'この住所(じゅうしょ)に行(い)きたいです。',frFr:'Je veux aller a cette adresse.',frEn:'I want to go to this address.',correct:true},
                    {jp:'どこでもいいです。',frFr:'N\'importe ou.',frEn:'Anywhere is fine.',correct:false}
                ]},
                {speaker:'other',jp:'ああ、近(ちか)いですよ。この道(みち)をまっすぐ行(い)って、二(ふた)つ目(め)の信号(しんごう)を右(みぎ)に曲(ま)がってください。',frFr:'Ah, c\'est pres d\'ici. Allez tout droit, puis tournez a droite au 2e feu.',frEn:'Ah, it\'s nearby. Go straight and turn right at the 2nd traffic light.'},
                {speaker:'you',choices:[
                    {jp:'歩(ある)いて何分(なんぷん)ぐらいですか？',frFr:'C\'est a combien de minutes a pied ?',frEn:'About how many minutes on foot?',correct:true},
                    {jp:'ありがとうございます。',frFr:'Merci beaucoup.',frEn:'Thank you very much.',correct:true}
                ]},
                {speaker:'other',jp:'五分(ごふん)ぐらいです。気(き)をつけて！',frFr:'Environ 5 minutes. Faites attention !',frEn:'About 5 minutes. Be careful!'}
            ]
        },
        {
            id:'weather', titleFr:'Parler de la meteo', titleEn:'Talking about weather', icon:'🌤️', level:'N5',
            lines: [
                {speaker:'other',jp:'今日(きょう)はいい天気(てんき)ですね。',frFr:'Il fait beau aujourd\'hui.',frEn:'Nice weather today, isn\'t it?'},
                {speaker:'you',choices:[
                    {jp:'そうですね。散歩(さんぽ)に行(い)きませんか？',frFr:'Oui. On va se promener ?',frEn:'Yes. Shall we go for a walk?',correct:true},
                    {jp:'いいえ、雨(あめ)です。',frFr:'Non, il pleut.',frEn:'No, it\'s raining.',correct:false}
                ]},
                {speaker:'other',jp:'いいですね！でも、午後(ごご)から雨(あめ)が降(ふ)るらしいですよ。',frFr:'Bonne idee ! Mais il parait qu\'il va pleuvoir cet apres-midi.',frEn:'Good idea! But it seems it will rain this afternoon.'},
                {speaker:'you',choices:[
                    {jp:'じゃあ、傘(かさ)を持(も)って行(い)きましょう。',frFr:'Alors, prenons un parapluie.',frEn:'Then let\'s bring an umbrella.',correct:true},
                    {jp:'雨(あめ)は好(す)きです。',frFr:'J\'aime la pluie.',frEn:'I like rain.',correct:false}
                ]},
                {speaker:'other',jp:'明日(あした)は晴(は)れるそうです。ピクニックはどうですか？',frFr:'Il parait qu\'il fera beau demain. Un pique-nique, ca vous dit ?',frEn:'I heard it will be sunny tomorrow. How about a picnic?'},
                {speaker:'you',choices:[
                    {jp:'いいですね！お弁当(べんとう)を作(つく)りましょう。',frFr:'Bonne idee ! Preparons des bentos.',frEn:'Sounds great! Let\'s make bentos.',correct:true},
                    {jp:'明日(あした)は忙(いそが)しいです。',frFr:'Demain je suis occupe.',frEn:'I\'m busy tomorrow.',correct:false}
                ]}
            ]
        },
        {
            id:'introduce', titleFr:'Se presenter', titleEn:'Introducing yourself', icon:'🙋', level:'N5',
            lines: [
                {speaker:'other',jp:'はじめまして。私(わたし)は佐藤(さとう)です。よろしくお願(ねが)いします。',frFr:'Enchante. Je suis Sato. Ravi de vous connaitre.',frEn:'Nice to meet you. I\'m Sato. Pleased to meet you.'},
                {speaker:'you',choices:[
                    {jp:'はじめまして。私(わたし)はマリーです。フランスから来(き)ました。',frFr:'Enchantee. Je suis Marie. Je viens de France.',frEn:'Nice to meet you. I\'m Marie. I\'m from France.',correct:true},
                    {jp:'さようなら。',frFr:'Au revoir.',frEn:'Goodbye.',correct:false}
                ]},
                {speaker:'other',jp:'フランスですか！日本語(にほんご)がお上手(じょうず)ですね。',frFr:'La France ! Vous parlez bien japonais.',frEn:'France! Your Japanese is good.'},
                {speaker:'you',choices:[
                    {jp:'いいえ、まだまだです。毎日(まいにち)勉強(べんきょう)しています。',frFr:'Non, pas encore. J\'etudie tous les jours.',frEn:'No, not yet. I study every day.',correct:true},
                    {jp:'はい、ペラペラです。',frFr:'Oui, je suis fluent.',frEn:'Yes, I\'m fluent.',correct:false}
                ]},
                {speaker:'other',jp:'お仕事(しごと)は何(なん)ですか？',frFr:'Quel est votre travail ?',frEn:'What\'s your job?'},
                {speaker:'you',choices:[
                    {jp:'学生(がくせい)です。大学(だいがく)で日本語(にほんご)を勉強(べんきょう)しています。',frFr:'Je suis etudiant. J\'etudie le japonais a l\'universite.',frEn:'I\'m a student. I study Japanese at university.',correct:true},
                    {jp:'エンジニアです。東京(とうきょう)で働(はたら)いています。',frFr:'Je suis ingenieur. Je travaille a Tokyo.',frEn:'I\'m an engineer. I work in Tokyo.',correct:true}
                ]},
                {speaker:'other',jp:'そうですか。これからもよろしくお願(ねが)いします！',frFr:'Je vois. Au plaisir de continuer a vous connaitre !',frEn:'I see. Looking forward to getting to know you!'}
            ]
        }
    ],

    init() {},

    render() {
        const container = document.getElementById('dialogues-content');
        if (!container) return;
        this.renderList(container);
    },

    renderList(container) {
        const level = LevelFilter.get();
        const scenarios = this.scenarios.filter(s => level === 'all' || s.level === level || level === 'N4');
        container.innerHTML = `
            <div class="reading-list">
                ${scenarios.map(s => `
                    <div class="reading-card" data-id="${s.id}">
                        <div class="reading-card-header">
                            <span style="font-size:32px;">${s.icon}</span>
                            <span class="kanji-level-tag ${s.level.toLowerCase()}">${s.level}</span>
                        </div>
                        <div class="reading-card-subtitle">${I18n.locale === 'en' ? s.titleEn : s.titleFr}</div>
                    </div>
                `).join('')}
            </div>`;

        container.querySelectorAll('.reading-card').forEach(card => {
            card.addEventListener('click', () => {
                const s = this.scenarios.find(x => x.id === card.dataset.id);
                if (s) this.playDialogue(container, s);
            });
        });
    },

    playDialogue(container, scenario) {
        let lineIdx = 0, score = 0, total = 0;

        const renderLine = () => {
            if (lineIdx >= scenario.lines.length) {
                container.innerHTML = `<div class="quiz-container" style="text-align:center;">
                    <div style="font-size:48px; margin-bottom:16px;">🎉</div>
                    <h2>${I18n.t('correct')} ${score}/${total}</h2>
                    <button class="btn btn-primary" id="dial-back" style="margin-top:16px;">${I18n.t('back')}</button>
                </div>`;
                document.getElementById('dial-back')?.addEventListener('click', () => this.render());
                return;
            }

            const line = scenario.lines[lineIdx];
            let html = '<div class="dialogue-container">';
            html += `<div class="dialogue-header">${scenario.icon} ${I18n.locale === 'en' ? scenario.titleEn : scenario.titleFr}</div>`;

            // Show all previous lines
            for (let i = 0; i < lineIdx; i++) {
                const prev = scenario.lines[i];
                if (prev.choices) continue;
                const isYou = prev.speaker === 'you_init';
                html += `<div class="dialogue-bubble ${isYou ? 'you' : 'other'}">
                    <div class="dialogue-jp">${prev.jp}</div>
                    <div class="dialogue-translation">${L(prev,'fr')}</div>
                </div>`;
            }

            if (line.choices) {
                // User choice
                total++;
                html += `<div class="dialogue-choices">${line.choices.map((c,i) => `
                    <button class="dialogue-choice" data-idx="${i}">
                        <div>${c.jp}</div>
                        <div class="dialogue-translation">${L(c,'fr')}</div>
                    </button>`).join('')}
                </div>`;
            } else {
                const isYou = line.speaker === 'you_init';
                html += `<div class="dialogue-bubble ${isYou ? 'you' : 'other'}">
                    <div class="dialogue-jp">${line.jp}</div>
                    <div class="dialogue-translation">${L(line,'fr')}</div>
                </div>`;
                html += `<button class="btn btn-primary" id="dial-next" style="margin-top:16px;">${I18n.t('next')}</button>`;
            }

            html += '</div>';
            container.innerHTML = html;

            if (line.choices) {
                container.querySelectorAll('.dialogue-choice').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const choice = line.choices[parseInt(btn.dataset.idx)];
                        if (choice.correct) score++;
                        // Insert the chosen line as a visible bubble
                        scenario.lines.splice(lineIdx, 1, {speaker:'you_init',jp:choice.jp,frFr:choice.frFr,frEn:choice.frEn});
                        lineIdx++;
                        renderLine();
                    });
                });
            }

            document.getElementById('dial-next')?.addEventListener('click', () => { lineIdx++; renderLine(); });

            // Auto-speak
            if (!line.choices && 'speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(line.jp.replace(/<[^>]*>/g,'').replace(/\([^)]*\)/g,''));
                u.lang = 'ja-JP'; u.rate = 0.8;
                setTimeout(() => speechSynthesis.speak(u), 300);
            }
        };
        renderLine();
    }
};
