import Head from "next/head";

const PageHead = () => {
	return (
		<Head>
			<title>Northeastern CalFeed</title>
			<meta name="title" content="Northeastern CalFeed" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>

			{/* Favicon Header Items */}
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="./favicons/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="./favicons/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="./favicons/favicon-16x16.png"
			/>
			<link rel="manifest" href="/favicons/site.webmanifest" />
			<link
				rel="mask-icon"
				href="./favicons/safari-pinned-tab.svg"
				color="#5bbad5"
			/>
			<link rel="shortcut icon" href="./favicons/favicon.ico" />
			<meta name="msapplication-TileColor" content="#70d2d1" />
			<meta
				name="msapplication-config"
				content="./favicons/browserconfig.xml"
			/>
			<meta name="theme-color" content="#ffffff" />

			<meta
				name="description"
				content="Modify your live-updating northeastern calendar to include location information, custom summaries and custom fields for complete control & customizability."
			/>

			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://nucal.aplb.xyz/" />
			<meta property="og:title" content="Northeastern CalFeed" />
			<meta
				property="og:description"
				content="Modify your live-updating northeastern calendar to include location information, custom summaries and custom fields for complete control & customizability."
			/>
			<meta
				property="og:image"
				content="https://nucal.aplb.xyz/images/banner_image.jpg"
			/>

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://nucal.aplb.xyz/" />
			<meta property="twitter:title" content="Northeastern CalFeed" />
			<meta
				property="twitter:description"
				content="Modify your live-updating northeastern calendar to include location information, custom summaries and custom fields for complete control & customizability."
			/>
			<meta
				property="twitter:image"
				content="https://nucal.aplb.xyz/images/banner_image.jpg"
			/>
		</Head>
	);
};

export default PageHead;
