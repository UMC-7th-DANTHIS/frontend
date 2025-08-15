import { postChat } from '../../api/reservation';
import { useMutation } from '@tanstack/react-query';

export default function usePostChat() {
  return useMutation({
    mutationFn: postChat,
    onSuccess: (data) => {
      window.open(data.data?.openChatUrl);
    },
    onError: (error) => {
      console.error('❌ 1:1 채팅 신청 중 오류 발생:', error);
    }
  });
}
