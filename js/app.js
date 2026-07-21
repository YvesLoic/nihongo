// ========================================
// Main App - Routing, Dashboard, Init
// ========================================

window.App = {
    currentPage: 'dashboard',

    init() {
        I18n.init();
        this.applyTheme();

        this.bindNavigation();
        this.bindMobileMenu();
        this.bindModal();
        this.bindAuth();

        // Initialize modules
        KanaModule.init();
        KanjiModule.init();
        GrammarModule.init();
        VocabModule.init();
        ReadingModule.init();
        ExamModule.init();
        ConjugationModule.init();
        ListeningModule.init();
        SentenceModule.init();
        SRS.init();
        Badges.init();

        // Initialize auth, sync & admin
        Auth.init();
        Sync.init();
        AdminModule.init();

        // Update streak
        Storage.updateStreak();
        this.updateDashboard();
        this.showOnboarding();
        this.initNotifications();
        this.updateBadges();
    },

    // ---- Auth binding ----
    bindAuth() {
        document.getElementById('btn-open-auth')?.addEventListener('click', () => {
            Auth.showAuthModal();
        });
    },

    // ---- Navigation ----
    bindNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });
    },

    navigateTo(page) {
        this.currentPage = page;

        // Update sidebar nav
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');

        // Update bottom nav + "Plus" menu
        document.querySelectorAll('.bottom-nav-item').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.bottom-nav-menu-item').forEach(n => n.classList.remove('active'));
        const directBtn = document.querySelector(`.bottom-nav-item[data-page="${page}"]`);
        const menuBtn = document.querySelector(`.bottom-nav-menu-item[data-page="${page}"]`);
        if (directBtn) {
            directBtn.classList.add('active');
        } else if (menuBtn) {
            menuBtn.classList.add('active');
            document.getElementById('bottom-nav-more')?.classList.add('active');
        }

        // Update pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`)?.classList.add('active');

        // Close mobile menu
        document.getElementById('sidebar')?.classList.remove('open');

        // Refresh page content
        if (page === 'dashboard') this.updateDashboard();
        if (page === 'kana') KanaModule.render();
        if (page === 'kanji') KanjiModule.render();
        if (page === 'grammar') GrammarModule.render();
        if (page === 'vocabulary') VocabModule.render();
        if (page === 'reading') ReadingModule.render();
        if (page === 'conjugation') ConjugationModule.render();
        if (page === 'listening') ListeningModule.render();
        if (page === 'sentence') SentenceModule.render();
        if (page === 'games') GamesModule.render();
        if (page === 'dialogues') DialoguesModule.render();
        if (page === 'culture') CultureModule.render();
        if (page === 'exam') ExamModule.render();
        if (page === 'profile') this.renderProfile();
        if (page === 'admin') AdminModule.render();
    },

    // ---- Level Selector ----
    bindLevelSelector() {
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                LevelFilter.set(btn.dataset.level);

                // Reset module states that depend on level
                KanjiModule.flashcardList = [];
                KanjiModule.quizState = null;
                VocabModule.flashcardList = [];
                VocabModule.quizState = null;
                VocabModule.currentTheme = null;
                GrammarModule.exerciseState = null;

                // Re-render current page
                this.navigateTo(this.currentPage);
                this.updateBadges();
            });
        });
    },

    // ---- Mobile Menu ----
    bindMobileMenu() {
        const toggle = document.getElementById('mobile-toggle');
        const sidebar = document.getElementById('sidebar');

        toggle?.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close on content click on mobile
        document.getElementById('main-content')?.addEventListener('click', () => {
            sidebar?.classList.remove('open');
        });

        // Bottom navigation bar
        const moreBtn = document.getElementById('bottom-nav-more');
        const moreMenu = document.getElementById('bottom-nav-menu');
        const moreOverlay = document.getElementById('bottom-nav-overlay');

        const closeMoreMenu = () => {
            moreMenu?.classList.remove('open');
            moreOverlay?.classList.remove('open');
            moreBtn?.classList.remove('active');
        };

        // Direct nav items
        document.querySelectorAll('.bottom-nav-item[data-page]').forEach(item => {
            item.addEventListener('click', () => {
                closeMoreMenu();
                this.navigateTo(item.dataset.page);
            });
        });

        // "Plus" button toggles menu
        moreBtn?.addEventListener('click', () => {
            const isOpen = moreMenu.classList.contains('open');
            if (isOpen) {
                closeMoreMenu();
            } else {
                moreMenu.classList.add('open');
                moreOverlay.classList.add('open');
                moreBtn.classList.add('active');
            }
        });

        // Menu items navigate and close
        document.querySelectorAll('.bottom-nav-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                closeMoreMenu();
                this.navigateTo(item.dataset.page);
            });
        });

        // Tap overlay to close
        moreOverlay?.addEventListener('click', closeMoreMenu);
    },

    // ---- Modal ----
    bindModal() {
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.getElementById('modal-close');

        closeBtn?.addEventListener('click', () => this.hideModal());
        overlay?.addEventListener('click', (e) => {
            if (e.target === overlay) this.hideModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.hideModal();
        });
    },

    showModal(content) {
        document.getElementById('modal-content').innerHTML = content;
        document.getElementById('modal-overlay').classList.add('show');
    },

    hideModal() {
        document.getElementById('modal-overlay').classList.remove('show');
    },

    // ---- Toast ----
    toast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    },

    // ---- Dashboard ----
    updateDashboard() {
        const p = Storage.getProgress();

        // Stats
        document.getElementById('stat-today').textContent = p.studiedToday || 0;
        document.getElementById('stat-mastered').textContent = Storage.getTotalMastered();
        document.getElementById('stat-streak').textContent = p.streak || 0;
        document.getElementById('stat-accuracy').textContent = Storage.getAccuracy() + '%';
        document.getElementById('streak-count').textContent = p.streak || 0;

        // Progress bars
        const totalKana = 46 * 2 + 25 * 2 + 33 * 2; // basic + dakuten + combo for both
        const totalKanji = AppData.kanjiN5.length + AppData.kanjiN4.length;
        const totalGrammar = AppData.grammarN5.length + AppData.grammarN4.length;
        const totalVocab = [...AppData.vocabN5, ...AppData.vocabN4].reduce((sum, t) => sum + t.words.length, 0);

        const kPct = Storage.getCategoryProgress('kana', totalKana);
        const kjPct = Storage.getCategoryProgress('kanji', totalKanji);
        const gPct = Storage.getCategoryProgress('grammar', totalGrammar);
        const vPct = Storage.getCategoryProgress('vocab', totalVocab);

        this.setProgress('kana', kPct);
        this.setProgress('kanji', kjPct);
        this.setProgress('grammar', gPct);
        this.setProgress('vocab', vPct);

        // Review list
        this.updateReviewList();
        this.updateBadges();

        // SRS widget
        const srsArea = document.getElementById('srs-widget-area');
        if (srsArea) srsArea.innerHTML = SRS.renderWidget();

        // Goals widget
        const goalsArea = document.getElementById('goals-widget-area');
        if (goalsArea) {
            const studied = p.studiedToday || 0;
            const kanjiCount = Object.keys(p.kanji || {}).length;
            goalsArea.innerHTML = `
                <div class="goals-widget">
                    <h3>${I18n.t('goals_title')}</h3>
                    <div class="goal-item">
                        <span class="goal-label">${I18n.t('goals_words')}</span>
                        <div class="goal-bar"><div class="goal-fill" style="width:${Math.min(100, studied * 10)}%"></div></div>
                        <span class="goal-value">${studied}/10</span>
                    </div>
                    <div class="goal-item">
                        <span class="goal-label">${I18n.t('goals_kanji')}</span>
                        <div class="goal-bar"><div class="goal-fill" style="width:${Math.min(100, (p.kanjiToday || 0) * 20)}%"></div></div>
                        <span class="goal-value">${p.kanjiToday || 0}/5</span>
                    </div>
                </div>`;
        }

        // Word of the day
        const wodArea = document.getElementById('wod-widget-area');
        if (wodArea) wodArea.innerHTML = GamesModule.renderWordOfDay();

        // Calendar
        const calArea = document.getElementById('calendar-widget-area');
        if (calArea) calArea.innerHTML = this.renderCalendar();

        // Weak points
        const wpArea = document.getElementById('weakpoints-widget-area');
        if (wpArea) {
            const weak = this.getWeakPoints();
            wpArea.innerHTML = weak.length === 0
                ? `<div class="srs-widget"><div class="srs-widget-icon">✅</div><div class="srs-widget-text">${I18n.t('weakpoints_none')}</div></div>`
                : `<div style="padding:16px;"><h3 style="margin-bottom:12px;">${I18n.t('weakpoints_title')}</h3>
                    ${weak.map(w => `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border); font-size:13px;">
                        <span>${w.id}</span><span style="color:var(--danger);">${w.rate}%</span>
                    </div>`).join('')}</div>`;
        }

        // Stats chart (last 7 days)
        const statsArea = document.getElementById('stats-widget-area');
        if (statsArea) {
            const daily = JSON.parse(localStorage.getItem('nihongo_daily_stats') || '{}');
            const days = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date(Date.now() - i * 86400000);
                const key = d.toISOString().slice(0, 10);
                const label = d.toLocaleDateString(I18n.locale === 'en' ? 'en' : 'fr', { weekday: 'short' });
                days.push({ label, studied: daily[key]?.studied || 0 });
            }
            const max = Math.max(1, ...days.map(d => d.studied));
            statsArea.innerHTML = `<div style="padding:16px;"><h3 style="margin-bottom:16px;">${I18n.t('stats_title')}</h3>
                <div class="stats-bars">${days.map(d => `<div class="stats-bar-col">
                    <div class="stats-bar" style="height:${Math.round(d.studied/max*100)}%"></div>
                    <div class="stats-bar-label">${d.label}</div>
                    <div class="stats-bar-value">${d.studied}</div>
                </div>`).join('')}</div></div>`;
        }

        // Badges widget
        const badgesArea = document.getElementById('badges-widget-area');
        if (badgesArea) {
            Badges.checkAll();
            badgesArea.innerHTML = Badges.renderWidget();
        }
    },

    setProgress(name, pct) {
        const fill = document.getElementById(`fill-${name}`);
        const label = document.getElementById(`prog-${name}`);
        if (fill) fill.style.width = pct + '%';
        if (label) label.textContent = pct + '%';
    },

    updateBadges() {
        const totalKana = 46 * 2 + 25 * 2 + 33 * 2;
        const totalKanji = AppData.kanjiN5.length + AppData.kanjiN4.length;
        const totalGrammar = AppData.grammarN5.length + AppData.grammarN4.length;
        const totalVocab = [...AppData.vocabN5, ...AppData.vocabN4].reduce((sum, t) => sum + t.words.length, 0);

        document.getElementById('kana-badge').textContent = Storage.getCategoryProgress('kana', totalKana) + '%';
        document.getElementById('kanji-badge').textContent = Storage.getCategoryProgress('kanji', totalKanji) + '%';
        document.getElementById('grammar-badge').textContent = Storage.getCategoryProgress('grammar', totalGrammar) + '%';
        document.getElementById('vocab-badge').textContent = Storage.getCategoryProgress('vocab', totalVocab) + '%';
    },

    updateReviewList() {
        const reviews = Storage.getAllDueReviews();
        const container = document.getElementById('review-list');
        const btn = document.getElementById('btn-start-review');
        const allDue = [...reviews.kana, ...reviews.kanji, ...reviews.grammar, ...reviews.vocab];

        if (allDue.length === 0) {
            container.innerHTML = `<p class="empty-state">${I18n.t('dash_no_review')}</p>`;
            btn.style.display = 'none';
            return;
        }

        const items = allDue.slice(0, 10);
        container.innerHTML = items.map(r => {
            const typeLabel = reviews.kana.includes(r) ? I18n.t('dash_type_kana') :
                              reviews.kanji.includes(r) ? I18n.t('dash_type_kanji') :
                              reviews.grammar.includes(r) ? I18n.t('dash_type_grammar') : I18n.t('dash_type_vocab');
            return `
                <div class="review-item">
                    <span class="review-item-char">${r.id}</span>
                    <span class="review-item-info">${typeLabel} - ${I18n.t('dash_level_prefix')} ${r.level}/5</span>
                </div>`;
        }).join('');

        if (allDue.length > 10) {
            container.innerHTML += `<p style="text-align:center; color:var(--text-muted); font-size:13px;">${I18n.t('dash_and_more', {n: allDue.length - 10})}</p>`;
        }

        btn.style.display = 'inline-flex';
        btn.textContent = `${I18n.t('dash_start_review')} (${allDue.length})`;
        btn.onclick = () => {
            // Navigate to the category with most due reviews and start its flashcard/quiz mode
            const counts = {
                kana: reviews.kana.length,
                kanji: reviews.kanji.length,
                grammar: reviews.grammar.length,
                vocab: reviews.vocab.length
            };
            const maxCat = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

            if (maxCat === 'kanji') {
                KanjiModule.currentTab = 'kanji-flashcard';
                document.querySelectorAll('.kanji-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.kanji-tabs .tab-btn[data-tab="kanji-flashcard"]')?.classList.add('active');
                this.navigateTo('kanji');
            } else if (maxCat === 'vocab') {
                VocabModule.currentTab = 'vocab-flashcard';
                document.querySelectorAll('.vocab-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.vocab-tabs .tab-btn[data-tab="vocab-flashcard"]')?.classList.add('active');
                this.navigateTo('vocabulary');
            } else if (maxCat === 'grammar') {
                GrammarModule.currentTab = 'grammar-exercises';
                document.querySelectorAll('.grammar-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.grammar-tabs .tab-btn[data-tab="grammar-exercises"]')?.classList.add('active');
                this.navigateTo('grammar');
            } else if (maxCat === 'kana') {
                KanaModule.currentTab = 'kana-quiz';
                document.querySelectorAll('.kana-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelector('.kana-tabs .tab-btn[data-tab="kana-quiz"]')?.classList.add('active');
                this.navigateTo('kana');
            }
        };
    },

    // ---- Profile Page ----
    renderProfile() {
        const container = document.getElementById('profile-content');
        const currentLocale = I18n.locale;
        const user = Auth.currentUser;
        const progress = Storage.getProgress();

        // Calculate stats
        const totalStudied = Object.keys(progress.kana || {}).length +
                             Object.keys(progress.kanji || {}).length +
                             Object.keys(progress.grammar || {}).length +
                             Object.keys(progress.vocab || {}).length;
        const totalMastered = Storage.getTotalMastered();
        const accuracy = Storage.getAccuracy();
        const streak = progress.streak || 0;

        // User account section
        let accountHtml = '';
        if (user) {
            const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
            const avatarContent = user.photoURL
                ? `<img src="${user.photoURL}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`
                : initial;
            const provider = user.providerData?.[0]?.providerId === 'google.com' ? 'Google' : 'Email';
            const createdAt = user.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString(currentLocale === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
                : '-';

            accountHtml = `
                <div class="profile-section full-width">
                    <div class="profile-section-title">${I18n.t('profile_account')}</div>
                    <div class="profile-user-card">
                        <div class="profile-avatar">${avatarContent}</div>
                        <div class="profile-user-info">
                            <div class="profile-user-name">${user.displayName || '-'}</div>
                            <div class="profile-user-email">${user.email}</div>
                        </div>
                    </div>
                    <div class="profile-details">
                        <div class="profile-detail-row">
                            <span class="profile-detail-label">${I18n.t('profile_name')}</span>
                            <span class="profile-detail-value">${user.displayName || '-'}</span>
                        </div>
                        <div class="profile-detail-row">
                            <span class="profile-detail-label">${I18n.t('profile_email')}</span>
                            <span class="profile-detail-value">${user.email}</span>
                        </div>
                        <div class="profile-detail-row">
                            <span class="profile-detail-label">${I18n.t('profile_provider')}</span>
                            <span class="profile-detail-value">${provider}</span>
                        </div>
                        <div class="profile-detail-row">
                            <span class="profile-detail-label">${I18n.t('profile_member_since')}</span>
                            <span class="profile-detail-value">${createdAt}</span>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm" id="profile-logout" style="margin-top:16px;">${I18n.t('profile_logout')}</button>
                </div>`;
        } else {
            accountHtml = `
                <div class="profile-section full-width">
                    <div class="profile-section-title">${I18n.t('profile_account')}</div>
                    <div class="profile-not-connected">
                        <div class="profile-not-connected-icon">&#x1F464;</div>
                        <div class="profile-not-connected-text">${I18n.t('profile_not_connected')}</div>
                        <div class="profile-section-desc">${I18n.t('profile_not_connected_desc')}</div>
                        <button class="btn btn-primary" id="profile-connect">${I18n.t('profile_connect_btn')}</button>
                    </div>
                </div>`;
        }

        // Stats section
        const statsHtml = `
            <div class="profile-section full-width">
                <div class="profile-section-title">${I18n.t('profile_stats')}</div>
                <div class="profile-stats-grid">
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${totalStudied}</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_studied')}</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${totalMastered}</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_mastered')}</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${accuracy}%</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_accuracy')}</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${streak}</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_streak')}</div>
                    </div>
                </div>
            </div>`;

        const currentLevel = LevelFilter.get();
        const levelHtml = `
            <div class="profile-section">
                <div class="profile-section-title">${I18n.t('profile_level')}</div>
                <div class="profile-section-desc">${I18n.t('profile_level_desc')}</div>
                <div class="level-selector">
                    <button class="level-btn ${currentLevel === 'N5' ? 'active' : ''}" data-level="N5">N5</button>
                    <button class="level-btn ${currentLevel === 'N4' ? 'active' : ''}" data-level="N4">N4</button>
                    <button class="level-btn ${currentLevel === 'all' ? 'active' : ''}" data-level="all">${I18n.t('level_all')}</button>
                </div>
            </div>`;

        const furiganaHtml = `
            <div class="profile-section">
                <div class="profile-section-title">${I18n.t('profile_furigana')}</div>
                <div class="profile-section-desc">${I18n.t('profile_furigana_desc')}</div>
                <div class="lang-options">
                    <button class="lang-option furigana-opt ${Furigana.enabled ? 'active' : ''}" data-furigana="on">
                        ${I18n.t('profile_furigana_on')}
                    </button>
                    <button class="lang-option furigana-opt ${!Furigana.enabled ? 'active' : ''}" data-furigana="off">
                        ${I18n.t('profile_furigana_off')}
                    </button>
                </div>
            </div>`;

        container.innerHTML = `
            ${accountHtml}
            ${statsHtml}
            ${levelHtml}
            ${furiganaHtml}
            <div class="profile-section">
                <div class="profile-section-title">${I18n.t('profile_theme')}</div>
                <div class="profile-section-desc">${I18n.t('profile_theme_desc')}</div>
                <div class="lang-options">
                    <button class="lang-option theme-opt ${this.getTheme() === 'dark' ? 'active' : ''}" data-theme="dark">${I18n.t('profile_theme_dark')}</button>
                    <button class="lang-option theme-opt ${this.getTheme() === 'light' ? 'active' : ''}" data-theme="light">${I18n.t('profile_theme_light')}</button>
                </div>
            </div>
            <div class="profile-section">
                <div class="profile-section-title">${I18n.t('notif_enable')}</div>
                <button class="btn btn-secondary" id="profile-notif">${I18n.t('notif_enable')}</button>
            </div>
            <div class="profile-section">
                <div class="profile-section-title">${I18n.t('profile_language')}</div>
                <div class="profile-section-desc">${I18n.t('profile_language_desc')}</div>
                <div class="lang-options">
                    <button class="lang-option ${currentLocale === 'fr' ? 'active' : ''}" data-lang="fr">
                        <span class="lang-flag">FR</span>
                        ${I18n.t('profile_lang_fr')}
                    </button>
                    <button class="lang-option ${currentLocale === 'en' ? 'active' : ''}" data-lang="en">
                        <span class="lang-flag">EN</span>
                        ${I18n.t('profile_lang_en')}
                    </button>
                </div>
            </div>
            <div class="profile-section">
                <div class="profile-section-title">${I18n.t('profile_reset_title')}</div>
                <div class="profile-section-desc">${I18n.t('profile_reset_desc')}</div>
                <button class="btn btn-danger" id="profile-reset">${I18n.t('profile_reset_btn')}</button>
            </div>`;

        // Bind theme toggle
        container.querySelectorAll('.theme-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.theme-opt').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.setTheme(btn.dataset.theme);
            });
        });

        // Bind notifications
        document.getElementById('profile-notif')?.addEventListener('click', () => {
            if ('Notification' in window) {
                Notification.requestPermission().then(p => {
                    if (p === 'granted') {
                        localStorage.setItem('nihongo_notif', 'on');
                        App.toast(I18n.t('notif_enabled'), 'success');
                    } else {
                        App.toast(I18n.t('notif_denied'), 'error');
                    }
                });
            }
        });

        // Bind furigana toggle
        container.querySelectorAll('.furigana-opt').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.furigana-opt').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Furigana.enabled = btn.dataset.furigana === 'on';
                App.toast(I18n.t('profile_saved'), 'success');
            });
        });

        // Bind level selector
        container.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                LevelFilter.set(btn.dataset.level);

                // Reset module states that depend on level
                KanjiModule.flashcardList = [];
                KanjiModule.quizState = null;
                VocabModule.flashcardList = [];
                VocabModule.quizState = null;
                VocabModule.currentTheme = null;
                GrammarModule.exerciseState = null;

                this.navigateTo(this.currentPage);
                this.updateBadges();
            });
        });

        // Bind events
        container.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                I18n.setLocale(lang);
                // Sync locale to cloud if logged in
                if (Auth.currentUser) {
                    Sync.pushToCloud(true);
                }
                App.toast(I18n.t('profile_saved'), 'success');
                this.renderProfile();
                this.refreshAllModules();
            });
        });

        document.getElementById('profile-reset')?.addEventListener('click', () => {
            if (confirm(I18n.t('profile_reset_confirm'))) {
                Storage.resetProgress();
                this.updateDashboard();
                this.updateBadges();
                this.renderProfile();
                App.toast(I18n.t('profile_reset_done'), 'success');
            }
        });

        document.getElementById('profile-connect')?.addEventListener('click', () => {
            Auth.showAuthModal();
        });

        document.getElementById('profile-logout')?.addEventListener('click', () => {
            Auth.logout().then(() => {
                this.renderProfile();
            });
        });
    },

    refreshAllModules() {
        I18n.applyToDOM();
    },

    // ---- Theme ----
    getTheme() { return localStorage.getItem('nihongo_theme') || 'dark'; },
    setTheme(theme) {
        localStorage.setItem('nihongo_theme', theme);
        this.applyTheme();
    },
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.getTheme());
    },

    // ---- Onboarding ----
    showOnboarding() {
        if (localStorage.getItem('nihongo_onboarded')) return;
        const overlay = document.getElementById('onboarding-overlay');
        if (!overlay) return;
        overlay.style.display = 'flex';
        document.getElementById('onboarding-title').textContent = I18n.t('onboarding_welcome');
        document.getElementById('onboarding-desc').textContent = I18n.t('onboarding_desc');
        document.getElementById('onboarding-steps').innerHTML = `
            <div class="onboarding-step"><span>📚</span><span>${I18n.t('onboarding_step1')}</span></div>
            <div class="onboarding-step"><span>🎯</span><span>${I18n.t('onboarding_step2')}</span></div>
            <div class="onboarding-step"><span>📝</span><span>${I18n.t('onboarding_step3')}</span></div>`;
        const btn = document.getElementById('onboarding-start');
        btn.textContent = I18n.t('onboarding_start');
        btn.addEventListener('click', () => {
            localStorage.setItem('nihongo_onboarded', '1');
            overlay.style.display = 'none';
        });
    },

    // ---- Notifications ----
    initNotifications() {
        if (localStorage.getItem('nihongo_notif') !== 'on') return;
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        // Schedule daily reminder check
        const lastNotif = localStorage.getItem('nihongo_last_notif');
        const today = new Date().toISOString().slice(0, 10);
        if (lastNotif === today) return;
        // Send after 1 minute if not studied today
        setTimeout(() => {
            const p = Storage.getProgress();
            if ((p.studiedToday || 0) === 0) {
                new Notification(I18n.t('notif_title'), { body: I18n.t('notif_body'), icon: 'icon.svg' });
                localStorage.setItem('nihongo_last_notif', today);
            }
        }, 60000);
    },

    // ---- Weak Points ----
    getWeakPoints() {
        const p = Storage.getProgress();
        const weak = [];
        ['kanji','vocab','grammar','kana'].forEach(cat => {
            if (!p[cat]) return;
            Object.entries(p[cat]).forEach(([id, item]) => {
                if (item.correct !== undefined && item.total !== undefined) {
                    const rate = item.total > 0 ? item.correct / item.total : 0;
                    if (rate < 0.5 && item.total >= 2) weak.push({ cat, id, rate: Math.round(rate * 100), total: item.total });
                } else if (item.level !== undefined && item.level <= 1 && item.reviews > 1) {
                    weak.push({ cat, id, rate: 0, total: item.reviews || 0 });
                }
            });
        });
        return weak.sort((a, b) => a.rate - b.rate).slice(0, 15);
    },

    // ---- Study Calendar ----
    renderCalendar() {
        const history = JSON.parse(localStorage.getItem('nihongo_study_days') || '[]');
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const monthNames = I18n.locale === 'en'
            ? ['January','February','March','April','May','June','July','August','September','October','November','December']
            : ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];

        let cells = '';
        for (let i = 0; i < firstDay; i++) cells += '<div class="cal-cell empty"></div>';
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const isToday = d === today.getDate();
            const studied = history.includes(dateStr);
            cells += `<div class="cal-cell ${studied ? 'studied' : ''} ${isToday ? 'today' : ''}">${d}</div>`;
        }

        return `<div class="calendar-widget">
            <h3>${I18n.t('calendar_title')} — ${monthNames[month]} ${year}</h3>
            <div class="cal-grid">
                <div class="cal-header">${(I18n.locale==='en'?'SMTWTFS':'DLMMJVS').split('').map(d=>'<div>'+d+'</div>').join('')}</div>
                <div class="cal-days">${cells}</div>
            </div>
        </div>`;
    }
};

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
    App.init();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }
});
