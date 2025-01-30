'use server';

import { getAccessToken } from './getAccessToken';
import { searchSong } from './searchEndpoint';

export async function getSongsToAdd(songsSuggestions: Array<string>) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { ok: false, message: 'There was an error. Try again later.' };
  }
  const songsToAddPromises = songsSuggestions.map((song) => {
    return searchSong({ accessToken, query: song });
  });
  try {
    const songsToAdd = await Promise.all(songsToAddPromises);
    return { ok: true, songsToAdd };
  } catch (error) {
    console.error('Error:', error);
    return { ok: false, message: 'There was an error fetching the songs. Try again later' };
  }
}
