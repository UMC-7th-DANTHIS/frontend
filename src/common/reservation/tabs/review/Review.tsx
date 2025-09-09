import { ClassReview } from '../../../../types/class';
import { ReviewDesktop } from './ReviewDesktop';
import { ReviewMobile } from './ReviewMobile';

export interface ReviewProps {
  review: ClassReview;
  classId: number;
  page: number;
}

export const Review = (props: ReviewProps) => {
  return (
    <>
      <ReviewDesktop {...props} />
      <ReviewMobile {...props} />
    </>
  );
};
