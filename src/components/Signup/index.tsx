import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../api/auth';
import { validatePassword, validateForm } from '../../utils/validation';
import '../../AuthForm.css';
import PasswordRequirements from '../PasswordRequirements';

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsFormValid(validateForm(name, email, password));
	}, [name, email, password]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const passwordValidation = validatePassword(password);
		if (!passwordValidation.isValid) {
			setPasswordError(passwordValidation.message);
			return;
		}

		setIsLoading(true);

		try {
			const response = await signupUser(name, email, password);
			if (response.success) {
				localStorage.setItem('user', response.username || '');
				navigate('/', { state: { message: 'Signup successful!' } });
			}
		} catch {
			setMessage('Signup failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		if (newPassword) {
			const validation = validatePassword(newPassword);
			setPasswordError(validation.message);
		} else {
			setPasswordError('');
		}
	};

	return (
		<div className="auth-form">
			<h1>Sign up</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label hidden>Name:</label>
					<input
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
						required
						placeholder="Name"
					/>
				</div>
				<div>
					<label hidden>Email:</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</div>
				<div>
					<label hidden>Password:</label>
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						required
						placeholder="Password"
					/>
					{password && <PasswordRequirements password={password} />}
					{passwordError && <p className="error-message">{passwordError}</p>}
				</div>
				<div className="auth-form-footer">
					<button type="submit" disabled={isLoading || !isFormValid}>
						{isLoading ? 'Signing up...' : 'Sign up'}
					</button>
					<p>
						Already have an account? <Link to="/login">Login</Link>
					</p>
				</div>
			</form>
			{message && <p className="error-message">{message}</p>}
		</div>
	);
}

export default Signup;
