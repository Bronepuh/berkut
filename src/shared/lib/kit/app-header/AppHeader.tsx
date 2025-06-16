import { Link, useLocation } from "react-router-dom";
import { Layout } from "@shared/lib/kit/components";
import styles from "./app-header.module.scss";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import Logo from "@assets/logo.svg";
import { BASE_PATH } from "@shared/utils/constants";

const { Header } = Layout;

export const AppHeader = () => {
	const location = useLocation();
	const pathname = location.pathname;
	const isHomePage = pathname === `/${BASE_PATH}/` || pathname === `/${BASE_PATH}` || pathname === "/";

	return (
		<Header className={styles.wrapper}>
			<div className={styles.header}>
				<Link to={`/${BASE_PATH}`} className={styles.logo}>
					<img src={Logo} alt="Logo" />
				</Link>

				<div className={styles.headerControls}>
					{isHomePage ? (
						<Link to={`/${BASE_PATH}/favorites`} className={styles.controlButton}>
							<HeartOutlined />
							<span className={styles.buttonText}>Избранное</span>
						</Link>
					) : (
						<>
							<Link to={`/${BASE_PATH}`} className={styles.controlButton}>
								<SearchOutlined />
								<span className={styles.buttonText}>Поиск</span>
							</Link>
							<Link to={`/${BASE_PATH}/favorites`} className={styles.controlButton}>
								<HeartOutlined />
								<span className={styles.buttonText}>Избранное</span>
							</Link>
						</>
					)}
				</div>
			</div>
		</Header>
	);
};
