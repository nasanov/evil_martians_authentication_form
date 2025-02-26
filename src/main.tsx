import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HashRouter>
			{/* // basename={import.meta.env.MODE === 'production' ? '/evil_martians_authentication_form' : '/'} */}
			<App />
		</HashRouter>
	</StrictMode>
);
