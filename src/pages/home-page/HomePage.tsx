import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import styles from "./Home.module.scss";
import { SearchBar } from "@shared/lib/kit/search-bar/SearchBar";
import { PhotoCard } from "src/entities/photo-card/ui/PhotoCard";
import { photosTransport } from "@shared/transport/photos-transport";
import type { SimplePhoto } from "src/entities/photo-card/model/types";
import { mapToSimplePhoto } from "src/entities/photo-card/model/maps/map-to-domain";

export const HomePage: React.FC = () => {
	const [simplePhotos, setSimplePhotos] = useState<SimplePhoto[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPhotos = async () => {
			try {
				const data = await photosTransport.getRandomPhotos();
				const mapped = data.map(mapToSimplePhoto);
				setSimplePhotos(mapped);
			} catch (error) {
				console.error("Error fetching photos:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchPhotos();
	}, []);

	if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<>
			<SearchBar />
			<div className={styles.pageContainer}>
				<div className={styles.contentContainer}>
					<Row gutter={[16, 16]} className={styles.photoGrid}>
						{simplePhotos.map((photo) => (
							<Col key={photo.id} xs={24} sm={12} md={8} lg={8} className={styles.gridColumn}>
								<PhotoCard photo={photo} />
							</Col>
						))}
					</Row>
				</div>
			</div>
		</>
	);
};
