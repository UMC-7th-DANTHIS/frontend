import React from "react";
import styled from "styled-components";

const FileUploader = ({ Icon, accept }) => {
  // 파일 업로드 핸들러
  const handleUpload = (e) => {
    const file = e.target.files[0]; // 파일 가져오기
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Rectangle htmlFor="file">
        <Icon />
      </Rectangle>
      <HiddenInput
        type="file"
        id="file"
        onChange={handleUpload}
        accept={accept}
      ></HiddenInput>
    </Container>
  );
};

export default FileUploader;

const Container = styled.div`
  width: 100%;
`;
const Rectangle = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
  border-radius: 7px;
  background: #d9d9d9;
`;
const HiddenInput = styled.input`
  display: none;
`;
