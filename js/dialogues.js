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
