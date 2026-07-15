// ========================================
// Main App - Routing, Dashboard, Init
// ========================================

window.App = {
    currentPage: 'dashboard',

    init() {
        I18n.init();

        this.bindNavigation();
        this.bindLevelSelector();
        this.bindMobileMenu();
        this.bindModal();
        this.bindAuth();

        // Initialize modules
        KanaModule.init();
        KanjiModule.init();
        GrammarModule.init();
        VocabModule.init();
        ExamModule.init();

        // Initialize auth & sync
        Auth.init();
        Sync.init();

        // Update streak
        Storage.updateStreak();
        this.updateDashboard();
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

        // Update nav
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');

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
        if (page === 'exam') ExamModule.render();
        if (page === 'profile') this.renderProfile();
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
            const counts = {
                kana: reviews.kana.length,
                kanji: reviews.kanji.length,
                grammar: reviews.grammar.length,
                vocabulary: reviews.vocab.length
            };
            const maxCat = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
            this.navigateTo(maxCat);
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
                <div class="profile-section">
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
                <div class="profile-section">
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
            <div class="profile-section">
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

        container.innerHTML = `
            ${accountHtml}
            ${statsHtml}
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

        // Bind events
        container.querySelectorAll('.lang-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                I18n.setLocale(lang);
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
        // Re-apply i18n to all static DOM elements
        I18n.applyToDOM();
    }
};

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
