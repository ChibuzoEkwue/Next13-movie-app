import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
	title: "Movie App",
	description: "A simple next js movie app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} mx-20 my-12`}>
				{children}
			</body>
		</html>
	);
}
