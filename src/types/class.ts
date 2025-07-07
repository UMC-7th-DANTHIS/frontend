export type SimpleDanceClass = {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
};

export type Dancer = {
  name: string;
  profileImage: string;
  openChatUrl: string;
};

export type ClassDetails = {
  videoUrl: string;
  description: string;
  targetAudience: string;
  hashtags: number[];
  danceClassImages: string[];
  dancerId: number;
};

export type DanceClass = {
  id: number;
  className: string;
  dancer: Dancer;
  genre: number;
  pricePerSession: number;
  difficulty: number;
  details: ClassDetails;
};

export type LikedClass = SimpleDanceClass & {
  genre: string;
  hashtagIds: number[];
};
