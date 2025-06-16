import axios from "axios";

const API_URL = "https://api.unsplash.com";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const FETCH_PICTURES_COUNT = 8;

export const photosTransport = {
	getRandomPhotos: async (count: number = FETCH_PICTURES_COUNT) => {
		const response = await axios.get(`${API_URL}/photos/random`, {
			params: { count, client_id: ACCESS_KEY },
		});
		return response.data;
	},

	searchPhotos: async (query: string, page: number = 1) => {
		const response = await axios.get(`${API_URL}/search/photos`, {
			params: { query, page, per_page: 20, client_id: ACCESS_KEY },
		});
		return response.data;
	},

	getPhotoById: async (id: string) => {
		const response = await axios.get(`${API_URL}/photos/${id}`, {
			params: { client_id: ACCESS_KEY },
		});
		return response.data;
	},
	downloadPhoto: async (downloadLocation: string): Promise<string | null> => {
		try {
			// Сначала запрашиваем разрешение на скачивание
			const response = await axios.get(downloadLocation, {
				headers: {
					Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
				},
			});

			// Получаем фактическую ссылку для скачивания
			return response.data.url;
		} catch (error) {
			console.error("Error getting download URL:", error);
			return null;
		}
	},
};
