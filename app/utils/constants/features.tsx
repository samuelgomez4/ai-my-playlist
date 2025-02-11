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
      'With this feature, you can use AI to generate a completely new playlist straight from your imagination. The AI will create the playlist and fill it with songs that match the description you provide in the prompt.',
    videoFileName: 'scratch-fvVBqg9jHTAzGDtNzfKr1Zz15Gstfx.mp4',
  },
  {
    Icon: <TbFilterPlus className="text-4xl text-purple-500" />,
    title: ACTIONS.filterSelected,
    description:
      'Do you want a playlist with all the songs from your favorite artist without searching through a long list? With this option, you can select a playlist from your catalog, filter out the songs you want to keep, and create a separate copy instead of editing the original. The AI will use both your selected playlist and the prompt as context to generate the new playlist.',
    videoFileName: 'scratch-fvVBqg9jHTAzGDtNzfKr1Zz15Gstfx.mp4',
  },
  {
    Icon: <RiPlayListFill className="text-4xl text-purple-500" />,
    title: ACTIONS.createBasedOnSelected,
    description:
      'Want a fresh playlist similar to one you already have but without modifying the original? This feature lets you use an existing playlist as context, allowing the AI to generate a new playlist adding new recommended songs based on your prompt.',
    videoFileName: 'scratch-fvVBqg9jHTAzGDtNzfKr1Zz15Gstfx.mp4',
  },
  {
    Icon: <FaPlusCircle className="text-4xl text-purple-500" />,
    title: ACTIONS.addNewSongs,
    description:
      'Use this feature to add new songs to your playlist. The AI will take both your selected playlist and the prompt you provide as context to recommend and add new songs.',
    videoFileName: 'scratch-fvVBqg9jHTAzGDtNzfKr1Zz15Gstfx.mp4',
  },
  {
    Icon: <FaTrash className="text-4xl text-purple-500" />,
    title: ACTIONS.deleteSongs,
    description:
      'Is there an artist who no longer deserves a spot in your favorite playlist? With this feature, you can remove songs from your selected playlist using the prompt you enter.',
    videoFileName: 'scratch-fvVBqg9jHTAzGDtNzfKr1Zz15Gstfx.mp4',
  },
] as const;
