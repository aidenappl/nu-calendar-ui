type ButtonProps = {
	value: string;

	onClick?: () => void;
};

const Button = (props: ButtonProps) => {
	const { value, onClick = () => {} } = props;

	return (
		<button
			onClick={onClick}
			className="w-full bg-blue-500 text-white h-[50px] rounded-md border-none outline-none"
		>
			{props.value}
		</button>
	);
};

export default Button;
