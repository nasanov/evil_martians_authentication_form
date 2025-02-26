import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [react()],
		base: mode === 'production' ? '/evil_martians_authentication_form/' : '/',
	};
});
