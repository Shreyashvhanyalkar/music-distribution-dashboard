export interface Track {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  genre: string;
  status: string;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}