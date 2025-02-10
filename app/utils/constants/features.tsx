import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { RiPlayListAddFill, RiPlayListFill } from 'react-icons/ri';
import { TbFilterPlus } from 'react-icons/tb';

export const ACTIONS = {
  createFromScratch: 'Create Playlist from Scratch',
  filterSelected: 'Filter Selected Playlist and Create New',
  createBasedOnSelected: 'Create New Playlist Based on Selected',
  addNewSongs: 'Add New Songs to Selected Playlist',
  deleteSongs: 'Delete Songs from Selected Playlist',
} as const;

export const features = [
  {
    Icon: <RiPlayListAddFill className="text-4xl text-purple-500" />,
    title: ACTIONS.createFromScratch,
    description:
      'Start fresh and let AI generate a completely new playlist based on your preferences',
    videoUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
  },
  {
    Icon: <TbFilterPlus className="text-4xl text-purple-500" />,
    title: ACTIONS.filterSelected,
    description: 'Use an existing playlist as inspiration for a new curated collection',
    videoUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
  },
  {
    Icon: <RiPlayListFill className="text-4xl text-purple-500" />,
    title: ACTIONS.createBasedOnSelected,
    description: 'Transform your favorite playlist with fresh, AI-recommended songs',
    videoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  },
  {
    Icon: <FaPlusCircle className="text-4xl text-purple-500" />,
    title: ACTIONS.addNewSongs,
    description: 'Enhance your playlist with AI-suggested tracks that match your style',
    videoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  },
  {
    Icon: <FaTrash className="text-4xl text-purple-500" />,
    title: ACTIONS.deleteSongs,
    description: "Refine your playlist by removing songs that don't fit your taste",
    videoUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
  },
] as const;
