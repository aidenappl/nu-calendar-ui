import Button from "@/components/general/Button";
import TextInput from "@/components/general/TextInput";
import { NewRequest } from "@/services/http/request";
import { useState } from "react";

const HomePage = () => {
	const [email, setEmail] = useState("");
	const [feed, setFeed] = useState("");
	const [slug, setSlug] = useState("");

	const [loading, setLoading] = useState(false);

	const initialize = async () => {
		if (!email || !feed) {
			window.alert("Please enter your email and feed URL");
			return;
		}

		let feedTS = feed;

		if (feed.slice(0, 7) == "webcal:") {
			let tmpFeed = feed.slice(7);
			feedTS = "https:" + tmpFeed;
		}

		setLoading(true);

		const response = await NewRequest({
			route: "/nucal/v1.1/initializer",
			method: "POST",
			body: {
				northeastern_email: email,
				eab_uri: feedTS,
			},
			auth: false,
		});
		console.log(response);
		setLoading(false);
		if (response.success) {
			// TODO: Redirect to the calendar page
			window.location.href = "/editCalendar?slug=" + response.data.slug;
		} else {
			if (response.data.data.error) {
				window.alert(response.data.data.error);
				return;
			}
			window.alert(
				"There was an error initializing your calendar. Please try again later."
			);
		}
	};

	const lookupSlug = async () => {
		if (!slug) {
			window.alert("Please enter your APLB Slug");
			return;
		}

		setLoading(true);

		const response = await NewRequest({
			route: "/nucal/v1.1/getCalendar",
			method: "GET",
			params: {
				slug: slug,
			},
		});
		console.log(response);
		setLoading(false);
		if (response.success) {
			// TODO: Redirect to the calendar page
			window.location.href = "/editCalendar?slug=" + slug;
		} else {
			setSlug("");
			if (response.data.data.error) {
				window.alert(response.data.data.error);
				return;
			}
			window.alert(
				"There was an error initializing your calendar. Please try again later."
			);
		}
	};

	return (
		<>
			{loading ? (
				<div className="fixed w-full h-full bg-[#00000010] flex items-center justify-center">
					<h1 className="text-4xl font-bold">Loading...</h1>
				</div>
			) : null}
			<div className="p-5 md:p-10 ">
				<h1 className="w-full text-center md:text-left text-2xl pb-7">
					NU Calendar Generator
				</h1>
				<div className="flex flex-col w-full md:w-[500px] gap-4">
					<TextInput
						placeholder="Enter your Northeastern Email"
						label="Northeastern Email"
						value={email}
						setValue={setEmail}
					/>
					<TextInput
						placeholder="Enter your EAB Feed URL"
						label="EAB Feed"
						labelLink="Info"
						value={feed}
						setValue={setFeed}
						onEnterHit={initialize}
						onLabelClick={() => {
							window.location.href = "/eabInfo";
						}}
					/>
					<Button value="Submit" onClick={() => initialize()} />
				</div>
				<p className="my-5 relative text-lg font-medium text-center w-full md:w-[500px]">
					Or
				</p>
				<div className="flex flex-col w-full md:w-[500px] gap-4">
					<TextInput
						placeholder="Enter your APLB Slug"
						label="APLB Slug"
						value={slug}
						setValue={setSlug}
						onEnterHit={lookupSlug}
					/>
					<Button value="Submit" onClick={() => lookupSlug()} />
				</div>
			</div>
		</>
	);
};

export default HomePage;
