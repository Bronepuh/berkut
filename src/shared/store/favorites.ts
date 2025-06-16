import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SimplePhoto } from "@shared/transport/types";

interface FavoritesState {
	favorites: SimplePhoto[];
	addFavorite: (photo: SimplePhoto) => void;
	removeFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: [],
			addFavorite: (photo) =>
				set({
					favorites: [...get().favorites, photo],
				}),
			removeFavorite: (id) =>
				set({
					favorites: get().favorites.filter((f) => f.id !== id),
				}),
			isFavorite: (id) => get().favorites.some((f) => f.id === id),
		}),
		{
			name: "favorites-store",
			// Опционально: миграции для совместимости версий
			migrate: (persistedState) => {
				// Логика миграции при изменении структуры данных
				return persistedState as FavoritesState;
			},
		},
	),
);
