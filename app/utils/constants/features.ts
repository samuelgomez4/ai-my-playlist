import { FaPlayCircle, FaPlusCircle, FaSync, FaTrash, FaMusic } from 'react-icons/fa';

export const ACTIONS = {
  createFromScratch: 'Create Playlist from Scratch',
  createFromSelected: 'Create Playlist from Selected Playlist',
  createBasedOnExisting: 'Create New Playlist Based on Existing',
  addNewSongs: 'Add New Songs to Existing Playlist',
  deleteSongs: 'Delete Songs from Existing Playlist',
};

export const features = [
  {
    Icon: FaPlayCircle,
    title: ACTIONS.createFromScratch,
    description:
      'Start fresh and let AI generate a completely new playlist based on your preferences',
    videoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
  },
  {
    Icon: FaMusic,
    title: ACTIONS.createFromSelected,
    description: 'Use an existing playlist as inspiration for a new curated collection',
    videoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  },
  {
    Icon: FaSync,
    title: ACTIONS.createBasedOnExisting,
    description: 'Transform your favorite playlist with fresh, AI-recommended songs',
    videoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  },
  {
    Icon: FaPlusCircle,
    title: ACTIONS.addNewSongs,
    description: 'Enhance your playlist with AI-suggested tracks that match your style',
    videoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  },
  {
    Icon: FaTrash,
    title: ACTIONS.deleteSongs,
    description: "Refine your playlist by removing songs that don't fit your taste",
    videoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  },
] as const;
