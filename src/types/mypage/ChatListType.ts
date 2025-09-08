export interface Chat {
  dancerId: number;
  dancerName: string;
  profileImage?: string;
}

export interface FetchUserChatResponse {
  chats: Chat[];
  totalDancers: number;
}
