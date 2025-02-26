import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../api/auth';
import '../../AuthForm.css';

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
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
						onChange={e => setPassword(e.target.value)}
						required
						placeholder="Password"
					/>
				</div>
				<div className="auth-form-footer">
					<button type="submit" disabled={isLoading}>
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
