import type { PhotoDto } from "@shared/transport/types";
import type { SimplePhoto } from "../types";

export const mapToSimplePhoto = (photo: PhotoDto): SimplePhoto => ({
	id: photo.id,
	alt: photo.alt_description || "Unsplash Photo",
	url: photo.urls.regular,
	user: {
		name: photo.user.name,
		username: photo.user.username,
	},
});
