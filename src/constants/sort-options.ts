export interface SortOption {
    label: string;
    value: string; // The property to sort by
}

export const SORT_OPTIONS: SortOption[] = [
    { label: 'Date Added', value: 'date_added' },
    { label: 'Year', value: 'year' },
    { label: 'Rating', value: 'rating' },
    { label: 'Seeds', value: 'seeds' },
    { label: 'Peers', value: 'peers' },
    { label: 'Downloads', value: 'download_count' },
    { label: 'Likes', value: 'like_count' },
    { label: 'Alphabetical', value: 'title' },
];
