interface View {
	title: string;
	endpoint: string;
}

export const carouselSectionsList: Record<string, View> = {
	trending: {
		title: 'Trending',
		endpoint: 'trending/movie/day'
	},
	now_playing: {
		title: 'Now playing',
		endpoint: 'movie/now_playing'
	},
	upcoming: {
		title: 'Upcoming',
		endpoint: 'movie/now_playing'
	}
};
