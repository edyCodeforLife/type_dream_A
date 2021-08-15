import Head from "next/head";
import styles from "../styles/home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>TypeDream</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta name="description" content="TypeDream Assessment" />
			</Head>
			<div>
				edy susanto tes
			</div>

		</div>
	);
}
