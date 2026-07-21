// ========================================
// Cultural Notes Module
// ========================================
window.CultureModule = {
    notes: [
        {id:'itadakimasu',titleFr:'いただきます',titleEn:'Itadakimasu',icon:'🍽️',
         contentFr:"Avant de manger, les Japonais disent いただきます (itadakimasu). C'est une expression de gratitude envers la nourriture, les agriculteurs et ceux qui l'ont preparee. Litteralement, cela signifie 'je recois humblement'.",
         contentEn:"Before eating, Japanese people say いただきます (itadakimasu). It's an expression of gratitude for the food, the farmers, and those who prepared it. Literally, it means 'I humbly receive'."},
        {id:'ojigi',titleFr:'L\'art du salut (お辞儀)',titleEn:'The art of bowing (Ojigi)',icon:'🙇',
         contentFr:"Au Japon, on salue en s'inclinant (お辞儀). Un leger hochement de tete suffit entre amis. Un salut a 30° est poli. Un salut a 45° exprime un profond respect ou des excuses. On ne se serre pas la main.",
         contentEn:"In Japan, people greet by bowing (ojigi). A slight nod is enough between friends. A 30° bow is polite. A 45° bow expresses deep respect or apology. People don't shake hands."},
        {id:'shoes',titleFr:'Enlever ses chaussures',titleEn:'Taking off shoes',icon:'👟',
         contentFr:"On enleve ses chaussures en entrant dans une maison, un temple, certains restaurants et meme certaines ecoles. On porte des chaussons d'interieur (スリッパ slippa) et des chaussons speciaux pour les toilettes.",
         contentEn:"You take off your shoes when entering a house, temple, some restaurants, and even some schools. Indoor slippers (スリッパ slippa) are worn inside, with special slippers for the toilet."},
        {id:'keigo',titleFr:'Le langage poli (敬語)',titleEn:'Polite language (Keigo)',icon:'🎩',
         contentFr:"Le japonais a plusieurs niveaux de politesse. です/ます est la forme polie standard. 敬語 (keigo) inclut le langage honorifique (尊敬語) pour elever l'autre, et le langage humble (謙譲語) pour s'abaisser soi-meme.",
         contentEn:"Japanese has multiple politeness levels. です/ます is the standard polite form. 敬語 (keigo) includes honorific language (尊敬語) to elevate others, and humble language (謙譲語) to lower oneself."},
        {id:'seasons',titleFr:'L\'importance des saisons',titleEn:'The importance of seasons',icon:'🌸',
         contentFr:"Les Japonais accordent une grande importance aux saisons. Chaque saison a ses traditions : 花見 (hanami) au printemps, 花火 (hanabi) en ete, 紅葉 (kouyou) en automne, et お正月 (oshougatsu) en hiver.",
         contentEn:"Japanese people place great importance on seasons. Each season has traditions: 花見 (hanami) in spring, 花火 (hanabi) in summer, 紅葉 (kouyou) in autumn, and お正月 (oshougatsu) in winter."},
        {id:'meishi',titleFr:'L\'echange de cartes de visite',titleEn:'Business card exchange',icon:'💼',
         contentFr:"L'echange de 名刺 (meishi) est un rituel important. On presente sa carte a deux mains, face lisible vers l'autre. On recoit la carte de l'autre a deux mains aussi, et on la lit attentivement.",
         contentEn:"The exchange of 名刺 (meishi) is an important ritual. You present your card with both hands, readable side facing the other person. You receive their card with both hands too, and read it carefully."},
        {id:'onsen',titleFr:'Les sources chaudes (温泉)',titleEn:'Hot springs (Onsen)',icon:'♨️',
         contentFr:"Les 温泉 (onsen) sont tres populaires. Regles : se laver completement avant d'entrer dans le bain, ne pas mettre de serviette dans l'eau, les tatouages sont souvent interdits.",
         contentEn:"温泉 (onsen) are very popular. Rules: wash completely before entering the bath, don't put towels in the water, tattoos are often prohibited."},
        {id:'numbers',titleFr:'Les nombres porte-malheur',titleEn:'Unlucky numbers',icon:'🔢',
         contentFr:"Le 4 (四 shi) est un nombre porte-malheur car il se prononce comme 死 (shi, mort). Le 9 (九 ku) aussi, car similaire a 苦 (ku, souffrance). Les hotels sautent souvent la chambre 4 et l'etage 4.",
         contentEn:"4 (四 shi) is an unlucky number because it sounds like 死 (shi, death). 9 (九 ku) too, similar to 苦 (ku, suffering). Hotels often skip room 4 and the 4th floor."},
    ],

    render() {
        const container = document.getElementById('culture-content');
        if (!container) return;
        container.innerHTML = `
            <div class="culture-grid">
                ${this.notes.map(n => `
                    <div class="culture-card" data-id="${n.id}">
                        <div class="culture-icon">${n.icon}</div>
                        <div class="culture-title">${I18n.locale === 'en' ? n.titleEn : n.titleFr}</div>
                    </div>
                `).join('')}
            </div>`;

        container.querySelectorAll('.culture-card').forEach(card => {
            card.addEventListener('click', () => {
                const n = this.notes.find(x => x.id === card.dataset.id);
                if (n) App.showModal(`
                    <div style="text-align:center; font-size:48px; margin-bottom:16px;">${n.icon}</div>
                    <h2 style="margin-bottom:16px;">${I18n.locale === 'en' ? n.titleEn : n.titleFr}</h2>
                    <p style="line-height:1.8; color:var(--text-secondary);">${I18n.locale === 'en' ? n.contentEn : n.contentFr}</p>
                `);
            });
        });
    }
};
