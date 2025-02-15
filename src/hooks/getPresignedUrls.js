import axiosInstance from '../api/axios-instance';

const getPresignedUrls = async (images) => {
  try {
    const fileExtensions = images
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
