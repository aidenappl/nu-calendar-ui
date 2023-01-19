type ButtonProps = {
	value: string;
	className?: string;

	onClick?: () => void;
};

const Button = (props: ButtonProps) => {
	const { value, className = "", onClick = () => {} } = props;

	return (
		<button
			onClick={onClick}
			className={
				className +
				" w-full bg-blue-500 text-white h-[50px] rounded-md border-none outline-none"
			}
		>
			{props.value}
		</button>
	);
};

export default Button;
