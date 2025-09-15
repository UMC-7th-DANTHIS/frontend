import styled from 'styled-components';
import { ImageModal } from '../../ImageModal';
import { useState } from 'react';

interface ImagesSectionProps {
  images: string[];
  profileImage?: string;
}

export const ImagesSection = ({ images, profileImage }: ImagesSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>(new Array(images.length).fill(false));

  return (
    <>
      <Images>
        {images[0] === '' ? (
          <Image src={profileImage} alt={`profile`} onClick={() => setIsModalOpen([true])} />
        ) : (
          images.map((image, index) =>
            image ? (
              <Image
                key={index}
                src={image}
                alt={`class #${index}`}
                onClick={() => {
                  const newState = [...isModalOpen];
                  newState[index] = true;
                  setIsModalOpen(newState);
                }}
              />
            ) : null
          )
        )}
      </Images>

      {images.map(
        (image, index) =>
          isModalOpen[index] && <ImageModal key={index} imgUrl={image} setIsModalOpen={setIsModalOpen} index={index} />
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
