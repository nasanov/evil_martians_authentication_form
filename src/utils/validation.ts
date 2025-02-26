export const checkPasswordRequirements = (password: string) => {
	return {
		minLength: password.length >= 12,
		hasUpperCase: /[A-Z]/.test(password),
		hasNumber: /[0-9]/.test(password),
		hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
	};
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
	const requirements = checkPasswordRequirements(password);
	return {
		isValid: Object.values(requirements).every(Boolean),
		message: '',
	};
};

export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validateForm = (name: string, email: string, password: string): boolean => {
	const requirements = checkPasswordRequirements(password);
	return name.trim() !== '' && validateEmail(email) && Object.values(requirements).every(Boolean);
};
