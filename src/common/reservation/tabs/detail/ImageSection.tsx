import styled from 'styled-components';
import { ImageModal } from '../../ImageModal';
import { useEffect, useMemo, useState } from 'react';

interface ImagesSectionProps {
  images: string[];
  profileImage?: string;
}

export const ImagesSection = ({ images, profileImage }: ImagesSectionProps) => {
  const effectiveImages = useMemo(() => {
    const list = (images ?? [])
      .map((img) => (img == null ? '' : String(img).trim()))
      .filter(Boolean);
    if (list.length > 0) return list;
    const p = profileImage?.trim();
    return p ? [p] : [];
  }, [images, profileImage]);

  const [isModalOpen, setIsModalOpen] = useState<boolean[]>(() =>
    new Array(effectiveImages.length).fill(false)
  );

  useEffect(() => {
    setIsModalOpen(new Array(effectiveImages.length).fill(false));
  }, [effectiveImages]);

  if (effectiveImages.length === 0) {
    return null;
  }

  return (
    <>
      <Images>
        {effectiveImages.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            src={image}
            alt={`class #${index}`}
            onClick={() => {
              setIsModalOpen((prev) => {
                const next = [...prev];
                while (next.length <= index) next.push(false);
                next[index] = true;
                return next;
              });
            }}
          />
        ))}
      </Images>

      {effectiveImages.map(
        (image, index) =>
          isModalOpen[index] && (
            <ImageModal key={index} imgUrl={image} setIsModalOpen={setIsModalOpen} index={index} />
          )
      )}
    </>
  );
};

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin-top: 20px;
  gap: 6px;
  cursor: pointer;

  ${({ theme }) => theme.media.tablet} {
    gap: 35px;
  }
`;
const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
`;
