export interface AuthResponse {
	success: boolean;
	username?: string;
}

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
	console.log(password);
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ success: true, username: email.split('@')[0] });
		}, 2000);
	});
};

export const signupUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
	console.log(email, password);
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({ success: true, username: name });
		}, 2000);
	});
};
