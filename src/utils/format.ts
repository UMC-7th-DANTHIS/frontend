// 은/는 처리 함수
const addPostposition = (word: string) => {
  const hasJongseong = (word: string) => {
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);
    return (code - 0xac00) % 28 !== 0;
  };
  return hasJongseong(word) ? `${word}은` : `${word}는`;
};

// 가격 포맷 함수
const formatPrice = (price: number | undefined) => {
  return price ? price.toLocaleString('ko-KR') : '0';
};

export { addPostposition, formatPrice };
