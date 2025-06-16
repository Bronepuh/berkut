// Упрощенный тип для использования в компонентах
export interface SimplePhoto {
	id: string;
	alt: string;
	url: string;
	user: {
		name: string;
		username: string;
	};
}
