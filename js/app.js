// ========================================
// Main App - Routing, Dashboard, Init
// ========================================

window.App = {
    currentPage: 'dashboard',

    init() {
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
            container.innerHTML = '<p class="empty-state">Aucune revision pour le moment. Commencez a etudier !</p>';
            btn.style.display = 'none';
            return;
        }

        const items = allDue.slice(0, 10);
        container.innerHTML = items.map(r => {
            const typeLabel = reviews.kana.includes(r) ? 'Kana' :
                              reviews.kanji.includes(r) ? 'Kanji' :
                              reviews.grammar.includes(r) ? 'Grammaire' : 'Vocabulaire';
            return `
                <div class="review-item">
                    <span class="review-item-char">${r.id}</span>
                    <span class="review-item-info">${typeLabel} - Niveau ${r.level}/5</span>
                </div>`;
        }).join('');

        if (allDue.length > 10) {
            container.innerHTML += `<p style="text-align:center; color:var(--text-muted); font-size:13px;">...et ${allDue.length - 10} autres</p>`;
        }

        btn.style.display = 'inline-flex';
        btn.textContent = `Commencer la revision (${allDue.length})`;
        btn.onclick = () => {
            // Navigate to the category with the most due reviews
            const counts = {
                kana: reviews.kana.length,
                kanji: reviews.kanji.length,
                grammar: reviews.grammar.length,
                vocabulary: reviews.vocab.length
            };
            const maxCat = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
            this.navigateTo(maxCat);
        };
    }
};

// ---- Boot ----
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
