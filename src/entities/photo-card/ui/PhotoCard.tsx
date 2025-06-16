import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "@shared/store/favorites";
import type { SimplePhoto } from "@shared/transport/types";
import styles from "./photo-card.module.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { BASE_PATH } from "@shared/utils/constants";

export const PhotoCard: React.FC<{ photo: SimplePhoto }> = ({ photo }) => {
	const navigate = useNavigate();
	const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isFavorite(photo.id)) {
			removeFavorite(photo.id);
		} else {
			addFavorite(photo);
		}
	};

	const handlePhotoClick = () => {
		navigate(`/${BASE_PATH}/photos/${photo.id}`);
	};

	return (
		<div className={styles.photoCard} onClick={handlePhotoClick}>
			<div className={styles.imageContainer}>
				<img src={photo.url} alt={photo.alt} className={styles.photoImage} />
				<div className={styles.favoriteIcon} onClick={handleFavoriteClick}>
					{isFavorite(photo.id) ? <HeartFilled style={{ color: "#ff4d4f" }} /> : <HeartOutlined />}
				</div>
			</div>
		</div>
	);
};
