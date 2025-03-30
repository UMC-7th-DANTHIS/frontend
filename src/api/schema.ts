type hashTagIDInterface = {
  id: string;
  hashTag: string;
};

type DancerGenreInterface = {
  id: string;
  Genre: string;
};

export const hashTagID: hashTagIDInterface[] = [
  { id: '1', hashTag: '강렬한' },
  { id: '2', hashTag: '나른한' },
  { id: '3', hashTag: '에너제틱' },
  { id: '4', hashTag: '유산소' },
  { id: '5', hashTag: '빡센' },
  { id: '6', hashTag: '감성적인' },
  { id: '7', hashTag: '기본기' },
  { id: '8', hashTag: '통통튀는' },
  { id: '9', hashTag: '무거운' },
  { id: '10', hashTag: '아프로' },
  { id: '11', hashTag: '뚝딱이' },
  { id: '12', hashTag: '취미' }
];

export const DanceGenre: DancerGenreInterface[] = [
  { id: '1', Genre: '힙합' },
  { id: '2', Genre: '걸스힙합' },
  { id: '3', Genre: '팝핑' },
  { id: '4', Genre: '락킹' },
  { id: '5', Genre: '왁킹' },
  { id: '6', Genre: '걸리시/힐' },
  { id: '7', Genre: '크럼프' },
  { id: '8', Genre: '텃팅' },
  { id: '9', Genre: '코레오' },
  { id: '10', Genre: 'K-pop' }
];
