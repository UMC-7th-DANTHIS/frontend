// 은/는 처리 함수
const addPostposition = (word: string) => {
  const hasJongseong = (word: string) => {
    const lastChar: string = word[word.length - 1];
    const code: number = lastChar.charCodeAt(0);
    return (code - 0xac00) % 28 !== 0;
  };
  return hasJongseong(word) ? `${word}은` : `${word}는`;
};

export { addPostposition };
