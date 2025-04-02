import axiosInstance from '../api/axios-instance';

export interface PresignedUrlInterface {
  presignedUrl: string;
  fileUrl: string;
}

const getPresignedUrls = async (
  images: string[]
): Promise<PresignedUrlInterface[] | void> => {
  try {
    const fileExtensions: string = images
      .map((image) => image.split('.').pop())
      .join('&fileExtensions=');
    const response = await axiosInstance.post(
      `/images/post?fileExtensions=${fileExtensions}`
    );

    return response.data;
  } catch (error) {
    alert(error);
  }
};

export default getPresignedUrls;
