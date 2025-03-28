import { PostListResponse } from '@/types/CommunityInterface';

export interface CommunityPostListOutlet {
  lists: PostListResponse | undefined;
  perData: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
}
