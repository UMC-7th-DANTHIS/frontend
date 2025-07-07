import api from './api';
import { MyInfoResponse } from '../types/user';

export const fetchMyInfo = async (): Promise<MyInfoResponse> => {
  const { data } = await api.get(`/users/me`);
  return data;
};
