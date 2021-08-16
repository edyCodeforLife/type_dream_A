import Head from "next/head";
import styles from "../styles/home.module.css";
import { Row, Col } from "antd";
import { TextEditor } from '../components/text-editor';

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
				<Row style={{ width: '100%', textAlign: 'center' }}>
					<Col span={24}>
						Simple Text Editor
					</Col>
					<Col span={24}>
						<TextEditor />
					</Col>
				</Row>
			</div>

		</div>
	);
}
