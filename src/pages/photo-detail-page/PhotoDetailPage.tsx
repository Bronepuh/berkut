import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Button } from "antd";
import { HeartFilled, HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import { useFavoritesStore } from "@shared/store/favorites";
import styles from "./photo-detail.module.scss";
import { photosTransport } from "@shared/transport/photos-transport";
import type { PhotoDto } from "@shared/transport/types";
import { mapToSimplePhoto } from "src/entities/photo-card/model/maps/map-to-domain";

export const PhotoDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [photo, setPhoto] = useState<PhotoDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [downloading, setDownloading] = useState(false);
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

	useEffect(() => {
		const fetchPhoto = async () => {
			if (!id) return;

			try {
				const data = await photosTransport.getPhotoById(id);
				setPhoto(data);
			} catch (error) {
				console.error("Photo fetch error:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPhoto();
	}, [id]);

	const handleFavoriteClick = () => {
		if (!photo) return;

		// Преобразуем в SimplePhoto перед сохранением
		const simplePhoto = mapToSimplePhoto(photo);

		if (isFavorite(photo.id)) {
			removeFavorite(photo.id);
		} else {
			addFavorite(simplePhoto);
		}
	};

	const handleDownload = async () => {
		if (!photo.links.download_location) return;

		try {
			setDownloading(true);
			const downloadUrl = await photosTransport.downloadPhoto(photo.links.download_location);

			if (downloadUrl) {
				const link = document.createElement("a");
				link.href = downloadUrl;
				link.download = `unsplash-${photo.id}.jpg`;
				link.target = "_blank";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		} catch (error) {
			console.error("Download error:", error);
			if (photo.links.html) {
				window.open(photo.links.html, "_blank");
			}
		} finally {
			setDownloading(false);
		}
	};

	if (loading) return <Spin size="large" />;
	if (!photo) return <div>Фото не найдено</div>;

	return (
		<div className={styles.wrapper}>
			{photo.urls?.regular && (
				<div className={styles.backgroundOverlay} style={{ backgroundImage: `url(${photo.urls.regular})` }}>
					<div className={styles.darkGradient} />
				</div>
			)}

			<div className={styles.pageContainer}>
				<div className={styles.topPanel}>
					<div className={styles.userInfo}>
						{photo.user?.profile_image?.medium && (
							<img src={photo.user.profile_image.medium} alt="avatar" className={styles.userAvatar} />
						)}
						<div className={styles.userText}>
							<div className={styles.name}>{photo.user?.name?.toUpperCase() || "Unknown"}</div>
							<div className={styles.userName}>{photo.user?.username ? `@${photo.user.username}` : "Unknown"}</div>
						</div>
					</div>

					<div className={styles.actions}>
						<Button
							className={styles.favoriteButton}
							icon={isFavorite(photo.id) ? <HeartFilled /> : <HeartOutlined />}
							onClick={handleFavoriteClick}
						/>
						<Button
							className={styles.downloadButton}
							icon={<DownloadOutlined />}
							onClick={handleDownload}
							loading={downloading}
							disabled={downloading}
						>
							<span className={styles.buttonText}>{downloading ? "Downloading..." : "Download"}</span>
						</Button>
					</div>
				</div>

				<div className={styles.contentContainer}>
					<div className={styles.photoCard}>
						<div className={styles.imageContainer}>
							<img src={photo.urls?.regular} alt={photo.alt_description ?? "Photo"} className={styles.photoImage} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
