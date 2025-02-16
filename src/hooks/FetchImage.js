import axiosInstance from '../api/axios-instance';

const FetchImage = ({ images }) => {
  const PostImage = async () => {
    try {
      console.log('여기까지도 왔음');
      const fileExtensions = images.map(() => 'jpg').join('&fileExtensions=');
      const response = await axiosInstance.post(
        `/image/post?fileExtensions=${fileExtensions}`
      );
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
    PostImage();
  };
};

export default FetchImage;
