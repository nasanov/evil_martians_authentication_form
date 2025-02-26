import './styles.css';

interface PasswordRequirementsProps {
	password: string;
}

const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
	const requirements = [
		{
			test: (pass: string) => pass.length >= 12,
			text: 'At least 12 characters',
		},
		{
			test: (pass: string) => /[A-Z]/.test(pass),
			text: 'At least 1 uppercase letter',
		},
		{
			test: (pass: string) => /[0-9]/.test(pass),
			text: 'At least 1 number',
		},
		{
			test: (pass: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pass),
			text: 'At least 1 special character',
		},
	];

	return (
		<div className="password-requirements">
			{requirements.map((req, index) => (
				<div key={index} className={`requirement ${req.test(password) ? 'valid' : 'invalid'}`}>
					<span className="requirement-icon">{req.test(password) ? '✓' : '✗'}</span>
					<span className="requirement-text">{req.text}</span>
				</div>
			))}
		</div>
	);
};

export default PasswordRequirements;
