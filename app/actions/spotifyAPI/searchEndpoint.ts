import type { Song } from '@/types/playlist';
import type { SearchRes } from './types/SearchRes';
import { formatSongToAdd } from './utils/formatSongsToAdd';

function getSearchEndpoint(query: string) {
  const queryParams = {
    q: query,
    type: 'track',
    limit: '1',
  };
  const searchParams = new URLSearchParams(queryParams);
  const queryParamsString = searchParams.toString();
  return `https://api.spotify.com/v1/search?${queryParamsString}`;
}

export async function searchSong({
  query,
  accessToken,
}: {
  query: string;
  accessToken: string;
}): Promise<Song> {
  const searchEndpoint = getSearchEndpoint(query);
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${accessToken}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const resp = await fetch(searchEndpoint, {
    ...requestOptions,
  });
  const data: SearchRes = await resp.json();
  const song = data.tracks.items[0];
  return formatSongToAdd(song);
}
