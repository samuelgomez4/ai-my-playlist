export type PlaylistInfo = {
  id: string;
  name: string;
  description: string;
  songs: {
    id: string;
    title: string;
    artists: string[];
    album: string;
    image: string;
    releaseDate: string;
    addedOn: string;
    duration: string;
  }[];
};

export type PlaylistsInfo = Record<string, PlaylistInfo>;
export type Songs = PlaylistInfo['songs'];
export type Song = Songs[number];
export type Image = Song['image'];
export interface PlaylistBasicInfo extends Pick<PlaylistInfo, 'id' | 'name'> {
  image: Image;
}
export type Id = PlaylistBasicInfo['id'];
