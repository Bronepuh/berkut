import { Row, Col, Empty } from "antd";
import { useFavoritesStore } from "@shared/store/favorites";
import { PhotoCard } from "src/entities/photo-card/ui/PhotoCard";
import styles from "./favorites.module.scss";

export const FavoritesPage: React.FC = () => {
	const favorites = useFavoritesStore((state) => state.favorites);

	if (favorites.length === 0) {
		return <Empty description="No favorites yet" />;
	}

	return (
		<>
			<div className={styles.header}>
				<h1>Избранное</h1>
			</div>
			<div className={styles.pageContainer}>
				<div className={styles.contentContainer}>
					<Row gutter={[16, 16]}>
						{favorites.map((photo) => (
							<Col
								key={photo.id}
								xs={24} // 1 колонка на мобильных
								sm={12} // 2 колонки на планшетах
								md={8} // 3 колонки на десктопах
								lg={8} // 3 колонки на больших экранах
								className={styles.gridColumn}
							>
								<PhotoCard photo={photo} />
							</Col>
						))}
					</Row>
				</div>
			</div>
		</>
	);
};
