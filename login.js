(() => {
	const form = document.getElementById('login-form');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const error = document.getElementById('error');

	const DEMO_EMAIL = 'GREEN@gmail.com';
	const DEMO_PASS = '123456';

	const showError = (msg) => {
		error.textContent = msg;
		error.style.opacity = '1';
	};

	const clearError = () => {
		error.textContent = '';
		error.style.opacity = '0';
	};

	const validateEmail = (val) => /.+@.+\..+/.test(val);

	form?.addEventListener('submit', (e) => {
		e.preventDefault();
		clearError();

		const enteredEmail = (email.value || '').trim();
		const enteredPass = password.value || '';

		if (!validateEmail(enteredEmail)) {
			showError('Please enter a valid email address');
			email.focus();
			return;
		}
		if (enteredPass.length < 6) {
			showError('Password must be at least 6 characters');
			password.focus();
			return;
		}

		// Check demo credentials (case-insensitive for the email)
		if (enteredEmail.toLowerCase() === DEMO_EMAIL.toLowerCase() && enteredPass === DEMO_PASS) {
			// small success effect
			form.classList.add('success');
			setTimeout(() => {
				window.location.href = 'g.html';
			}, 300);
		} else {
			showError('Invalid credentials. Try the demo: GREEN@gmail.com / 123456');
		}
	});
})();

