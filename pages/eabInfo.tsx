import Link from "next/link";

const EABInfo = () => {
	return (
		<div className="w-full h-fit p-5 md:p-10">
			<h1 className="text-2xl">EAB Information</h1>
			<div className="flex flex-col flex-wrap mt-4">
				<li>
					Navigate to{" "}
					<a
						href="https://northeastern.campus.eab.com/calendar/settings"
						className="text-blue-500 cursor-pointer"
					>
						https://northeastern.campus.eab.com/calendar/settings
					</a>
				</li>
				<li>Select &quot;Setup Sync...&quot;</li>
				<li>Select &quot;Other Applications&quot;</li>
				<li>Copy the webcal link</li>
				<li>
					Paste it on the NUCal EAB Feed URL{" "}
					<Link className="text-blue-500" href="/">
						Go Home
					</Link>
				</li>
			</div>
		</div>
	);
};

export const getStaticProps = (context: any) => {
	return {
		props: {
			title: "EAB Directions",
		},
	};
};

export default EABInfo;
