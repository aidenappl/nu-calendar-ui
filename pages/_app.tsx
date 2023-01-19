import PageHead from "@/components/general/PageHead";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: any) => {
	return (
		<>
			<PageHead title={pageProps.title} />
			<Component {...pageProps} />
		</>
	);
};

export default App;
