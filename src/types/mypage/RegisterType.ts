export interface RegisterClassProps {
  id: number;
  thumbnailImage: string;
  className: string;
}

export interface RegisterDetailProps {
  className: string;
  dancer?: {
    profileImage: string;
  };
}

export interface BookingUser {
  userId: number;
  profileImage: string;
  nickname: string;
}

export interface BookingUserResponse {
  users: BookingUser[];
  totalElements: number;
}
