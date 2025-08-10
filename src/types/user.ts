import { CommonResponse } from './common';

export type MyInfo = {
  nickname: string;
  gender: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  preferredGenres: number[];
  preferredDancers: number[];
};

export type ResponseMyInfo = CommonResponse<MyInfo>;
