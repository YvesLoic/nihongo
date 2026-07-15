// ========================================
// Admin Dashboard Module
// ========================================

window.AdminModule = {
    users: [],
    loaded: false,
    sortField: 'lastSync',
    sortAsc: false,
    searchQuery: '',

    // Define admin emails here
    ADMIN_EMAILS: [
        'loicyves45@gmail.com'
    ],

    isAdmin() {
        const user = Auth.currentUser;
        if (!user) return false;
        return this.ADMIN_EMAILS.includes(user.email);
    },

    init() {
        // Show/hide admin nav based on role
        Auth.onAuthChanged(() => this.updateNavVisibility());
    },

    updateNavVisibility() {
        const navItem = document.querySelector('.nav-item[data-page="admin"]');
        if (navItem) {
            navItem.style.display = this.isAdmin() ? '' : 'none';
        }
    },

    async loadUsers() {
        if (!this.isAdmin()) return;

        try {
            const snapshot = await firebaseDb.collection('users').get();
            this.users = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                const progress = data.progress || {};

                // Calculate stats from progress
                const kanaCount = Object.keys(progress.kana || {}).length;
                const kanjiCount = Object.keys(progress.kanji || {}).length;
                const grammarCount = Object.keys(progress.grammar || {}).length;
                const vocabCount = Object.keys(progress.vocab || {}).length;
                const totalStudied = kanaCount + kanjiCount + grammarCount + vocabCount;

                const kanaM = Object.values(progress.kana || {}).filter(i => i.level >= 4).length;
                const kanjiM = Object.values(progress.kanji || {}).filter(i => i.level >= 4).length;
                const grammarM = Object.values(progress.grammar || {}).filter(i => i.level >= 4).length;
                const vocabM = Object.values(progress.vocab || {}).filter(i => i.level >= 4).length;
                const totalMastered = kanaM + kanjiM + grammarM + vocabM;

                const accuracy = progress.totalAttempts > 0
                    ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
                    : 0;

                const lastSync = data.lastSync?.toDate?.() || null;

                this.users.push({
                    uid: doc.id,
                    displayName: data.displayName || '-',
                    email: data.email || '-',
                    lastSync,
                    streak: progress.streak || 0,
                    studiedToday: progress.studiedToday || 0,
                    lastStudyDate: progress.lastStudyDate || '-',
                    totalStudied,
                    totalMastered,
                    accuracy,
                    kana: kanaCount,
                    kanji: kanjiCount,
                    grammar: grammarCount,
                    vocab: vocabCount,
                    kanaM, kanjiM, grammarM, vocabM
                });
            });

            this.loaded = true;
        } catch (error) {
            console.error('Admin: error loading users', error);
            App.toast(I18n.t('admin_error_load'), 'error');
        }
    },

    async render() {
        const container = document.getElementById('admin-content');
        if (!container) return;

        if (!this.isAdmin()) {
            container.innerHTML = `<div class="empty-state">${I18n.t('admin_no_access')}</div>`;
            return;
        }

        if (!this.loaded) {
            container.innerHTML = `<div class="admin-loading">${I18n.t('admin_loading')}</div>`;
            await this.loadUsers();
        }

        this.renderDashboard(container);
    },

    renderDashboard(container) {
        const users = this.getFilteredSortedUsers();

        // Global stats
        const totalUsers = this.users.length;
        const activeToday = this.users.filter(u => u.lastStudyDate === new Date().toISOString().slice(0, 10)).length;
        const avgAccuracy = totalUsers > 0
            ? Math.round(this.users.reduce((s, u) => s + u.accuracy, 0) / totalUsers)
            : 0;
        const avgStreak = totalUsers > 0
            ? Math.round(this.users.reduce((s, u) => s + u.streak, 0) / totalUsers * 10) / 10
            : 0;

        container.innerHTML = `
            <div class="admin-stats-grid">
                <div class="admin-stat-card">
                    <div class="admin-stat-value">${totalUsers}</div>
                    <div class="admin-stat-label">${I18n.t('admin_total_users')}</div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-value">${activeToday}</div>
                    <div class="admin-stat-label">${I18n.t('admin_active_today')}</div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-value">${avgAccuracy}%</div>
                    <div class="admin-stat-label">${I18n.t('admin_avg_accuracy')}</div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-value">${avgStreak}</div>
                    <div class="admin-stat-label">${I18n.t('admin_avg_streak')}</div>
                </div>
            </div>

            <div class="admin-toolbar">
                <input type="text" class="search-input" id="admin-search"
                       placeholder="${I18n.t('admin_search')}" value="${this.searchQuery}">
                <button class="btn btn-secondary btn-sm" id="admin-refresh">${I18n.t('admin_refresh')}</button>
            </div>

            <div class="admin-table-wrap">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th class="admin-sortable" data-sort="displayName">${I18n.t('admin_col_user')} ${this.getSortIcon('displayName')}</th>
                            <th class="admin-sortable" data-sort="totalStudied">${I18n.t('admin_col_studied')} ${this.getSortIcon('totalStudied')}</th>
                            <th class="admin-sortable" data-sort="totalMastered">${I18n.t('admin_col_mastered')} ${this.getSortIcon('totalMastered')}</th>
                            <th class="admin-sortable" data-sort="accuracy">${I18n.t('admin_col_accuracy')} ${this.getSortIcon('accuracy')}</th>
                            <th class="admin-sortable" data-sort="streak">${I18n.t('admin_col_streak')} ${this.getSortIcon('streak')}</th>
                            <th class="admin-sortable" data-sort="lastSync">${I18n.t('admin_col_last_sync')} ${this.getSortIcon('lastSync')}</th>
                            <th>${I18n.t('admin_col_details')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.length === 0
                            ? `<tr><td colspan="7" class="admin-empty">${I18n.t('admin_no_users')}</td></tr>`
                            : users.map(u => this.renderUserRow(u)).join('')}
                    </tbody>
                </table>
            </div>`;

        // Bind events
        document.getElementById('admin-search')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.renderDashboard(container);
        });

        document.getElementById('admin-refresh')?.addEventListener('click', async () => {
            this.loaded = false;
            await this.render();
        });

        container.querySelectorAll('.admin-sortable').forEach(th => {
            th.addEventListener('click', () => {
                const field = th.dataset.sort;
                if (this.sortField === field) {
                    this.sortAsc = !this.sortAsc;
                } else {
                    this.sortField = field;
                    this.sortAsc = false;
                }
                this.renderDashboard(container);
            });
        });

        container.querySelectorAll('.admin-detail-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const uid = btn.dataset.uid;
                const user = this.users.find(u => u.uid === uid);
                if (user) this.showUserDetail(user);
            });
        });
    },

    renderUserRow(u) {
        const lastSyncStr = u.lastSync
            ? u.lastSync.toLocaleDateString(I18n.locale === 'en' ? 'en-US' : 'fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
            : '-';

        const initial = (u.displayName !== '-' ? u.displayName : u.email)[0].toUpperCase();

        return `
            <tr>
                <td>
                    <div class="admin-user-cell">
                        <div class="admin-user-avatar">${initial}</div>
                        <div>
                            <div class="admin-user-name">${u.displayName}</div>
                            <div class="admin-user-email">${u.email}</div>
                        </div>
                    </div>
                </td>
                <td class="admin-num">${u.totalStudied}</td>
                <td class="admin-num">${u.totalMastered}</td>
                <td class="admin-num">${u.accuracy}%</td>
                <td class="admin-num">${u.streak}</td>
                <td class="admin-date">${lastSyncStr}</td>
                <td><button class="btn btn-secondary btn-sm admin-detail-btn" data-uid="${u.uid}">${I18n.t('admin_view')}</button></td>
            </tr>`;
    },

    showUserDetail(u) {
        const lastSyncStr = u.lastSync
            ? u.lastSync.toLocaleDateString(I18n.locale === 'en' ? 'en-US' : 'fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
            : '-';

        App.showModal(`
            <div class="admin-detail-modal">
                <h2 style="margin-bottom:20px;">${u.displayName}</h2>
                <div style="color:var(--text-muted); font-size:13px; margin-bottom:20px;">${u.email}</div>

                <div class="profile-stats-grid" style="margin-bottom:24px;">
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${u.totalStudied}</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_studied')}</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${u.totalMastered}</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_mastered')}</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${u.accuracy}%</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_accuracy')}</div>
                    </div>
                    <div class="profile-stat-card">
                        <div class="profile-stat-value">${u.streak}</div>
                        <div class="profile-stat-label">${I18n.t('profile_stats_streak')}</div>
                    </div>
                </div>

                <h3 style="margin-bottom:12px;">${I18n.t('admin_progress_detail')}</h3>
                <div class="admin-progress-bars">
                    <div class="admin-progress-item">
                        <div class="admin-progress-label">Kana</div>
                        <div class="admin-progress-vals">${u.kanaM} / ${u.kana} ${I18n.t('admin_items')}</div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${u.kana > 0 ? Math.round(u.kanaM/u.kana*100) : 0}%"></div></div>
                    </div>
                    <div class="admin-progress-item">
                        <div class="admin-progress-label">Kanji</div>
                        <div class="admin-progress-vals">${u.kanjiM} / ${u.kanji} ${I18n.t('admin_items')}</div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${u.kanji > 0 ? Math.round(u.kanjiM/u.kanji*100) : 0}%"></div></div>
                    </div>
                    <div class="admin-progress-item">
                        <div class="admin-progress-label">${I18n.t('nav_grammar')}</div>
                        <div class="admin-progress-vals">${u.grammarM} / ${u.grammar} ${I18n.t('admin_items')}</div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${u.grammar > 0 ? Math.round(u.grammarM/u.grammar*100) : 0}%"></div></div>
                    </div>
                    <div class="admin-progress-item">
                        <div class="admin-progress-label">${I18n.t('nav_vocab')}</div>
                        <div class="admin-progress-vals">${u.vocabM} / ${u.vocab} ${I18n.t('admin_items')}</div>
                        <div class="progress-bar"><div class="progress-fill" style="width:${u.vocab > 0 ? Math.round(u.vocabM/u.vocab*100) : 0}%"></div></div>
                    </div>
                </div>

                <div style="margin-top:20px; font-size:13px; color:var(--text-muted);">
                    ${I18n.t('admin_col_last_sync')}: ${lastSyncStr}<br>
                    ${I18n.t('admin_last_study')}: ${u.lastStudyDate}<br>
                    ${I18n.t('admin_today')}: ${u.studiedToday}
                </div>
            </div>
        `);
    },

    getFilteredSortedUsers() {
        let users = [...this.users];

        // Filter by search
        if (this.searchQuery) {
            const q = this.searchQuery.toLowerCase();
            users = users.filter(u =>
                u.displayName.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q)
            );
        }

        // Sort
        users.sort((a, b) => {
            let va = a[this.sortField];
            let vb = b[this.sortField];

            if (va instanceof Date && vb instanceof Date) {
                return this.sortAsc ? va - vb : vb - va;
            }
            if (va === null || va === undefined) va = '';
            if (vb === null || vb === undefined) vb = '';

            if (typeof va === 'string') {
                return this.sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
            }
            return this.sortAsc ? va - vb : vb - va;
        });

        return users;
    },

    getSortIcon(field) {
        if (this.sortField !== field) return '';
        return this.sortAsc ? '&#x25B2;' : '&#x25BC;';
    }
};
