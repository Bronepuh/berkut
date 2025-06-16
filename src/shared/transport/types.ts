// src/shared/types/unsplash.ts
export interface PhotoDto {
	id: string;
	slug: string;
	alt_description: string | null;
	description: string | null;
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
		small_s3: string;
	};
	user: {
		id: string;
		username: string;
		name: string;
		portfolio_url: string | null;
		profile_image: {
			small: string;
			medium: string;
			large: string;
		};
	};
	exif?: {
		make: string | null;
		model: string | null;
		exposure_time: string | null;
		aperture: string | null;
		focal_length: string | null;
		iso: number | null;
	};
	links: {
		download: string;
		download_location: string;
		html: string;
		self: string;
	};
}
