// ========================================
// Reading Comprehension Module
// with Template-based Text Generator
// ========================================

window.ReadingModule = {
    currentText: null,
    quizState: null,

    // =============================================
    // STATIC TEXTS (pre-written, high quality)
    // =============================================
    textsN5: [
        {
            id: 'n5_1', title: 'My Daily Life', titleJp: '\u79C1\u306E\u4E00\u65E5', level: 'N5',
            text: '\u79C1\u306F\u305F\u306A\u304B\u3086\u304D\u3067\u3059\u3002\u6BCE\u671D(\u307E\u3044\u3042\u3055)\u516D\u6642\u534A(\u308D\u304F\u3058\u306F\u3093)\u306B\u8D77(\u304A)\u304D\u307E\u3059\u3002\u4E03\u6642(\u3057\u3061\u3058)\u306B\u671D(\u3042\u3055)\u3054\u98EF(\u306F\u3093)\u3092\u98DF(\u305F)\u3079\u307E\u3059\u3002\u671D\u3054\u98EF\u306F\u30D1\u30F3\u3068\u5375(\u305F\u307E\u3054)\u3068\u30B3\u30FC\u30D2\u30FC\u3067\u3059\u3002\u516B\u6642(\u306F\u3061\u3058)\u306B\u5BB6(\u3044\u3048)\u3092\u51FA(\u3067)\u3066\u3001\u96FB\u8ECA(\u3067\u3093\u3057\u3083)\u3067\u5B66\u6821(\u304C\u3063\u3053\u3046)\u306B\u884C(\u3044)\u304D\u307E\u3059\u3002\u5B66\u6821\u306F\u4E5D\u6642(\u304F\u3058)\u304B\u3089\u4E09\u6642(\u3055\u3093\u3058)\u307E\u3067\u3067\u3059\u3002\u5B66\u6821\u306E\u5F8C(\u3042\u3068)\u3001\u56F3\u66F8\u9928(\u3068\u3057\u3087\u304B\u3093)\u3067\u65E5\u672C\u8A9E(\u306B\u307B\u3093\u3054)\u3092\u52C9\u5F37(\u3079\u3093\u304D\u3087\u3046)\u3057\u307E\u3059\u3002\u516D\u6642(\u308D\u304F\u3058)\u306B\u5BB6\u306B\u5E30(\u304B\u3048)\u308A\u307E\u3059\u3002\u6669(\u3070\u3093)\u3054\u98EF(\u306F\u3093)\u306E\u5F8C\u3001\u30C6\u30EC\u30D3\u3092\u898B(\u307F)\u305F\u308A\u3001\u672C(\u307B\u3093)\u3092\u8AAD(\u3088)\u3093\u3060\u308A\u3057\u307E\u3059\u3002\u5341\u4E00\u6642(\u3058\u3085\u3046\u3044\u3061\u3058)\u306B\u5BDD(\u306D)\u307E\u3059\u3002',
            translation: "Je suis Tanaka Yuki. Chaque matin, je me leve a 6h30. Je mange le petit-dejeuner a 7h. C'est du pain, des oeufs et du cafe. Je quitte la maison a 8h et vais a l'ecole en train. L'ecole est de 9h a 15h. Apres l'ecole, j'etudie le japonais a la bibliotheque. Je rentre a la maison a 18h. Apres le diner, je regarde la tele ou lis des livres. Je me couche a 23h.",
            questions: [
                { q: '\u305F\u306A\u304B\u3055\u3093\u306F\u4F55\u6642(\u306A\u3093\u3058)\u306B\u8D77(\u304A)\u304D\u307E\u3059\u304B\uFF1F', choices: ['\u516D\u6642', '\u516D\u6642\u534A', '\u4E03\u6642', '\u4E03\u6642\u534A'], correct: '\u516D\u6642\u534A', explanation: '\u516D\u6642\u534A\u306B\u8D77\u304D\u307E\u3059 = se lever a 6h30' },
                { q: '\u671D\u3054\u98EF\u306B\u4F55\u3092\u98DF\u3079\u307E\u3059\u304B\uFF1F', choices: ['\u3054\u98EF\u3068\u9B5A', '\u30D1\u30F3\u3068\u5375\u3068\u30B3\u30FC\u30D2\u30FC', '\u304A\u306B\u304E\u308A\u3068\u304A\u8336', '\u30D1\u30F3\u3068\u725B\u4E73'], correct: '\u30D1\u30F3\u3068\u5375\u3068\u30B3\u30FC\u30D2\u30FC', explanation: '\u30D1\u30F3\u3068\u5375\u3068\u30B3\u30FC\u30D2\u30FC\u3067\u3059 = pain, oeufs et cafe' },
                { q: '\u5B66\u6821\u306B\u4F55\u3067\u884C\u304D\u307E\u3059\u304B\uFF1F', choices: ['\u30D0\u30B9', '\u81EA\u8EE2\u8ECA', '\u96FB\u8ECA', '\u6B69\u3044\u3066'], correct: '\u96FB\u8ECA', explanation: '\u96FB\u8ECA\u3067\u5B66\u6821\u306B\u884C\u304D\u307E\u3059 = aller en train' },
                { q: '\u5B66\u6821\u306E\u5F8C\u3001\u3069\u3053\u3067\u52C9\u5F37\u3057\u307E\u3059\u304B\uFF1F', choices: ['\u5BB6', '\u30AB\u30D5\u30A7', '\u56F3\u66F8\u9928', '\u5B66\u6821'], correct: '\u56F3\u66F8\u9928', explanation: '\u56F3\u66F8\u9928\u3067\u52C9\u5F37\u3057\u307E\u3059 = etudier a la bibliotheque' },
                { q: '\u4F55\u6642\u306B\u5BDD\u307E\u3059\u304B\uFF1F', choices: ['\u5341\u6642', '\u5341\u4E00\u6642', '\u5341\u4E8C\u6642', '\u4E5D\u6642'], correct: '\u5341\u4E00\u6642', explanation: '\u5341\u4E00\u6642\u306B\u5BDD\u307E\u3059 = se coucher a 23h' }
            ]
        },
        {
            id: 'n5_2', title: 'At the Restaurant', titleJp: '\u30EC\u30B9\u30C8\u30E9\u30F3\u3067', level: 'N5',
            text: '\u571F\u66DC\u65E5(\u3069\u3088\u3046\u3073)\u306B\u53CB\u9054(\u3068\u3082\u3060\u3061)\u306E\u3055\u3068\u3046\u3055\u3093\u3068\u65E5\u672C(\u306B\u307B\u3093)\u306E\u30EC\u30B9\u30C8\u30E9\u30F3\u306B\u884C(\u3044)\u304D\u307E\u3057\u305F\u3002\u30EC\u30B9\u30C8\u30E9\u30F3\u306F\u99C5(\u3048\u304D)\u306E\u8FD1(\u3061\u304B)\u304F\u306B\u3042\u308A\u307E\u3059\u3002\u79C1(\u308F\u305F\u3057)\u306F\u9B5A(\u3055\u304B\u306A)\u306E\u6599\u7406(\u308A\u3087\u3046\u308A)\u3092\u98DF(\u305F)\u3079\u307E\u3057\u305F\u3002\u3068\u3066\u3082\u304A\u3044\u3057\u304B\u3063\u305F\u3067\u3059\u3002\u3055\u3068\u3046\u3055\u3093\u306F\u8089(\u306B\u304F)\u306E\u6599\u7406\u3092\u98DF\u3079\u307E\u3057\u305F\u3002\u98F2(\u306E)\u307F\u7269(\u3082\u306E)\u306F\u304A\u8336(\u3061\u3083)\u3092\u98F2\u307F\u307E\u3057\u305F\u3002\u5168\u90E8(\u305C\u3093\u3076)\u3067\u4E09\u5343\u5186(\u3055\u3093\u305C\u3093\u3048\u3093)\u3067\u3057\u305F\u3002\u5B89(\u3084\u3059)\u304F\u3066\u304A\u3044\u3057\u3044\u30EC\u30B9\u30C8\u30E9\u30F3\u3067\u3057\u305F\u3002\u307E\u305F\u884C(\u3044)\u304D\u305F\u3044\u3067\u3059\u3002',
            translation: "Samedi, je suis alle dans un restaurant japonais avec mon ami Sato. Le restaurant est pres de la gare. J'ai mange un plat de poisson. C'etait tres bon. Sato a mange un plat de viande. Comme boisson, nous avons bu du the. Au total, c'etait 3000 yens. C'etait un restaurant pas cher et delicieux. Je veux y retourner.",
            questions: [
                { q: '\u3044\u3064\u30EC\u30B9\u30C8\u30E9\u30F3\u306B\u884C\u304D\u307E\u3057\u305F\u304B\uFF1F', choices: ['\u65E5\u66DC\u65E5', '\u571F\u66DC\u65E5', '\u91D1\u66DC\u65E5', '\u6708\u66DC\u65E5'], correct: '\u571F\u66DC\u65E5', explanation: '\u571F\u66DC\u65E5\u306B\u884C\u304D\u307E\u3057\u305F = samedi' },
                { q: '\u30EC\u30B9\u30C8\u30E9\u30F3\u306F\u3069\u3053\u306B\u3042\u308A\u307E\u3059\u304B\uFF1F', choices: ['\u5B66\u6821\u306E\u8FD1\u304F', '\u5BB6\u306E\u8FD1\u304F', '\u99C5\u306E\u8FD1\u304F', '\u516C\u5712\u306E\u8FD1\u304F'], correct: '\u99C5\u306E\u8FD1\u304F', explanation: '\u99C5\u306E\u8FD1\u304F = pres de la gare' },
                { q: '\u79C1\u306F\u4F55\u3092\u98DF\u3079\u307E\u3057\u305F\u304B\uFF1F', choices: ['\u8089\u306E\u6599\u7406', '\u9B5A\u306E\u6599\u7406', '\u91CE\u83DC\u306E\u6599\u7406', '\u30E9\u30FC\u30E1\u30F3'], correct: '\u9B5A\u306E\u6599\u7406', explanation: '\u9B5A\u306E\u6599\u7406\u3092\u98DF\u3079\u307E\u3057\u305F = plat de poisson' },
                { q: '\u3044\u304F\u3089\u3067\u3057\u305F\u304B\uFF1F', choices: ['\u5343\u5186', '\u4E8C\u5343\u5186', '\u4E09\u5343\u5186', '\u4E94\u5343\u5186'], correct: '\u4E09\u5343\u5186', explanation: '\u4E09\u5343\u5186\u3067\u3057\u305F = 3000 yens' },
                { q: '\u30EC\u30B9\u30C8\u30E9\u30F3\u306F\u3069\u3046\u3067\u3057\u305F\u304B\uFF1F', choices: ['\u9AD8\u304F\u3066\u304A\u3044\u3057\u3044', '\u5B89\u304F\u3066\u304A\u3044\u3057\u3044', '\u9AD8\u304F\u3066\u307E\u305A\u3044', '\u5B89\u304F\u3066\u307E\u305A\u3044'], correct: '\u5B89\u304F\u3066\u304A\u3044\u3057\u3044', explanation: '\u5B89\u304F\u3066\u304A\u3044\u3057\u3044 = pas cher et delicieux' }
            ]
        }
    ],

    textsN4: [
        {
            id: 'n4_1', title: 'Travel Plans', titleJp: '\u65C5\u884C\u306E\u8A08\u753B', level: 'N4',
            text: '\u6765\u6708(\u3089\u3044\u3052\u3064)\u3001\u53CB\u9054(\u3068\u3082\u3060\u3061)\u3068\u4EAC\u90FD(\u304D\u3087\u3046\u3068)\u306B\u65C5\u884C(\u308A\u3087\u3053\u3046)\u306B\u884C(\u3044)\u304F\u4E88\u5B9A(\u3088\u3066\u3044)\u3067\u3059\u3002\u4EAC\u90FD\u306B\u306F\u6709\u540D(\u3086\u3046\u3081\u3044)\u306A\u304A\u5BFA(\u3066\u3089)\u3084\u795E\u793E(\u3058\u3093\u3058\u3083)\u304C\u305F\u304F\u3055\u3093\u3042\u308A\u307E\u3059\u3002\u65C5\u884C\u306F\u4E8C\u6CCA\u4E09\u65E5(\u306B\u306F\u304F\u307F\u3063\u304B)\u306E\u4E88\u5B9A\u3067\u3059\u3002\u30DB\u30C6\u30EB\u306F\u30A4\u30F3\u30BF\u30FC\u30CD\u30C3\u30C8\u3067\u4E88\u7D04(\u3088\u3084\u304F)\u3057\u307E\u3057\u305F\u3002\u4E00\u6CCA(\u3044\u3063\u3071\u304F)\u516B\u5343\u5186(\u306F\u3063\u305B\u3093\u3048\u3093)\u3067\u3057\u305F\u3002\u4EAC\u90FD\u307E\u3067\u306F\u65B0\u5E79\u7DDA(\u3057\u3093\u304B\u3093\u305B\u3093)\u3067\u884C\u304D\u307E\u3059\u3002\u4E8C\u6642\u9593(\u306B\u3058\u304B\u3093)\u304F\u3089\u3044\u304B\u304B\u308A\u307E\u3059\u3002',
            translation: "Le mois prochain, je prevois de voyager a Kyoto avec des amis. A Kyoto, il y a beaucoup de temples et sanctuaires celebres. Le voyage est prevu pour 2 nuits et 3 jours. J'ai reserve l'hotel sur internet. C'etait 8000 yens par nuit. On ira a Kyoto en shinkansen. Ca prend environ 2 heures.",
            questions: [
                { q: '\u3044\u3064\u4EAC\u90FD\u306B\u884C\u304D\u307E\u3059\u304B\uFF1F', choices: ['\u6765\u9031', '\u6765\u6708', '\u6765\u5E74', '\u4ECA\u6708'], correct: '\u6765\u6708', explanation: '\u6765\u6708 = le mois prochain' },
                { q: '\u65C5\u884C\u306F\u4F55\u65E5\u9593\u3067\u3059\u304B\uFF1F', choices: ['\u4E00\u6CCA\u4E8C\u65E5', '\u4E8C\u6CCA\u4E09\u65E5', '\u4E09\u6CCA\u56DB\u65E5', '\u65E5\u5E30\u308A'], correct: '\u4E8C\u6CCA\u4E09\u65E5', explanation: '\u4E8C\u6CCA\u4E09\u65E5 = 2 nuits 3 jours' },
                { q: '\u30DB\u30C6\u30EB\u306F\u4E00\u6CCA\u3044\u304F\u3089\u3067\u3059\u304B\uFF1F', choices: ['\u4E94\u5343\u5186', '\u516D\u5343\u5186', '\u516B\u5343\u5186', '\u4E00\u4E07\u5186'], correct: '\u516B\u5343\u5186', explanation: '\u4E00\u6CCA\u516B\u5343\u5186 = 8000 yens par nuit' },
                { q: '\u4EAC\u90FD\u307E\u3067\u4F55\u3067\u884C\u304D\u307E\u3059\u304B\uFF1F', choices: ['\u98DB\u884C\u6A5F', '\u30D0\u30B9', '\u96FB\u8ECA', '\u65B0\u5E79\u7DDA'], correct: '\u65B0\u5E79\u7DDA', explanation: '\u65B0\u5E79\u7DDA\u3067\u884C\u304D\u307E\u3059 = en shinkansen' }
            ]
        }
    ],

    // =============================================
    // TEXT GENERATOR (template-based)
    // =============================================
    _generatorData: {
        names: [
            { name: '\u3084\u307E\u3060', full: '\u5C71\u7530(\u3084\u307E\u3060)' },
            { name: '\u3059\u305A\u304D', full: '\u9234\u6728(\u3059\u305A\u304D)' },
            { name: '\u305F\u306A\u304B', full: '\u7530\u4E2D(\u305F\u306A\u304B)' },
            { name: '\u3055\u3068\u3046', full: '\u4F50\u85E4(\u3055\u3068\u3046)' },
            { name: '\u306F\u306A\u3053', full: '\u82B1\u5B50(\u306F\u306A\u3053)' },
            { name: '\u3051\u3093\u305F', full: '\u5065\u592A(\u3051\u3093\u305F)' },
            { name: '\u3086\u3046\u304D', full: '\u512A\u5E0C(\u3086\u3046\u304D)' },
            { name: '\u305F\u304F\u307F', full: '\u62D3\u5B9F(\u305F\u304F\u307F)' }
        ],
        wakeUp: [
            { jp: '\u516D\u6642(\u308D\u304F\u3058)', fr: '6h' },
            { jp: '\u516D\u6642\u534A(\u308D\u304F\u3058\u306F\u3093)', fr: '6h30' },
            { jp: '\u4E03\u6642(\u3057\u3061\u3058)', fr: '7h' },
            { jp: '\u4E94\u6642\u534A(\u3054\u3058\u306F\u3093)', fr: '5h30' }
        ],
        sleep: [
            { jp: '\u5341\u6642(\u3058\u3085\u3046\u3058)', fr: '22h' },
            { jp: '\u5341\u4E00\u6642(\u3058\u3085\u3046\u3044\u3061\u3058)', fr: '23h' },
            { jp: '\u5341\u4E8C\u6642(\u3058\u3085\u3046\u306B\u3058)', fr: 'minuit' },
            { jp: '\u5341\u6642\u534A(\u3058\u3085\u3046\u3058\u306F\u3093)', fr: '22h30' }
        ],
        breakfast: [
            { jp: '\u30D1\u30F3\u3068\u30B3\u30FC\u30D2\u30FC', fr: 'du pain et du cafe' },
            { jp: '\u3054\u98EF(\u306F\u3093)\u3068\u307F\u305D\u3057\u308B', fr: 'du riz et de la soupe miso' },
            { jp: '\u5375(\u305F\u307E\u3054)\u3068\u30B8\u30E5\u30FC\u30B9', fr: 'des oeufs et du jus' },
            { jp: '\u30D1\u30F3\u3068\u725B\u4E73(\u304E\u3085\u3046\u306B\u3085\u3046)', fr: 'du pain et du lait' }
        ],
        transport: [
            { jp: '\u96FB\u8ECA(\u3067\u3093\u3057\u3083)', fr: 'train' },
            { jp: '\u30D0\u30B9', fr: 'bus' },
            { jp: '\u81EA\u8EE2\u8ECA(\u3058\u3066\u3093\u3057\u3083)', fr: 'velo' },
            { jp: '\u6B69(\u3042\u308B)\u3044\u3066', fr: 'a pied' }
        ],
        destination: [
            { jp: '\u5B66\u6821(\u304C\u3063\u3053\u3046)', fr: "l'ecole" },
            { jp: '\u4F1A\u793E(\u304B\u3044\u3057\u3083)', fr: "l'entreprise" },
            { jp: '\u5927\u5B66(\u3060\u3044\u304C\u304F)', fr: "l'universite" }
        ],
        hobby: [
            { jp: '\u30C6\u30EC\u30D3\u3092\u898B(\u307F)\u307E\u3059', fr: 'regarde la tele' },
            { jp: '\u672C(\u307B\u3093)\u3092\u8AAD(\u3088)\u307F\u307E\u3059', fr: 'lit des livres' },
            { jp: '\u97F3\u697D(\u304A\u3093\u304C\u304F)\u3092\u805E(\u304D)\u304D\u307E\u3059', fr: 'ecoute de la musique' },
            { jp: '\u30B2\u30FC\u30E0\u3092\u3057\u307E\u3059', fr: 'joue aux jeux video' },
            { jp: '\u6599\u7406(\u308A\u3087\u3046\u308A)\u3092\u3057\u307E\u3059', fr: 'fait la cuisine' }
        ],
        food1: [
            { jp: '\u9B5A(\u3055\u304B\u306A)\u306E\u6599\u7406(\u308A\u3087\u3046\u308A)', fr: 'plat de poisson' },
            { jp: '\u8089(\u306B\u304F)\u306E\u6599\u7406(\u308A\u3087\u3046\u308A)', fr: 'plat de viande' },
            { jp: '\u30E9\u30FC\u30E1\u30F3', fr: 'ramen' },
            { jp: '\u5BFF\u53F8(\u3059\u3057)', fr: 'sushi' },
            { jp: '\u30AB\u30EC\u30FC', fr: 'curry' }
        ],
        food2: [
            { jp: '\u5929(\u3066\u3093)\u3077\u3089', fr: 'tempura' },
            { jp: '\u3046\u3069\u3093', fr: 'udon' },
            { jp: '\u91CE\u83DC(\u3084\u3055\u3044)\u306E\u6599\u7406(\u308A\u3087\u3046\u308A)', fr: 'plat de legumes' },
            { jp: '\u304A\u306B\u304E\u308A', fr: 'onigiri' },
            { jp: '\u713C(\u3084)\u304D\u8089(\u306B\u304F)', fr: 'yakiniku' }
        ],
        drink: [
            { jp: '\u304A\u8336(\u3061\u3083)', fr: 'the' },
            { jp: '\u30B3\u30FC\u30D2\u30FC', fr: 'cafe' },
            { jp: '\u6C34(\u307F\u305A)', fr: 'eau' },
            { jp: '\u30B8\u30E5\u30FC\u30B9', fr: 'jus' }
        ],
        price: [
            { jp: '\u4E8C\u5343\u5186(\u306B\u305B\u3093\u3048\u3093)', fr: '2000 yens' },
            { jp: '\u4E09\u5343\u5186(\u3055\u3093\u305C\u3093\u3048\u3093)', fr: '3000 yens' },
            { jp: '\u5343\u4E94\u767E\u5186(\u305B\u3093\u3054\u3072\u3083\u304F\u3048\u3093)', fr: '1500 yens' },
            { jp: '\u56DB\u5343\u5186(\u3088\u3093\u305B\u3093\u3048\u3093)', fr: '4000 yens' }
        ],
        day: [
            { jp: '\u6708\u66DC\u65E5(\u3052\u3064\u3088\u3046\u3073)', fr: 'lundi' },
            { jp: '\u706B\u66DC\u65E5(\u304B\u3088\u3046\u3073)', fr: 'mardi' },
            { jp: '\u6C34\u66DC\u65E5(\u3059\u3044\u3088\u3046\u3073)', fr: 'mercredi' },
            { jp: '\u6728\u66DC\u65E5(\u3082\u304F\u3088\u3046\u3073)', fr: 'jeudi' },
            { jp: '\u91D1\u66DC\u65E5(\u304D\u3093\u3088\u3046\u3073)', fr: 'vendredi' },
            { jp: '\u571F\u66DC\u65E5(\u3069\u3088\u3046\u3073)', fr: 'samedi' },
            { jp: '\u65E5\u66DC\u65E5(\u306B\u3061\u3088\u3046\u3073)', fr: 'dimanche' }
        ],
        place: [
            { jp: '\u99C5(\u3048\u304D)\u306E\u8FD1(\u3061\u304B)\u304F', fr: 'pres de la gare' },
            { jp: '\u516C\u5712(\u3053\u3046\u3048\u3093)\u306E\u524D(\u307E\u3048)', fr: 'devant le parc' },
            { jp: '\u5B66\u6821(\u304C\u3063\u3053\u3046)\u306E\u3068\u306A\u308A', fr: 'a cote de l\'ecole' },
            { jp: '\u5927(\u304A\u304A)\u304D\u3044\u901A(\u3068\u304A)\u308A\u306E\u305D\u3070', fr: 'pres de la grande avenue' }
        ],
        season: [
            { jp: '\u6625(\u306F\u308B)', fr: 'printemps' },
            { jp: '\u590F(\u306A\u3064)', fr: 'ete' },
            { jp: '\u79CB(\u3042\u304D)', fr: 'automne' },
            { jp: '\u51AC(\u3075\u3086)', fr: 'hiver' }
        ]
    },

    _pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    _pickExcept(arr, ...exclude) {
        const filtered = arr.filter(x => !exclude.includes(x));
        return filtered[Math.floor(Math.random() * filtered.length)];
    },

    _shuffle(arr) {
        return [...arr].sort(() => Math.random() - 0.5);
    },

    generateText(level) {
        const d = this._generatorData;
        const templateIndex = Math.floor(Math.random() * 3);

        if (templateIndex === 0) return this._genDailyLife(d, level);
        if (templateIndex === 1) return this._genRestaurant(d, level);
        return this._genWeekend(d, level);
    },

    _genDailyLife(d, level) {
        const name = this._pick(d.names);
        const wake = this._pick(d.wakeUp);
        const sleep = this._pick(d.sleep);
        const bf = this._pick(d.breakfast);
        const tr = this._pick(d.transport);
        const dest = this._pick(d.destination);
        const hob = this._pick(d.hobby);

        const text = `${name.full}\u3055\u3093\u306F\u6BCE\u671D(\u307E\u3044\u3042\u3055)${wake.jp}\u306B\u8D77(\u304A)\u304D\u307E\u3059\u3002\u671D(\u3042\u3055)\u3054\u98EF(\u306F\u3093)\u306F${bf.jp}\u3067\u3059\u3002${tr.jp}\u3067${dest.jp}\u306B\u884C(\u3044)\u304D\u307E\u3059\u3002${dest.jp}\u306F\u4E5D\u6642(\u304F\u3058)\u304B\u3089\u4E94\u6642(\u3054\u3058)\u307E\u3067\u3067\u3059\u3002\u5BB6(\u3044\u3048)\u306B\u5E30(\u304B\u3048)\u3063\u3066\u304B\u3089\u3001${hob.jp}\u3002${sleep.jp}\u306B\u5BDD(\u306D)\u307E\u3059\u3002`;
        const translation = `${name.full} se leve a ${wake.fr} chaque matin. Le petit-dejeuner c'est ${bf.fr}. Il/elle va a ${dest.fr} en ${tr.fr}. ${dest.fr === "l'ecole" ? "L'ecole" : dest.fr === "l'universite" ? "L'universite" : "L'entreprise"} est de 9h a 17h. Apres etre rentre(e), il/elle ${hob.fr}. Il/elle se couche a ${sleep.fr}.`;

        const wW = this._pickExcept(d.wakeUp, wake); const wW2 = this._pickExcept(d.wakeUp, wake, wW); const wW3 = this._pickExcept(d.wakeUp, wake, wW, wW2);
        const bW = this._pickExcept(d.breakfast, bf); const bW2 = this._pickExcept(d.breakfast, bf, bW); const bW3 = this._pickExcept(d.breakfast, bf, bW, bW2);
        const tW = this._pickExcept(d.transport, tr); const tW2 = this._pickExcept(d.transport, tr, tW); const tW3 = this._pickExcept(d.transport, tr, tW, tW2);
        const sW = this._pickExcept(d.sleep, sleep); const sW2 = this._pickExcept(d.sleep, sleep, sW); const sW3 = this._pickExcept(d.sleep, sleep, sW, sW2);

        return {
            id: 'gen_' + Date.now(),
            title: `${name.full}'s Day`,
            titleJp: `${name.full}\u3055\u3093\u306E\u4E00\u65E5`,
            text, translation, level,
            questions: [
                { q: `${name.full}\u3055\u3093\u306F\u4F55\u6642\u306B\u8D77\u304D\u307E\u3059\u304B\uFF1F`, choices: this._shuffle([wake.jp, wW.jp, wW2.jp, wW3.jp]), correct: wake.jp, explanation: `${wake.jp}\u306B\u8D77\u304D\u307E\u3059 = se leve a ${wake.fr}` },
                { q: '\u671D\u3054\u98EF\u306F\u4F55\u3067\u3059\u304B\uFF1F', choices: this._shuffle([bf.jp, bW.jp, bW2.jp, bW3.jp]), correct: bf.jp, explanation: `${bf.jp}\u3067\u3059 = c'est ${bf.fr}` },
                { q: `${dest.jp}\u306B\u4F55\u3067\u884C\u304D\u307E\u3059\u304B\uFF1F`, choices: this._shuffle([tr.jp, tW.jp, tW2.jp, tW3.jp]), correct: tr.jp, explanation: `${tr.jp}\u3067\u884C\u304D\u307E\u3059 = en ${tr.fr}` },
                { q: '\u4F55\u6642\u306B\u5BDD\u307E\u3059\u304B\uFF1F', choices: this._shuffle([sleep.jp, sW.jp, sW2.jp, sW3.jp]), correct: sleep.jp, explanation: `${sleep.jp}\u306B\u5BDD\u307E\u3059 = se couche a ${sleep.fr}` }
            ]
        };
    },

    _genRestaurant(d, level) {
        const name = this._pick(d.names);
        const day = this._pick(d.day);
        const pl = this._pick(d.place);
        const f1 = this._pick(d.food1);
        const f2 = this._pickExcept(d.food2, f1);
        const dr = this._pick(d.drink);
        const pr = this._pick(d.price);

        const text = `${day.jp}\u306B\u53CB\u9054(\u3068\u3082\u3060\u3061)\u306E${name.full}\u3055\u3093\u3068\u30EC\u30B9\u30C8\u30E9\u30F3\u306B\u884C(\u3044)\u304D\u307E\u3057\u305F\u3002\u30EC\u30B9\u30C8\u30E9\u30F3\u306F${pl.jp}\u306B\u3042\u308A\u307E\u3059\u3002\u79C1(\u308F\u305F\u3057)\u306F${f1.jp}\u3092\u98DF(\u305F)\u3079\u307E\u3057\u305F\u3002${name.full}\u3055\u3093\u306F${f2.jp}\u3092\u98DF\u3079\u307E\u3057\u305F\u3002\u98F2(\u306E)\u307F\u7269(\u3082\u306E)\u306F${dr.jp}\u3092\u98F2\u307F\u307E\u3057\u305F\u3002\u5168\u90E8(\u305C\u3093\u3076)\u3067${pr.jp}\u3067\u3057\u305F\u3002\u3068\u3066\u3082\u304A\u3044\u3057\u304B\u3063\u305F\u3067\u3059\u3002`;
        const translation = `${day.fr}, je suis alle(e) au restaurant avec mon ami(e) ${name.full}. Le restaurant est ${pl.fr}. J'ai mange du ${f1.fr}. ${name.full} a mange du ${f2.fr}. Comme boisson, nous avons bu du ${dr.fr}. Au total, c'etait ${pr.fr}. C'etait tres bon.`;

        const dW = this._pickExcept(d.day, day); const dW2 = this._pickExcept(d.day, day, dW); const dW3 = this._pickExcept(d.day, day, dW, dW2);
        const pW = this._pickExcept(d.place, pl); const pW2 = this._pickExcept(d.place, pl, pW); const pW3 = this._pickExcept(d.place, pl, pW, pW2);
        const fW = this._pickExcept(d.food1.concat(d.food2), f1); const fW2 = this._pickExcept(d.food1.concat(d.food2), f1, fW); const fW3 = this._pickExcept(d.food1.concat(d.food2), f1, fW, fW2);
        const prW = this._pickExcept(d.price, pr); const prW2 = this._pickExcept(d.price, pr, prW); const prW3 = this._pickExcept(d.price, pr, prW, prW2);
        const drW = this._pickExcept(d.drink, dr); const drW2 = this._pickExcept(d.drink, dr, drW); const drW3 = this._pickExcept(d.drink, dr, drW, drW2);

        return {
            id: 'gen_' + Date.now(),
            title: 'At the Restaurant',
            titleJp: '\u30EC\u30B9\u30C8\u30E9\u30F3\u3067',
            text, translation, level,
            questions: [
                { q: '\u3044\u3064\u30EC\u30B9\u30C8\u30E9\u30F3\u306B\u884C\u304D\u307E\u3057\u305F\u304B\uFF1F', choices: this._shuffle([day.jp, dW.jp, dW2.jp, dW3.jp]), correct: day.jp, explanation: `${day.jp}\u306B\u884C\u304D\u307E\u3057\u305F = ${day.fr}` },
                { q: '\u30EC\u30B9\u30C8\u30E9\u30F3\u306F\u3069\u3053\u306B\u3042\u308A\u307E\u3059\u304B\uFF1F', choices: this._shuffle([pl.jp, pW.jp, pW2.jp, pW3.jp]), correct: pl.jp, explanation: `${pl.jp}\u306B\u3042\u308A\u307E\u3059 = ${pl.fr}` },
                { q: '\u79C1\u306F\u4F55\u3092\u98DF\u3079\u307E\u3057\u305F\u304B\uFF1F', choices: this._shuffle([f1.jp, fW.jp, fW2.jp, fW3.jp]), correct: f1.jp, explanation: `${f1.jp}\u3092\u98DF\u3079\u307E\u3057\u305F = ${f1.fr}` },
                { q: '\u98F2\u307F\u7269\u306F\u4F55\u3067\u3057\u305F\u304B\uFF1F', choices: this._shuffle([dr.jp, drW.jp, drW2.jp, drW3.jp]), correct: dr.jp, explanation: `${dr.jp}\u3092\u98F2\u307F\u307E\u3057\u305F = ${dr.fr}` },
                { q: '\u5168\u90E8\u3067\u3044\u304F\u3089\u3067\u3057\u305F\u304B\uFF1F', choices: this._shuffle([pr.jp, prW.jp, prW2.jp, prW3.jp]), correct: pr.jp, explanation: `${pr.jp}\u3067\u3057\u305F = ${pr.fr}` }
            ]
        };
    },

    _genWeekend(d, level) {
        const name = this._pick(d.names);
        const season = this._pick(d.season);
        const tr = this._pick(d.transport);
        const hob1 = this._pick(d.hobby);
        const hob2 = this._pickExcept(d.hobby, hob1);
        const f = this._pick(d.food1);
        const dr = this._pick(d.drink);

        const text = `\u65E5\u66DC\u65E5(\u306B\u3061\u3088\u3046\u3073)\u306B${name.full}\u3055\u3093\u3068\u904A(\u3042\u305D)\u3073\u307E\u3057\u305F\u3002\u4ECA(\u3044\u307E)\u306F${season.jp}\u3067\u3059\u3002\u5348\u524D(\u3054\u305C\u3093)\u306F\u516C\u5712(\u3053\u3046\u3048\u3093)\u3067\u6563\u6B69(\u3055\u3093\u307D)\u3092\u3057\u307E\u3057\u305F\u3002\u305D\u308C\u304B\u3089\u3001${tr.jp}\u3067\u753A(\u307E\u3061)\u306B\u884C\u304D\u307E\u3057\u305F\u3002\u304A\u663C(\u3072\u308B)\u306B${f.jp}\u3092\u98DF(\u305F)\u3079\u3066\u3001${dr.jp}\u3092\u98F2(\u306E)\u307F\u307E\u3057\u305F\u3002\u5348\u5F8C(\u3054\u3054)\u306F\u5BB6(\u3044\u3048)\u3067${hob1.jp}\u3002\u591C(\u3088\u308B)\u306F${hob2.jp}\u3002\u3068\u3066\u3082\u697D(\u305F\u306E)\u3057\u3044\u4E00\u65E5(\u3044\u3061\u306B\u3061)\u3067\u3057\u305F\u3002`;
        const translation = `Dimanche, j'ai passe du temps avec ${name.full}. C'est actuellement ${season.fr}. Le matin, nous nous sommes promenes au parc. Ensuite, nous sommes alles en ville en ${tr.fr}. A midi, nous avons mange du ${f.fr} et bu du ${dr.fr}. L'apres-midi, a la maison, il/elle ${hob1.fr}. Le soir, il/elle ${hob2.fr}. C'etait une journee tres agreable.`;

        const sW = this._pickExcept(d.season, season); const sW2 = this._pickExcept(d.season, season, sW); const sW3 = this._pickExcept(d.season, season, sW, sW2);
        const tW = this._pickExcept(d.transport, tr); const tW2 = this._pickExcept(d.transport, tr, tW); const tW3 = this._pickExcept(d.transport, tr, tW, tW2);
        const fW = this._pickExcept(d.food1, f); const fW2 = this._pickExcept(d.food1, f, fW); const fW3 = this._pickExcept(d.food1, f, fW, fW2);
        const drW = this._pickExcept(d.drink, dr); const drW2 = this._pickExcept(d.drink, dr, drW); const drW3 = this._pickExcept(d.drink, dr, drW, drW2);

        return {
            id: 'gen_' + Date.now(),
            title: 'My Weekend',
            titleJp: '\u697D\u3057\u3044\u9031\u672B',
            text, translation, level,
            questions: [
                { q: '\u4ECA\u306F\u3069\u306E\u5B63\u7BC0(\u304D\u305B\u3064)\u3067\u3059\u304B\uFF1F', choices: this._shuffle([season.jp, sW.jp, sW2.jp, sW3.jp]), correct: season.jp, explanation: `${season.jp}\u3067\u3059 = c'est ${season.fr}` },
                { q: '\u753A\u306B\u4F55\u3067\u884C\u304D\u307E\u3057\u305F\u304B\uFF1F', choices: this._shuffle([tr.jp, tW.jp, tW2.jp, tW3.jp]), correct: tr.jp, explanation: `${tr.jp}\u3067\u884C\u304D\u307E\u3057\u305F = en ${tr.fr}` },
                { q: '\u304A\u663C\u306B\u4F55\u3092\u98DF\u3079\u307E\u3057\u305F\u304B\uFF1F', choices: this._shuffle([f.jp, fW.jp, fW2.jp, fW3.jp]), correct: f.jp, explanation: `${f.jp}\u3092\u98DF\u3079\u307E\u3057\u305F = ${f.fr}` },
                { q: '\u4F55\u3092\u98F2\u307F\u307E\u3057\u305F\u304B\uFF1F', choices: this._shuffle([dr.jp, drW.jp, drW2.jp, drW3.jp]), correct: dr.jp, explanation: `${dr.jp}\u3092\u98F2\u307F\u307E\u3057\u305F = ${dr.fr}` }
            ]
        };
    },

    // =============================================
    // MODULE LOGIC
    // =============================================
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
        } else if (this.currentText) {
            this.renderText(container);
        } else {
            this.renderList(container);
        }
    },

    renderList(container) {
        const texts = this.getFilteredTexts();

        container.innerHTML = `
            <div style="text-align:center; margin-bottom:24px;">
                <button class="btn btn-primary btn-lg" id="reading-generate">
                    ${I18n.t('reading_generate')}
                </button>
            </div>
            <div class="reading-list">
                ${texts.map((t, i) => `
                    <div class="reading-card" data-index="${i}" data-src="static">
                        <div class="reading-card-header">
                            <span class="reading-card-title">${t.titleJp}</span>
                            <span class="kanji-level-tag ${t.level.toLowerCase()}">${t.level}</span>
                        </div>
                        <div class="reading-card-subtitle">${t.title}</div>
                        <div class="reading-card-meta">${t.questions.length} ${I18n.t('reading_questions')}</div>
                    </div>
                `).join('')}
            </div>`;

        document.getElementById('reading-generate').addEventListener('click', () => {
            const level = LevelFilter.get() === 'all' ? (Math.random() > 0.5 ? 'N5' : 'N4') : LevelFilter.get();
            this.currentText = this.generateText(level);
            this.render();
        });

        container.querySelectorAll('.reading-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.index);
                this.currentText = this.getFilteredTexts()[idx];
                this.render();
            });
        });
    },

    renderText(container) {
        const t = this.currentText;

        container.innerHTML = `
            <div class="reading-back">
                <button class="btn btn-secondary" id="reading-back">&larr; ${I18n.t('back')}</button>
                <span class="kanji-level-tag ${t.level.toLowerCase()}" style="margin-left:12px;">${t.level}</span>
            </div>

            <div class="reading-passage">
                <h2 class="reading-title">${t.titleJp} <span class="reading-title-en">\u2014 ${t.title}</span></h2>
                <div class="reading-text-jp">${t.text.replace(/\n/g, '<br>')}</div>
                <details class="reading-translation">
                    <summary>${I18n.t('reading_show_translation')}</summary>
                    <div class="reading-text-fr">${t.translation}</div>
                </details>
            </div>

            <div style="text-align:center; margin-top:24px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                <button class="btn btn-primary btn-lg" id="reading-start-quiz">${I18n.t('reading_start_quiz')}</button>
                <button class="btn btn-secondary" id="reading-generate-new">${I18n.t('reading_generate')}</button>
            </div>`;

        document.getElementById('reading-back').addEventListener('click', () => {
            this.currentText = null;
            this.quizState = null;
            this.render();
        });

        document.getElementById('reading-start-quiz').addEventListener('click', () => {
            this.quizState = { questions: t.questions, current: 0, score: 0, answers: [], text: t };
            this.render();
        });

        document.getElementById('reading-generate-new').addEventListener('click', () => {
            const level = LevelFilter.get() === 'all' ? (Math.random() > 0.5 ? 'N5' : 'N4') : LevelFilter.get();
            this.currentText = this.generateText(level);
            this.quizState = null;
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
                    <div class="quiz-score-label">${qs.score}/${qs.questions.length} \u2014 ${qs.text.titleJp}</div>
                    <div style="margin-top:24px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                        <button class="btn btn-primary" id="reading-reread">${I18n.t('reading_reread')}</button>
                        <button class="btn btn-secondary" id="reading-generate-again">${I18n.t('reading_generate')}</button>
                        <button class="btn btn-secondary" id="reading-back-list">${I18n.t('back')}</button>
                    </div>
                </div>
            </div>`;

        document.getElementById('reading-reread')?.addEventListener('click', () => {
            this.quizState = null;
            this.render();
        });

        document.getElementById('reading-generate-again')?.addEventListener('click', () => {
            const level = LevelFilter.get() === 'all' ? (Math.random() > 0.5 ? 'N5' : 'N4') : LevelFilter.get();
            this.currentText = this.generateText(level);
            this.quizState = null;
            this.render();
        });

        document.getElementById('reading-back-list')?.addEventListener('click', () => {
            this.currentText = null;
            this.quizState = null;
            this.render();
        });
    }
};
