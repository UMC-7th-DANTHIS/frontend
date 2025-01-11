import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as VideoIcon } from "../../../assets/video.svg";

const VideoUploader = ({ updateForm }) => {
  const [video, setVideo] = useState(null); // 비디오 파일
  const [preview, setPreview] = useState(""); // 미리보기 url

  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // 파일 가져오기
    console.log(file);

    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      setPreview(URL.createObjectURL(file)); // 미리보기 url 생성
    }
  };

  return (
    <Container>
      <Rectangle htmlFor="file">
        {video === null && <VideoIcon />}
        {preview && <Preview src={preview} controls />}
      </Rectangle>

      {/* 파일 선택 */}
      <input
        type="file"
        id="file"
        accept="video/*"
        onChange={handleVideoChange}
      />
    </Container>
  );
};

export default VideoUploader;

const Container = styled.div`
  display: flex;
  width: 589px;
  height: 200px;
  flex-shrink: 0;
  margin-top: 25px;
  margin-bottom: 46px;
`;
const Rectangle = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background: #d9d9d9;
  overflow: hidden;
`;
// const HiddenInput = styled.input`
//   display: none;
// `;
const Preview = styled.video`
  width: 100%;
`;
