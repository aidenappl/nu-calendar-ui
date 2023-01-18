import Button from "@/components/general/Button";
import TextInput from "@/components/general/TextInput";
import { NewRequest } from "@/services/http/request";
import { useState } from "react";

const HomePage = () => {
	const [email, setEmail] = useState("");
	const [feed, setFeed] = useState("");
	const [slug, setSlug] = useState("");

	const initialize = async () => {
		if (!email || !feed) {
			window.alert("Please enter your email and feed URL");
			return;
		}

		const response = await NewRequest({
			route: "/nucal/v1.1/initializer",
			method: "POST",
			body: {
				northeastern_email: email,
				eab_uri: feed,
			},
			auth: false,
		});
		console.log(response);
		if (response.success) {
			// TODO: Redirect to the calendar page
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

		const response = await NewRequest({
			route: "/nucal/v1.1/getCalendar",
			method: "GET",
			params: {
				slug: slug,
			},
		});
		console.log(response);
		if (response.success) {
			// TODO: Redirect to the calendar page
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

	return (
		<div className="p-10">
			<h1 className="text-2xl pb-7">NU Calendar Generator</h1>
			<div className="flex flex-col w-[500px] gap-4">
				<TextInput
					placeholder="Enter your Northeastern Email"
					label="Northeastern Email"
					value={email}
					setValue={setEmail}
				/>
				<TextInput
					placeholder="Enter your EAB Feed URL"
					label="EAB Feed"
					value={feed}
					setValue={setFeed}
					onEnterHit={initialize}
				/>
				<Button value="Submit" onClick={() => initialize()} />
			</div>
			<p className="my-5 relative text-lg font-medium text-center w-[500px]">
				Or
			</p>
			<div className="flex flex-col w-[500px] gap-4">
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
	);
};

export default HomePage;
