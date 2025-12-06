import { Response } from './index';

// 유저 정보 조회 Interface

export interface UserResponse extends Response {
  data: UserData;
}

export interface UserData {
  userId: number;
  nickname: string;
  gender: string | null;
  email: string;
  phoneNumber: number | null;
  profileImage: string;
  preferredGenres: string[];
  preferredDancers: string[];
}
