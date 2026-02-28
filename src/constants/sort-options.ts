export interface SortOption {
    label: string;
    value: string;
    sortBy: string;
    orderBy: 'asc' | 'desc';
}

export const SORT_OPTIONS: SortOption[] = [
    { label: 'Latest Added', value: 'latest-added', sortBy: 'date_added', orderBy: 'desc' },
    { label: 'Oldest Added', value: 'oldest-added', sortBy: 'date_added', orderBy: 'asc' },
    { label: 'Newest Year', value: 'newest-year', sortBy: 'year', orderBy: 'desc' },
    { label: 'Oldest Year', value: 'oldest-year', sortBy: 'year', orderBy: 'asc' },
    { label: 'Rating', value: 'rating', sortBy: 'rating', orderBy: 'desc' },
    { label: 'Seeds', value: 'seeds', sortBy: 'seeds', orderBy: 'desc' },
    { label: 'Peers', value: 'peers', sortBy: 'peers', orderBy: 'desc' },
    { label: 'Downloads', value: 'downloads', sortBy: 'download_count', orderBy: 'desc' },
    { label: 'Likes', value: 'likes', sortBy: 'like_count', orderBy: 'desc' },
    { label: 'Alphabetical', value: 'alphabetical', sortBy: 'title', orderBy: 'asc' },
];
