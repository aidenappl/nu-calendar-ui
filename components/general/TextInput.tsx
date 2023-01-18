import { useEffect, useState } from "react";

type TextInputProps = {
	label?: string;
	placeholder?: string;
	value?: string;

	setValue?: (value: string) => void;
	onEnterHit?: () => void;
};

const TextInput = (props: TextInputProps) => {
	const {
		label,
		placeholder,
		setValue = (value: string) => {},
		onEnterHit = () => {},
	} = props;

	const [value, setLocValue] = useState(props.value);

	useEffect(() => {
		setLocValue(props.value);
	}, [props.value]);

	return (
		<div className="w-full flex flex-col h-fit">
			<label className="pb-2 text-slate-600">{label}</label>
			<div>
				<input
					className={
						"w-full h-[50px] bg-slate-50 border-2 rounded-md outline-none pl-3 focus:border-blue-500"
					}
					value={value}
					onChange={(e) => {
						setLocValue(e.target.value);
						setValue(e.target.value);
					}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onEnterHit();
                        }
                    }}
					type={"text"}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
};

export default TextInput;
