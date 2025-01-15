export const playlists = [
  {
    id: 1,
    name: 'Summer Vibes',
    songCount: 25,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    songs: [
      {
        id: 1,
        title: 'Summer Nights',
        artist: 'The Beach Boys',
        album: 'Summer Dreams',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
        releaseDate: 'June 15, 2023',
        addedOn: 'July 1, 2023',
        duration: '3:45',
      },
      {
        id: 2,
        title: 'Sunset Vibes',
        artist: 'Tropical Waves',
        album: 'Beach Life',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
        releaseDate: 'May 20, 2023',
        addedOn: 'June 25, 2023',
        duration: '4:20',
      },
    ],
  },
  {
    id: 2,
    name: 'Workout Mix',
    songCount: 30,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    songs: [
      {
        id: 1,
        title: 'Summer Nights',
        artist: 'The Beach Boys',
        album: 'Summer Dreams',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
        releaseDate: 'June 15, 2023',
        addedOn: 'July 1, 2023',
        duration: '3:45',
      },
      {
        id: 2,
        title: 'Sunset Vibes',
        artist: 'Tropical Waves',
        album: 'Beach Life',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
        releaseDate: 'May 20, 2023',
        addedOn: 'June 25, 2023',
        duration: '4:20',
      },
    ],
  },
  {
    id: 3,
    name: 'Chill Beats',
    songCount: 40,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    songs: [
      {
        id: 1,
        title: 'Summer Nights',
        artist: 'The Beach Boys',
        album: 'Summer Dreams',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
        releaseDate: 'June 15, 2023',
        addedOn: 'July 1, 2023',
        duration: '3:45',
      },
      {
        id: 2,
        title: 'Sunset Vibes',
        artist: 'Tropical Waves',
        album: 'Beach Life',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
        releaseDate: 'May 20, 2023',
        addedOn: 'June 25, 2023',
        duration: '4:20',
      },
    ],
  },
];

export type PlaylistsInfo = typeof playlists;
export type PlaylistInfo = PlaylistsInfo[number];
