import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
	const [username, setUsername] = useState<string | null>(null);
	const location = useLocation();
	const message = location.state?.message;

	useEffect(() => {
		const user = localStorage.getItem('user');
		if (user) setUsername(user);
	}, []);

	return (
		<div className="home-container">
			{username ? (
				<>
					<h1>Welcome, {username}!</h1>
					{message && <p className="success-message">{message}</p>}
					<button
						onClick={() => {
							localStorage.removeItem('user');
							setUsername(null);
						}}
					>
						Logout
					</button>
				</>
			) : (
				<>
					<h1>Welcome</h1>
					<div className="home-buttons">
						<Link to="/login">
							<button>Login</button>
						</Link>
						<Link to="/signup">
							<button>Signup</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
}

export default Home;
