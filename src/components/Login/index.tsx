import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import '../../AuthForm.css';
import { Link } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await loginUser(email, password);
			if (response.success) {
				localStorage.setItem('user', response.username || '');
				navigate('/', { state: { message: 'Login successful!' } });
			}
		} catch {
			setMessage('Login failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="auth-form">
			<h1>Sign in</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label hidden>Email</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						placeholder="Email"
					/>
				</div>
				<div>
					<label hidden>Password</label>
					<input
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</div>
				<div className="auth-form-footer">
					<a href="/" className="forgot">
						Forgot your password?
					</a>
					<button type="submit" disabled={isLoading}>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</button>
					<p>
						Have no account? <Link to="/signup">Create new</Link>
					</p>
				</div>
			</form>
			{message && <p className="error-message">{message}</p>}
		</div>
	);
}

export default Login;
