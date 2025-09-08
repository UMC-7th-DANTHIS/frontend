export interface DanceClassProps {
  id: number;
  className: string;
  dancerName: string;
  thumbnailImage: string;
}

export interface FetchTakeClassResponse {
  classlist: DanceClassProps[];
  totalElements: number;
}

export interface PhotoUploadProps {
  setSelectedImage: (images: string[]) => void;
  disabled: boolean;
}

export interface ReviewDataProps {
  title: string;
  content: string;
  rating: number;
  reviewImages: string[];
}

export interface LocationState {
  className?: string;
}

export interface ReviewFormProps {
  title: string;
  review: string;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReview: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ReviewBoxProps {
  imageCount: number;
}

export interface TextareaProps {
  hasImage: boolean;
}

export interface ReviewStarProps {
  rating: number;
  setRating: (value: number) => void;
}
