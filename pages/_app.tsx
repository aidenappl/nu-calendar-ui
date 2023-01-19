import PageHead from "@/components/general/PageHead";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: any) => {
	return (
		<>
			<PageHead />
			<Component {...pageProps} />
		</>
	);
};

export default App;
