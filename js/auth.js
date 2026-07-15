// ========================================
// Authentication Module
// ========================================

window.Auth = {
    currentUser: null,
    onAuthChangedCallbacks: [],

    init() {
        firebaseAuth.onAuthStateChanged(user => {
            this.currentUser = user;
            this.updateUI();
            this.onAuthChangedCallbacks.forEach(cb => cb(user));
        });

        this.bindEvents();
    },

    onAuthChanged(cb) {
        this.onAuthChangedCallbacks.push(cb);
    },

    bindEvents() {
        // Login form
        document.getElementById('auth-login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Register form
        document.getElementById('auth-register-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.register();
        });

        // Switch between login/register
        document.getElementById('auth-show-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('auth-login-panel').style.display = 'none';
            document.getElementById('auth-register-panel').style.display = 'block';
        });

        document.getElementById('auth-show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('auth-register-panel').style.display = 'none';
            document.getElementById('auth-login-panel').style.display = 'block';
        });

        // Google sign-in
        document.getElementById('auth-google-btn')?.addEventListener('click', () => this.loginWithGoogle());
        document.getElementById('auth-google-btn-register')?.addEventListener('click', () => this.loginWithGoogle());

        // Logout
        document.getElementById('auth-logout-btn')?.addEventListener('click', () => this.logout());

        // Account menu toggle
        document.getElementById('account-toggle')?.addEventListener('click', () => {
            document.getElementById('account-dropdown')?.classList.toggle('show');
        });

        // Close dropdown on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.account-section')) {
                document.getElementById('account-dropdown')?.classList.remove('show');
            }
        });

        // Sync button
        document.getElementById('auth-sync-btn')?.addEventListener('click', () => {
            if (this.currentUser) {
                Sync.pushToCloud();
            }
        });

        // Reset password
        document.getElementById('auth-forgot-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.resetPassword();
        });
    },

    async login() {
        const email = document.getElementById('auth-login-email').value.trim();
        const password = document.getElementById('auth-login-password').value;
        const errorEl = document.getElementById('auth-login-error');
        const btn = document.querySelector('#auth-login-form .btn-primary');

        if (!email || !password) {
            errorEl.textContent = 'Veuillez remplir tous les champs.';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Connexion...';
        errorEl.textContent = '';

        try {
            await firebaseAuth.signInWithEmailAndPassword(email, password);
            App.hideModal();
            App.toast('Connexion reussie !', 'success');
        } catch (error) {
            errorEl.textContent = this.translateError(error.code);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Se connecter';
        }
    },

    async register() {
        const name = document.getElementById('auth-register-name').value.trim();
        const email = document.getElementById('auth-register-email').value.trim();
        const password = document.getElementById('auth-register-password').value;
        const confirm = document.getElementById('auth-register-confirm').value;
        const errorEl = document.getElementById('auth-register-error');
        const btn = document.querySelector('#auth-register-form .btn-primary');

        if (!name || !email || !password) {
            errorEl.textContent = 'Veuillez remplir tous les champs.';
            return;
        }

        if (password.length < 6) {
            errorEl.textContent = 'Le mot de passe doit contenir au moins 6 caracteres.';
            return;
        }

        if (password !== confirm) {
            errorEl.textContent = 'Les mots de passe ne correspondent pas.';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Inscription...';
        errorEl.textContent = '';

        try {
            const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            await cred.user.updateProfile({ displayName: name });
            App.hideModal();
            App.toast('Compte cree avec succes !', 'success');
        } catch (error) {
            errorEl.textContent = this.translateError(error.code);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Creer mon compte';
        }
    },

    async loginWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebaseAuth.signInWithPopup(provider);
            App.hideModal();
            App.toast('Connexion Google reussie !', 'success');
        } catch (error) {
            if (error.code !== 'auth/popup-closed-by-user') {
                App.toast(this.translateError(error.code), 'error');
            }
        }
    },

    async logout() {
        try {
            // Push data before logout
            if (this.currentUser) {
                await Sync.pushToCloud();
            }
            await firebaseAuth.signOut();
            document.getElementById('account-dropdown')?.classList.remove('show');
            App.toast('Deconnexion reussie', 'info');
        } catch (error) {
            App.toast('Erreur lors de la deconnexion', 'error');
        }
    },

    async resetPassword() {
        const email = document.getElementById('auth-login-email').value.trim();
        if (!email) {
            document.getElementById('auth-login-error').textContent = 'Entrez votre email pour reinitialiser le mot de passe.';
            return;
        }

        try {
            await firebaseAuth.sendPasswordResetEmail(email);
            App.toast('Email de reinitialisation envoye !', 'success');
        } catch (error) {
            document.getElementById('auth-login-error').textContent = this.translateError(error.code);
        }
    },

    showAuthModal() {
        App.showModal(`
            <div class="auth-modal">
                <div class="auth-header">
                    <div class="auth-logo">学</div>
                    <h2>nihongo</h2>
                    <p>Connectez-vous pour sauvegarder votre progression</p>
                </div>

                <!-- Login Panel -->
                <div id="auth-login-panel">
                    <form id="auth-login-form" class="auth-form">
                        <div class="auth-field">
                            <label for="auth-login-email">Email</label>
                            <input type="email" id="auth-login-email" class="auth-input" placeholder="votre@email.com" required>
                        </div>
                        <div class="auth-field">
                            <label for="auth-login-password">Mot de passe</label>
                            <input type="password" id="auth-login-password" class="auth-input" placeholder="Votre mot de passe" required>
                        </div>
                        <div class="auth-error" id="auth-login-error"></div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">Se connecter</button>
                        <a href="#" id="auth-forgot-btn" class="auth-link" style="display:block; text-align:center; margin-top:8px;">Mot de passe oublie ?</a>
                    </form>

                    <div class="auth-divider"><span>ou</span></div>

                    <button class="btn btn-secondary auth-google" id="auth-google-btn" style="width:100%;">
                        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                        Continuer avec Google
                    </button>

                    <p class="auth-switch">
                        Pas encore de compte ? <a href="#" id="auth-show-register">Creer un compte</a>
                    </p>
                </div>

                <!-- Register Panel -->
                <div id="auth-register-panel" style="display:none;">
                    <form id="auth-register-form" class="auth-form">
                        <div class="auth-field">
                            <label for="auth-register-name">Nom d'affichage</label>
                            <input type="text" id="auth-register-name" class="auth-input" placeholder="Votre nom" required>
                        </div>
                        <div class="auth-field">
                            <label for="auth-register-email">Email</label>
                            <input type="email" id="auth-register-email" class="auth-input" placeholder="votre@email.com" required>
                        </div>
                        <div class="auth-field">
                            <label for="auth-register-password">Mot de passe</label>
                            <input type="password" id="auth-register-password" class="auth-input" placeholder="Minimum 6 caracteres" required>
                        </div>
                        <div class="auth-field">
                            <label for="auth-register-confirm">Confirmer le mot de passe</label>
                            <input type="password" id="auth-register-confirm" class="auth-input" placeholder="Retapez le mot de passe" required>
                        </div>
                        <div class="auth-error" id="auth-register-error"></div>
                        <button type="submit" class="btn btn-primary" style="width:100%;">Creer mon compte</button>
                    </form>

                    <div class="auth-divider"><span>ou</span></div>

                    <button class="btn btn-secondary auth-google" id="auth-google-btn-register" style="width:100%;">
                        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
                        Continuer avec Google
                    </button>

                    <p class="auth-switch">
                        Deja un compte ? <a href="#" id="auth-show-login">Se connecter</a>
                    </p>
                </div>
            </div>
        `);

        // Rebind events after modal content is set
        this.bindEvents();
    },

    updateUI() {
        const user = this.currentUser;
        const loggedOut = document.getElementById('account-logged-out');
        const loggedIn = document.getElementById('account-logged-in');
        const userName = document.getElementById('account-user-name');
        const userEmail = document.getElementById('account-user-email');
        const userAvatar = document.getElementById('account-avatar');
        const syncStatus = document.getElementById('sync-status');

        if (user) {
            if (loggedOut) loggedOut.style.display = 'none';
            if (loggedIn) loggedIn.style.display = 'block';
            if (userName) userName.textContent = user.displayName || 'Utilisateur';
            if (userEmail) userEmail.textContent = user.email;
            if (userAvatar) {
                if (user.photoURL) {
                    userAvatar.innerHTML = `<img src="${user.photoURL}" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
                } else {
                    const initial = (user.displayName || user.email || 'U')[0].toUpperCase();
                    userAvatar.textContent = initial;
                }
            }
            if (syncStatus) syncStatus.textContent = 'Connecte';
        } else {
            if (loggedOut) loggedOut.style.display = 'block';
            if (loggedIn) loggedIn.style.display = 'none';
            if (syncStatus) syncStatus.textContent = 'Hors ligne';
        }
    },

    translateError(code) {
        const errors = {
            'auth/email-already-in-use': 'Cet email est deja utilise.',
            'auth/invalid-email': 'Email invalide.',
            'auth/user-not-found': 'Aucun compte avec cet email.',
            'auth/wrong-password': 'Mot de passe incorrect.',
            'auth/weak-password': 'Mot de passe trop faible (min. 6 caracteres).',
            'auth/too-many-requests': 'Trop de tentatives. Reessayez plus tard.',
            'auth/network-request-failed': 'Erreur reseau. Verifiez votre connexion.',
            'auth/popup-blocked': 'Le popup a ete bloque. Autorisez les popups.',
            'auth/invalid-credential': 'Email ou mot de passe incorrect.'
        };
        return errors[code] || 'Une erreur est survenue. Reessayez.';
    }
};
