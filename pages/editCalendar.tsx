import Button from "@/components/general/Button";
import TextInput from "@/components/general/TextInput";
import { NewRequest } from "@/services/http/request";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
	slug: string;
};

const GetCalendar = async (slug: string) => {
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
		return response.data;
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

const EditCalendar = (props: Props) => {
	const [calendar, setCalendar] = useState<any>(null);
	const [referenceEvent, setReferenceEvent] = useState<any>(null);

	const [changes, setChanges] = useState<any>(null);

	useEffect(() => {
		initializePage();
	}, []);

	useEffect(() => {
		console.log(changes);
	}, [changes]);

	const initializePage = async () => {
		const calendar = await GetCalendar(props.slug);
		console.log(calendar);
		setCalendar(calendar);
	};

	const discardRefEvent = () => {
		setReferenceEvent(null);
		setChanges(null);
	};

	const saveRefEvent = async () => {
		if (!changes) {
			window.alert("No changes to save");
			return;
		}

		var body = changes;
		body["event_reference_id"] = referenceEvent.id;

		const response = await NewRequest({
			route: "/nucal/v1.1/editReferenceEvents",
			method: "POST",
			body: body,
		});
		console.log(response);
		if (response.success) {
			window.alert("Changes saved successfully");
			discardRefEvent();
			initializePage();
		} else {
			window.alert(
				"There was an error saving the changes. Please try again later."
			);
		}
	};

	return (
		<>
			{referenceEvent ? (
				<>
					<div className="fixed w-full h-screen flex items-center justify-center z-20">
						<div className="p-5 bg-slate-50 shadow-md w-[500px] rounded-md">
							<h1 className="text-2xl">Edit Event Reference</h1>
							<p>Reference ID: {referenceEvent.id}</p>
							<p>Event: {referenceEvent.event}</p>
							<div className="mt-5 flex gap-2 flex-col">
								<TextInput
									label="Custom Summary"
									placeholder="Enter a custom title (optional)"
									value={referenceEvent.custom_summary}
									onChange={(e) => {
										if (
											referenceEvent.custom_summary ===
											e.target.value
										) {
											delete changes.custom_summary;
											setChanges(changes);
											return;
										}

										setChanges({
											...changes,
											custom_summary: e.target.value,
										});
									}}
								/>
								<TextInput
									label="Location Building"
									placeholder="Enter the Location Building"
									value={referenceEvent.location_building}
									onChange={(e) => {
										if (
											referenceEvent.location_building ===
											e.target.value
										) {
											delete changes.location_building;
											setChanges(changes);
											return;
										}

										setChanges({
											...changes,
											location_building: e.target.value,
										});
									}}
								/>
								<TextInput
									label="Location Room"
									placeholder="Enter the Location Room"
									value={referenceEvent.location_room}
									onChange={(e) => {
										if (
											referenceEvent.location_room ===
											e.target.value
										) {
											delete changes.location_room;
											setChanges(changes);
											return;
										}

										setChanges({
											...changes,
											location_room: e.target.value,
										});
									}}
								/>
								<TextInput
									label="Location Address"
									placeholder="Enter the Location Address"
									value={referenceEvent.location_address}
									onChange={(e) => {
										if (
											referenceEvent.location_address ===
											e.target.value
										) {
											delete changes.location_address;
											setChanges(changes);
											return;
										}

										setChanges({
											...changes,
											location_address: e.target.value,
										});
									}}
								/>
								<div className="flex gap-4 mt-5">
									<Button
										onClick={() => discardRefEvent()}
										value="Discard"
										className="bg-slate-400"
									/>
									<Button
										value="Save"
										onClick={() => saveRefEvent()}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={() => discardRefEvent()}
						className="fixed w-full h-screen bg-black opacity-10 z-10"
					></div>
				</>
			) : null}
			{calendar ? (
				<div className="p-10">
					<h1>Edit Calendar: {props.slug}</h1>
					<h2>Nickname: {calendar.nickname}</h2>
					<h2>
						Link:{" "}
						<a
							className="text-blue-500"
							href={
								"https://aplb.xyz/nucal/v1.1/calendar?cal_slug=" +
								calendar.slug +
								"&ts=" +
								new Date().getTime()
							}
						>
							{"https://aplb.xyz/nucal/v1.1/calendar?cal_slug=" +
								calendar.slug +
								"&ts=" +
								new Date().getTime()}
						</a>
					</h2>
					<div className="border-2 p-3 rounded-md mt-10">
						{calendar.event_references.map(
							(event: any, index: number) => {
								let goodEvent = true;
								if (
									!event.location_address ||
									!event.location_building ||
									!event.location_room
								) {
									goodEvent = false;
								}
								return (
									<div
										key={index}
										className="flex justify-between hover:bg-slate-50 py-1 px-2 cursor-pointer"
									>
										<div className="flex  gap-4">
											<p>{event.event}</p>
											<p className="font-semibold">
												{goodEvent
													? "All Good!"
													: "Needs Attention"}
											</p>
										</div>
										<a
											className="italic cursor-pointer underline"
											onClick={() =>
												setReferenceEvent(event)
											}
										>
											Click to Edit
										</a>
									</div>
								);
							}
						)}
					</div>
				</div>
			) : null}
		</>
	);
};

export async function getServerSideProps(context: any) {
	let slug = context.query.slug;

	if (!slug) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			slug: slug,
		}, // will be passed to the page component as props
	};
}

export default EditCalendar;
