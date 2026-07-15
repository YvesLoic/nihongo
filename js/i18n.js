// ========================================
// Internationalization (i18n) Module
// ========================================

window.I18n = {
    _locale: 'fr',

    translations: {
        // =============================================
        // FRENCH
        // =============================================
        fr: {
            // -- General / Shared --
            correct: 'Correct !',
            incorrect: 'Incorrect.',
            next: 'Suivant',
            previous: 'Precedent',
            back: 'Retour',
            retry: 'Recommencer',
            shuffle: 'Melanger',
            listen: 'Ecouter',
            search: 'Rechercher',
            start: 'Commencer',
            finish: 'Terminer',
            all: 'Tout',
            days: 'jours',
            level: 'Niveau',
            good_answers: 'bonnes reponses',
            no_data: 'Aucune donnee disponible.',
            click_to_flip: 'Cliquez pour retourner',
            click_to_see: 'Cliquez pour voir la traduction',
            tts_unsupported: 'Text-to-speech non supporte dans ce navigateur',

            // -- SRS Buttons --
            srs_again: 'A revoir',
            srs_hard: 'Difficile',
            srs_good: 'Bien',
            srs_easy: 'Facile',
            srs_noted_good: 'Bien note !',
            srs_review_soon: 'A revoir bientot',

            // -- Navigation --
            nav_dashboard: 'Tableau de bord',
            nav_kana: 'Kana',
            nav_kanji: 'Kanji',
            nav_grammar: 'Grammaire',
            nav_vocab: 'Vocabulaire',
            nav_exam: 'Examen',
            nav_profile: 'Profil',

            // -- Auth --
            auth_login: 'Se connecter',
            auth_logout: 'Se deconnecter',
            auth_save_progress: 'Sauvegardez votre progression',
            auth_sync_now: 'Synchroniser maintenant',
            auth_status: 'Statut :',
            auth_connected: 'Connecte',

            // -- Dashboard --
            dash_welcome: "Bienvenue dans votre espace d'apprentissage",
            dash_subtitle: 'Suivez votre progression et continuez a apprendre le japonais',
            dash_studied_today: "Etudies aujourd'hui",
            dash_mastered: 'Elements maitrises',
            dash_streak: 'Jours consecutifs',
            dash_accuracy: 'Precision globale',
            dash_progress_title: 'Progression par module',
            dash_progress_kana: 'Kana (Hiragana + Katakana)',
            dash_progress_kanji: 'Kanji',
            dash_progress_grammar: 'Grammaire',
            dash_progress_vocab: 'Vocabulaire',
            dash_review_title: 'Revisions du jour',
            dash_no_review: 'Aucune revision pour le moment. Commencez a etudier !',
            dash_start_review: 'Commencer la revision',
            dash_and_more: '...et {n} autres',
            dash_type_kana: 'Kana',
            dash_type_kanji: 'Kanji',
            dash_type_grammar: 'Grammaire',
            dash_type_vocab: 'Vocabulaire',
            dash_level_prefix: 'Niveau',

            // -- Kana --
            kana_title: 'Kana - Hiragana & Katakana',
            kana_subtitle: 'Maitrisez les deux syllabaires japonais',
            kana_tab_hiragana: 'Hiragana',
            kana_tab_katakana: 'Katakana',
            kana_tab_quiz: 'Quiz',
            kana_base: 'Base (46)',
            kana_dakuten: 'Dakuten & Handakuten',
            kana_combo: 'Combinaisons (Youon)',
            kana_start_quiz: 'Lancer un Quiz',
            kana_choose_type: 'Choisissez un type de quiz',
            kana_both: 'Les deux',
            kana_mode: 'Mode',
            kana_mode_type: 'Ecrire la romanisation',
            kana_mode_choose: 'Choix multiples',
            kana_type_prompt: 'Tapez la romanisation',
            kana_your_answer: 'Votre reponse...',
            kana_validate: 'Valider',
            kana_what_romaji: 'Quelle est la romanisation ?',
            kana_correct_was: 'La bonne reponse est :',
            kana_result_excellent: 'Excellent !',
            kana_result_good: 'Bien joue !',
            kana_result_ok: 'Pas mal, continuez !',
            kana_result_practice: 'Continuez a pratiquer !',
            kana_to_review: 'A revoir :',

            // -- Kanji --
            kanji_title: 'Kanji',
            kanji_subtitle: 'Apprenez les kanji essentiels du JLPT N5 et N4',
            kanji_tab_list: 'Liste',
            kanji_tab_flashcard: 'Flashcards',
            kanji_tab_quiz: 'Quiz',
            kanji_search: 'Rechercher un kanji ou sa signification...',
            kanji_no_data: 'Aucun kanji disponible pour ce niveau.',
            kanji_examples: 'Exemples :',
            kanji_what_meaning: 'Quelle est la signification ?',
            kanji_back_list: 'Retour a la liste',

            // -- Grammar --
            grammar_title: 'Grammaire',
            grammar_subtitle: 'Structures grammaticales N5 et N4',
            grammar_tab_lessons: 'Lecons',
            grammar_tab_exercises: 'Exercices',
            grammar_search: 'Rechercher une structure grammaticale...',
            grammar_points: 'points de grammaire',
            grammar_which_structure: 'Quelle structure grammaticale correspond a :',
            grammar_what_means: 'Que signifie la structure',
            grammar_answer: 'Reponse :',
            grammar_back_lessons: 'Retour aux lecons',

            // -- Vocabulary --
            vocab_title: 'Vocabulaire',
            vocab_subtitle: 'Vocabulaire essentiel par theme',
            vocab_tab_themes: 'Themes',
            vocab_tab_flashcard: 'Flashcards',
            vocab_tab_quiz: 'Quiz',
            vocab_back_themes: 'Retour aux themes',
            vocab_words: 'mots',
            vocab_search: 'Rechercher un mot...',
            vocab_quiz_theme: 'Quiz sur ce theme',
            vocab_no_data: 'Aucun vocabulaire disponible.',
            vocab_not_enough: 'Pas assez de mots pour un quiz',
            vocab_what_translation: 'Quelle est la traduction ?',
            vocab_what_japanese: 'Quel est le mot japonais ?',

            // -- Exam --
            exam_title: "Simulateur d'examen JLPT",
            exam_subtitle: 'Testez vos connaissances en conditions reelles',
            exam_setup_title: "Simulateur d'examen JLPT",
            exam_setup_desc: "Testez vos connaissances dans les conditions d'un vrai examen",
            exam_type_complete: 'Examen complet',
            exam_type_complete_desc: 'Kanji, vocabulaire, grammaire, lecture',
            exam_type_kanji: 'Kanji seul',
            exam_type_kanji_desc: 'Lecture et signification des kanji',
            exam_type_grammar: 'Grammaire seule',
            exam_type_grammar_desc: 'Structures et particules',
            exam_type_vocab: 'Vocabulaire seul',
            exam_type_vocab_desc: 'Signification et lecture',
            exam_questions: 'Nombre de questions :',
            exam_timer: 'Chronometre :',
            exam_no_limit: 'Sans limite',
            exam_start: "Commencer l'examen",
            exam_current_level: 'Niveau actuel :',
            exam_finish: 'Terminer',
            exam_confirm_finish: "Etes-vous sur de vouloir terminer l'examen ?",
            exam_submit: 'Voir les resultats',
            exam_question: 'Question',
            exam_q_kanji: 'Kanji',
            exam_q_grammar: 'Grammaire',
            exam_q_vocab: 'Vocabulaire',
            exam_kanji_meaning: 'Quelle est la signification du kanji',
            exam_kanji_reading: 'Quelle est la lecture du kanji',
            exam_grammar_meaning: 'Que signifie la structure',
            exam_vocab_meaning: 'Que signifie',
            exam_result_excellent: "Excellent ! Vous etes pret(e) pour l'examen !",
            exam_result_good: "Bien ! Encore un peu de pratique et c'est bon !",
            exam_result_ok: 'Pas mal, mais continuez a reviser.',
            exam_result_bad: 'Il faut encore travailler. Ne lachez pas !',
            exam_duration: 'Duree :',
            exam_retry: 'Refaire un examen',
            exam_review: 'Revoir les erreurs',
            exam_perfect: 'Parfait ! Aucune erreur !',
            exam_review_title: 'Revue des erreurs',
            exam_your_answer: 'Votre reponse :',
            exam_no_answer: '(pas de reponse)',
            exam_correct_answer: 'Bonne reponse :',
            exam_back_results: 'Retour aux resultats',

            // -- Profile --
            profile_title: 'Profil',
            profile_subtitle: 'Gerez vos preferences',
            profile_language: 'Langue de l\'interface',
            profile_language_desc: 'Choisissez la langue dans laquelle l\'application sera affichee.',
            profile_lang_fr: 'Francais',
            profile_lang_en: 'English',
            profile_saved: 'Preferences sauvegardees !',
            profile_reset_title: 'Reinitialiser la progression',
            profile_reset_desc: 'Supprimer toutes vos donnees de progression locale.',
            profile_reset_btn: 'Reinitialiser',
            profile_reset_confirm: 'Etes-vous sur ? Toute votre progression locale sera perdue.',
            profile_reset_done: 'Progression reinitialisee.',

            profile_account: 'Compte',
            profile_not_connected: 'Non connecte',
            profile_not_connected_desc: 'Connectez-vous pour sauvegarder votre progression sur tous vos appareils.',
            profile_connect_btn: 'Se connecter',
            profile_name: 'Nom',
            profile_email: 'Email',
            profile_provider: 'Connexion via',
            profile_member_since: 'Membre depuis',
            profile_logout: 'Se deconnecter',

            profile_stats: 'Statistiques',
            profile_stats_studied: 'Elements etudies',
            profile_stats_mastered: 'Elements maitrises',
            profile_stats_accuracy: 'Precision',
            profile_stats_streak: 'Serie actuelle',

            // -- Admin --
            nav_admin: 'Admin',
            admin_title: 'Administration',
            admin_subtitle: 'Vue d\'ensemble des utilisateurs',
            admin_no_access: 'Acces refuse. Vous n\'etes pas administrateur.',
            admin_loading: 'Chargement des utilisateurs...',
            admin_error_load: 'Erreur lors du chargement des utilisateurs.',
            admin_total_users: 'Utilisateurs',
            admin_active_today: 'Actifs aujourd\'hui',
            admin_avg_accuracy: 'Precision moyenne',
            admin_avg_streak: 'Serie moyenne',
            admin_search: 'Rechercher un utilisateur...',
            admin_refresh: 'Actualiser',
            admin_col_user: 'Utilisateur',
            admin_col_studied: 'Etudies',
            admin_col_mastered: 'Maitrises',
            admin_col_accuracy: 'Precision',
            admin_col_streak: 'Serie',
            admin_col_last_sync: 'Derniere sync',
            admin_col_details: 'Details',
            admin_no_users: 'Aucun utilisateur trouve.',
            admin_view: 'Voir',
            admin_progress_detail: 'Progression detaillee',
            admin_items: 'elements',
            admin_last_study: 'Derniere etude',
            admin_today: 'Aujourd\'hui'
        },

        // =============================================
        // ENGLISH
        // =============================================
        en: {
            // -- General / Shared --
            correct: 'Correct!',
            incorrect: 'Incorrect.',
            next: 'Next',
            previous: 'Previous',
            back: 'Back',
            retry: 'Restart',
            shuffle: 'Shuffle',
            listen: 'Listen',
            search: 'Search',
            start: 'Start',
            finish: 'Finish',
            all: 'All',
            days: 'days',
            level: 'Level',
            good_answers: 'correct answers',
            no_data: 'No data available.',
            click_to_flip: 'Click to flip',
            click_to_see: 'Click to see the translation',
            tts_unsupported: 'Text-to-speech is not supported in this browser',

            // -- SRS Buttons --
            srs_again: 'Again',
            srs_hard: 'Hard',
            srs_good: 'Good',
            srs_easy: 'Easy',
            srs_noted_good: 'Well noted!',
            srs_review_soon: 'Review soon',

            // -- Navigation --
            nav_dashboard: 'Dashboard',
            nav_kana: 'Kana',
            nav_kanji: 'Kanji',
            nav_grammar: 'Grammar',
            nav_vocab: 'Vocabulary',
            nav_exam: 'Exam',
            nav_profile: 'Profile',

            // -- Auth --
            auth_login: 'Sign in',
            auth_logout: 'Sign out',
            auth_save_progress: 'Save your progress',
            auth_sync_now: 'Sync now',
            auth_status: 'Status:',
            auth_connected: 'Connected',

            // -- Dashboard --
            dash_welcome: 'Welcome to your learning space',
            dash_subtitle: 'Track your progress and keep learning Japanese',
            dash_studied_today: 'Studied today',
            dash_mastered: 'Items mastered',
            dash_streak: 'Consecutive days',
            dash_accuracy: 'Overall accuracy',
            dash_progress_title: 'Progress by module',
            dash_progress_kana: 'Kana (Hiragana + Katakana)',
            dash_progress_kanji: 'Kanji',
            dash_progress_grammar: 'Grammar',
            dash_progress_vocab: 'Vocabulary',
            dash_review_title: "Today's reviews",
            dash_no_review: 'No reviews for now. Start studying!',
            dash_start_review: 'Start review',
            dash_and_more: '...and {n} more',
            dash_type_kana: 'Kana',
            dash_type_kanji: 'Kanji',
            dash_type_grammar: 'Grammar',
            dash_type_vocab: 'Vocabulary',
            dash_level_prefix: 'Level',

            // -- Kana --
            kana_title: 'Kana - Hiragana & Katakana',
            kana_subtitle: 'Master both Japanese syllabaries',
            kana_tab_hiragana: 'Hiragana',
            kana_tab_katakana: 'Katakana',
            kana_tab_quiz: 'Quiz',
            kana_base: 'Basic (46)',
            kana_dakuten: 'Dakuten & Handakuten',
            kana_combo: 'Combinations (Youon)',
            kana_start_quiz: 'Start Quiz',
            kana_choose_type: 'Choose a quiz type',
            kana_both: 'Both',
            kana_mode: 'Mode',
            kana_mode_type: 'Type the romanization',
            kana_mode_choose: 'Multiple choice',
            kana_type_prompt: 'Type the romanization',
            kana_your_answer: 'Your answer...',
            kana_validate: 'Submit',
            kana_what_romaji: 'What is the romanization?',
            kana_correct_was: 'The correct answer is:',
            kana_result_excellent: 'Excellent!',
            kana_result_good: 'Well done!',
            kana_result_ok: 'Not bad, keep going!',
            kana_result_practice: 'Keep practicing!',
            kana_to_review: 'To review:',

            // -- Kanji --
            kanji_title: 'Kanji',
            kanji_subtitle: 'Learn essential JLPT N5 and N4 kanji',
            kanji_tab_list: 'List',
            kanji_tab_flashcard: 'Flashcards',
            kanji_tab_quiz: 'Quiz',
            kanji_search: 'Search a kanji or its meaning...',
            kanji_no_data: 'No kanji available for this level.',
            kanji_examples: 'Examples:',
            kanji_what_meaning: 'What is the meaning?',
            kanji_back_list: 'Back to list',

            // -- Grammar --
            grammar_title: 'Grammar',
            grammar_subtitle: 'N5 and N4 grammar structures',
            grammar_tab_lessons: 'Lessons',
            grammar_tab_exercises: 'Exercises',
            grammar_search: 'Search a grammar structure...',
            grammar_points: 'grammar points',
            grammar_which_structure: 'Which grammar structure corresponds to:',
            grammar_what_means: 'What does the structure mean',
            grammar_answer: 'Answer:',
            grammar_back_lessons: 'Back to lessons',

            // -- Vocabulary --
            vocab_title: 'Vocabulary',
            vocab_subtitle: 'Essential vocabulary by theme',
            vocab_tab_themes: 'Themes',
            vocab_tab_flashcard: 'Flashcards',
            vocab_tab_quiz: 'Quiz',
            vocab_back_themes: 'Back to themes',
            vocab_words: 'words',
            vocab_search: 'Search a word...',
            vocab_quiz_theme: 'Quiz on this theme',
            vocab_no_data: 'No vocabulary available.',
            vocab_not_enough: 'Not enough words for a quiz',
            vocab_what_translation: 'What is the translation?',
            vocab_what_japanese: 'What is the Japanese word?',

            // -- Exam --
            exam_title: 'JLPT Exam Simulator',
            exam_subtitle: 'Test your knowledge in real conditions',
            exam_setup_title: 'JLPT Exam Simulator',
            exam_setup_desc: 'Test your knowledge under real exam conditions',
            exam_type_complete: 'Full exam',
            exam_type_complete_desc: 'Kanji, vocabulary, grammar, reading',
            exam_type_kanji: 'Kanji only',
            exam_type_kanji_desc: 'Reading and meaning of kanji',
            exam_type_grammar: 'Grammar only',
            exam_type_grammar_desc: 'Structures and particles',
            exam_type_vocab: 'Vocabulary only',
            exam_type_vocab_desc: 'Meaning and reading',
            exam_questions: 'Number of questions:',
            exam_timer: 'Timer:',
            exam_no_limit: 'No limit',
            exam_start: 'Start the exam',
            exam_current_level: 'Current level:',
            exam_finish: 'Finish',
            exam_confirm_finish: 'Are you sure you want to finish the exam?',
            exam_submit: 'See results',
            exam_question: 'Question',
            exam_q_kanji: 'Kanji',
            exam_q_grammar: 'Grammar',
            exam_q_vocab: 'Vocabulary',
            exam_kanji_meaning: 'What is the meaning of the kanji',
            exam_kanji_reading: 'What is the reading of the kanji',
            exam_grammar_meaning: 'What does the structure mean',
            exam_vocab_meaning: 'What does',
            exam_result_excellent: 'Excellent! You are ready for the exam!',
            exam_result_good: 'Good! A little more practice and you\'re set!',
            exam_result_ok: 'Not bad, but keep reviewing.',
            exam_result_bad: 'Keep working. Don\'t give up!',
            exam_duration: 'Duration:',
            exam_retry: 'Retake an exam',
            exam_review: 'Review mistakes',
            exam_perfect: 'Perfect! No mistakes!',
            exam_review_title: 'Error review',
            exam_your_answer: 'Your answer:',
            exam_no_answer: '(no answer)',
            exam_correct_answer: 'Correct answer:',
            exam_back_results: 'Back to results',

            // -- Profile --
            profile_title: 'Profile',
            profile_subtitle: 'Manage your preferences',
            profile_language: 'Interface language',
            profile_language_desc: 'Choose the language in which the application will be displayed.',
            profile_lang_fr: 'Francais',
            profile_lang_en: 'English',
            profile_saved: 'Preferences saved!',
            profile_reset_title: 'Reset progress',
            profile_reset_desc: 'Delete all your local progress data.',
            profile_reset_btn: 'Reset',
            profile_reset_confirm: 'Are you sure? All your local progress will be lost.',
            profile_reset_done: 'Progress reset.',

            profile_account: 'Account',
            profile_not_connected: 'Not signed in',
            profile_not_connected_desc: 'Sign in to save your progress across all your devices.',
            profile_connect_btn: 'Sign in',
            profile_name: 'Name',
            profile_email: 'Email',
            profile_provider: 'Signed in via',
            profile_member_since: 'Member since',
            profile_logout: 'Sign out',

            profile_stats: 'Statistics',
            profile_stats_studied: 'Items studied',
            profile_stats_mastered: 'Items mastered',
            profile_stats_accuracy: 'Accuracy',
            profile_stats_streak: 'Current streak',

            // -- Admin --
            nav_admin: 'Admin',
            admin_title: 'Administration',
            admin_subtitle: 'Users overview',
            admin_no_access: 'Access denied. You are not an administrator.',
            admin_loading: 'Loading users...',
            admin_error_load: 'Error loading users.',
            admin_total_users: 'Users',
            admin_active_today: 'Active today',
            admin_avg_accuracy: 'Avg. accuracy',
            admin_avg_streak: 'Avg. streak',
            admin_search: 'Search a user...',
            admin_refresh: 'Refresh',
            admin_col_user: 'User',
            admin_col_studied: 'Studied',
            admin_col_mastered: 'Mastered',
            admin_col_accuracy: 'Accuracy',
            admin_col_streak: 'Streak',
            admin_col_last_sync: 'Last sync',
            admin_col_details: 'Details',
            admin_no_users: 'No users found.',
            admin_view: 'View',
            admin_progress_detail: 'Detailed progress',
            admin_items: 'items',
            admin_last_study: 'Last study',
            admin_today: 'Today'
        }
    },

    init() {
        const saved = localStorage.getItem('nihongo_locale');
        if (saved && this.translations[saved]) {
            this._locale = saved;
        }
        this.applyToDOM();
    },

    get locale() {
        return this._locale;
    },

    setLocale(locale) {
        if (!this.translations[locale]) return;
        this._locale = locale;
        localStorage.setItem('nihongo_locale', locale);
        this.applyToDOM();
    },

    t(key, params) {
        const val = this.translations[this._locale]?.[key]
                 || this.translations.fr[key]
                 || key;
        if (!params) return val;
        return val.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? _);
    },

    applyToDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });
    }
};
