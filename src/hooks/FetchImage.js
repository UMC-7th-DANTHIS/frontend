import axiosInstance from '../api/axios-instance';

const FetchImage = ({ images }) => {
  const PostImage = async () => {
    try {
      const fileExtensions = images.map(() => 'jpg').join('&fileExtensions=');
      const response = await axiosInstance.post(
        `/image/post?fileExtensions=${fileExtensions}`
      );
    } catch (error) {
      alert(error);
    }
    PostImage();
  };
};

export default FetchImage;
