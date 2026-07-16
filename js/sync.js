// ========================================
// Cloud Sync Module (Firestore)
// ========================================

window.Sync = {
    isSyncing: false,
    lastSyncTime: null,
    autoSyncInterval: null,

    init() {
        // Listen for auth changes
        Auth.onAuthChanged(user => {
            if (user) {
                this.pullFromCloud().then(() => {
                    App.updateDashboard();
                    App.updateBadges();
                });
                this.startAutoSync();
            } else {
                this.stopAutoSync();
            }
        });
    },

    startAutoSync() {
        this.stopAutoSync();
        // Auto-sync every 2 minutes
        this.autoSyncInterval = setInterval(() => {
            if (Auth.currentUser) {
                this.pushToCloud(true); // silent push
            }
        }, 120000);
    },

    stopAutoSync() {
        if (this.autoSyncInterval) {
            clearInterval(this.autoSyncInterval);
            this.autoSyncInterval = null;
        }
    },

    async pushToCloud(silent = false) {
        if (!Auth.currentUser || this.isSyncing) return;

        this.isSyncing = true;
        this.updateSyncUI('syncing');

        try {
            const progress = Storage.getProgress();
            const docRef = firebaseDb.collection('users').doc(Auth.currentUser.uid);

            await docRef.set({
                progress: progress,
                locale: I18n.locale,
                displayName: Auth.currentUser.displayName || '',
                email: Auth.currentUser.email || '',
                lastSync: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: new Date().toISOString()
            }, { merge: true });

            this.lastSyncTime = new Date();
            this.updateSyncUI('synced');

            if (!silent) {
                App.toast('Progression sauvegardee dans le cloud !', 'success');
            }
        } catch (error) {
            console.error('Sync push error:', error);
            this.updateSyncUI('error');
            if (!silent) {
                App.toast('Erreur de synchronisation', 'error');
            }
        } finally {
            this.isSyncing = false;
        }
    },

    async pullFromCloud() {
        if (!Auth.currentUser) return;

        this.updateSyncUI('syncing');

        try {
            const docRef = firebaseDb.collection('users').doc(Auth.currentUser.uid);
            const doc = await docRef.get();

            if (doc.exists && doc.data().progress) {
                const cloudData = doc.data();
                const cloudProgress = cloudData.progress;
                const localProgress = Storage.getProgress();

                // Merge strategy: take the one with more data
                const merged = this.mergeProgress(localProgress, cloudProgress);
                Storage.saveProgress(merged);

                // Restore locale from cloud
                if (cloudData.locale) {
                    I18n.setLocale(cloudData.locale);
                }

                this.lastSyncTime = new Date();
                this.updateSyncUI('synced');
            } else {
                // No cloud data yet, push local data
                await this.pushToCloud(true);
            }
        } catch (error) {
            console.error('Sync pull error:', error);
            this.updateSyncUI('error');
        }
    },

    mergeProgress(local, cloud) {
        const merged = { ...local };

        // Merge each category
        ['kana', 'kanji', 'grammar', 'vocab'].forEach(cat => {
            if (!cloud[cat]) return;
            if (!merged[cat]) merged[cat] = {};

            Object.entries(cloud[cat]).forEach(([id, cloudItem]) => {
                const localItem = merged[cat][id];

                if (!localItem) {
                    // Only in cloud
                    merged[cat][id] = cloudItem;
                } else {
                    // Exists in both - take the one with more attempts (more study)
                    if (cloudItem.attempts > localItem.attempts) {
                        merged[cat][id] = cloudItem;
                    }
                    // Keep higher SRS level
                    if (cloudItem.level > localItem.level) {
                        merged[cat][id].level = cloudItem.level;
                    }
                }
            });
        });

        // Take the higher values for global stats
        merged.streak = Math.max(local.streak || 0, cloud.streak || 0);
        merged.totalCorrect = Math.max(local.totalCorrect || 0, cloud.totalCorrect || 0);
        merged.totalAttempts = Math.max(local.totalAttempts || 0, cloud.totalAttempts || 0);
        merged.studiedToday = Math.max(local.studiedToday || 0, cloud.studiedToday || 0);
        merged.lastStudyDate = local.lastStudyDate > cloud.lastStudyDate ? local.lastStudyDate : cloud.lastStudyDate;

        return merged;
    },

    updateSyncUI(status) {
        const indicator = document.getElementById('sync-indicator');
        const statusEl = document.getElementById('sync-status');
        const syncBtn = document.getElementById('auth-sync-btn');

        if (!indicator) return;

        indicator.className = 'sync-indicator';

        switch (status) {
            case 'syncing':
                indicator.classList.add('syncing');
                if (statusEl) statusEl.textContent = 'Synchronisation...';
                if (syncBtn) syncBtn.disabled = true;
                break;
            case 'synced':
                indicator.classList.add('synced');
                if (statusEl) statusEl.textContent = 'Synchronise';
                if (syncBtn) syncBtn.disabled = false;
                break;
            case 'error':
                indicator.classList.add('error');
                if (statusEl) statusEl.textContent = 'Erreur sync';
                if (syncBtn) syncBtn.disabled = false;
                break;
            default:
                if (statusEl) statusEl.textContent = Auth.currentUser ? 'Connecte' : 'Hors ligne';
                if (syncBtn) syncBtn.disabled = false;
        }
    }
};
