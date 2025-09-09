export interface DancerPictureProps {
  isFor: 'edit' | 'create';
  images: (File | string | null)[];
  handleFormChange: (field: string, value: (File | string | null)[]) => void;
}
