// ========================================
// Storage & SRS (Spaced Repetition System)
// ========================================

window.Storage = {
    prefix: 'nihongo_',

    get(key) {
        try {
            const val = localStorage.getItem(this.prefix + key);
            return val ? JSON.parse(val) : null;
        } catch { return null; }
    },

    set(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage full:', e);
        }
    },

    getProgress() {
        return this.get('progress') || {
            kana: {}, kanji: {}, grammar: {}, vocab: {},
            studiedToday: 0,
            lastStudyDate: null,
            streak: 0,
            totalCorrect: 0,
            totalAttempts: 0
        };
    },

    saveProgress(progress) {
        this.set('progress', progress);
        // Trigger cloud sync if logged in (debounced)
        this.debouncedSync();
    },

    _syncTimer: null,
    debouncedSync() {
        clearTimeout(this._syncTimer);
        this._syncTimer = setTimeout(() => {
            if (window.Sync && window.Auth && Auth.currentUser) {
                Sync.pushToCloud(true);
            }
        }, 5000); // sync 5s after last change
    },

    updateStreak() {
        const p = this.getProgress();
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

        if (p.lastStudyDate === today) return p;

        if (p.lastStudyDate === yesterday) {
            p.streak += 1;
        } else if (p.lastStudyDate !== today) {
            p.streak = 1;
        }
        p.lastStudyDate = today;
        p.studiedToday = 0;
        p.kanjiToday = 0;
        this.saveProgress(p);
        return p;
    },

    recordStudy(category, itemId, correct) {
        const p = this.getProgress();
        const today = new Date().toISOString().slice(0, 10);

        if (p.lastStudyDate !== today) {
            this.updateStreak();
        }

        if (!p[category]) p[category] = {};
        if (!p[category][itemId]) {
            p[category][itemId] = { correct: 0, attempts: 0, level: 0, nextReview: today };
        }

        const item = p[category][itemId];
        item.attempts += 1;
        p.totalAttempts += 1;

        if (correct) {
            item.correct += 1;
            p.totalCorrect += 1;
            item.level = Math.min(item.level + 1, 5);
        } else {
            item.level = Math.max(item.level - 1, 0);
        }

        // SRS intervals in days: 0, 1, 3, 7, 14, 30
        const intervals = [0, 1, 3, 7, 14, 30];
        const nextDays = intervals[item.level] || 30;
        const nextDate = new Date(Date.now() + nextDays * 86400000);
        item.nextReview = nextDate.toISOString().slice(0, 10);

        p.studiedToday = (p.studiedToday || 0) + 1;
        if (category === 'kanji') p.kanjiToday = (p.kanjiToday || 0) + 1;
        p.lastStudyDate = today;

        this.saveProgress(p);
        return item;
    },

    getItemStatus(category, itemId) {
        const p = this.getProgress();
        if (!p[category] || !p[category][itemId]) return null;
        return p[category][itemId];
    },

    getMasteredCount(category) {
        const p = this.getProgress();
        if (!p[category]) return 0;
        return Object.values(p[category]).filter(i => i.level >= 4).length;
    },

    getLearningCount(category) {
        const p = this.getProgress();
        if (!p[category]) return 0;
        return Object.values(p[category]).filter(i => i.level > 0 && i.level < 4).length;
    },

    getCategoryProgress(category, totalItems) {
        const p = this.getProgress();
        if (!p[category] || totalItems === 0) return 0;
        const studied = Object.keys(p[category]).length;
        return Math.round((studied / totalItems) * 100);
    },

    getDueReviews(category) {
        const p = this.getProgress();
        if (!p[category]) return [];
        const today = new Date().toISOString().slice(0, 10);
        return Object.entries(p[category])
            .filter(([, v]) => v.nextReview <= today)
            .map(([id, v]) => ({ id, ...v }));
    },

    getAllDueReviews() {
        return {
            kana: this.getDueReviews('kana'),
            kanji: this.getDueReviews('kanji'),
            grammar: this.getDueReviews('grammar'),
            vocab: this.getDueReviews('vocab')
        };
    },

    getAccuracy() {
        const p = this.getProgress();
        if (p.totalAttempts === 0) return 0;
        return Math.round((p.totalCorrect / p.totalAttempts) * 100);
    },

    getTotalMastered() {
        return this.getMasteredCount('kana') + this.getMasteredCount('kanji') +
               this.getMasteredCount('grammar') + this.getMasteredCount('vocab');
    },

    resetProgress() {
        localStorage.removeItem(this.prefix + 'progress');
    }
};

// Active level filter
window.LevelFilter = {
    current: 'N5',
    set(level) { this.current = level; },
    get() { return this.current; },
    matches(itemLevel) {
        if (this.current === 'all') return true;
        return itemLevel === this.current;
    }
};
