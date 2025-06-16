import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import styles from "./search-results.module.scss";
import { PhotoCard } from "src/entities/photo-card/ui/PhotoCard";
import { SearchBar } from "@shared/lib/kit/search-bar/SearchBar";
import { photosTransport } from "@shared/transport/photos-transport";
import type { SimplePhoto } from "src/entities/photo-card/model/types";
import { mapToSimplePhoto } from "src/entities/photo-card/model/maps/map-to-domain";

export const SearchResultsPage: React.FC = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const query = queryParams.get("q") || "";

	const [photos, setPhotos] = useState<SimplePhoto[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPhotos = useCallback(
		async (newPage: number = 1) => {
			if (!query) return;

			try {
				setLoading(true);
				const data = await photosTransport.searchPhotos(query, newPage);
				const newPhotos = data.results.map(mapToSimplePhoto);

				if (newPage === 1) {
					setPhotos(newPhotos);
				} else {
					setPhotos((prev) => [...prev, ...newPhotos]);
				}

				setPage(newPage + 1);
				setHasMore(newPage < data.total_pages);
			} catch (error) {
				setError("Failed to load photos");
				console.error("Search error:", error);
			} finally {
				setLoading(false);
			}
		},
		[query],
	);

	useEffect(() => {
		fetchPhotos(1);
	}, [fetchPhotos]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore || loading) {
				return;
			}

			fetchPhotos(page);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasMore, loading, fetchPhotos, page]);

	if (loading && photos.length === 0) {
		return (
			<div className={styles.loadingContainer}>
				<Spin size="large" />
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.errorContainer}>
				<h2>{error}</h2>
				<p>Попробуйте еще раз позже...</p>
			</div>
		);
	}

	if (photos.length === 0 && !loading) {
		return (
			<div className={styles.noResults}>
				<h2>Результатов не найдено "{query}"</h2>
				<p>Попробуйте другой запрос...</p>
			</div>
		);
	}

	return (
		<>
			<SearchBar />
			<div className={styles.pageContainer}>
				<div className={styles.header}>
					<h1>Результат поиска: "{query}"</h1>
					<p>{photos.length} найдено</p>
				</div>

				<div className={styles.contentContainer}>
					<Row gutter={[16, 16]} className={styles.photoGrid}>
						{photos.map((photo) => (
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

					{loading && photos.length > 0 && (
						<div className={styles.loader}>
							<Spin size="large" />
						</div>
					)}

					{!hasMore && photos.length > 0 && <p className={styles.endMessage}>Больше фотографий нет</p>}
				</div>
			</div>
		</>
	);
};
