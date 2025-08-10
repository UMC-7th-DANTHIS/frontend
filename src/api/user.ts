import api from './api';
import { ResponseMyInfo } from '../types/user';

export const fetchMyInfo = async (): Promise<ResponseMyInfo> => {
  const { data } = await api.get(`/users/me`);
  return data;
};
