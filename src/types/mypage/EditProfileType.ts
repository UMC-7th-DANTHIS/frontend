export interface FormState {
  name: string;
  instagram: string;
  chatting: string;
  introduce: string;
  genre: number[];
  record: string;
  dancerImages: (string | File)[];
}

export interface UserFormState {
  nickname: string;
  gender: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  preferredGenres: number[];
  preferredDancers: number[];
}

export interface ErrorTextProps {
  error: boolean;
}
