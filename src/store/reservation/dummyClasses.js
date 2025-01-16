const dummyClasses = [
  { id: 1, genre: '힙합', title: '힙합 클래스', dancer: 'Parana' },
  { id: 2, genre: '힙합', title: 'Smoke - Dynamic Duo', dancer: 'Parana' },
  { id: 3, genre: '힙합', title: 'APT. - Learner class', dancer: 'Yechan' },
  { id: 4, genre: '힙합', title: 'EZ - Master class', dancer: 'Funky Y' },
  { id: 5, genre: '힙합', title: 'LEGO Hiphop class', dancer: 'Lego' },
  { id: 6, genre: '힙합', title: 'Sneakers - ITZY', dancer: 'Koi' },
  { id: 9, genre: '걸스힙합', title: '걸스힙합 클래스 1', dancer: 'Yechan' },
  { id: 10, genre: '걸스힙합', title: '걸스힙합 클래스 2', dancer: 'Yechan' },
  { id: 11, genre: '걸스힙합', title: '걸스힙합 클래스 3', dancer: 'Funky Y' },
  { id: 12, genre: '걸스힙합', title: '걸스힙합 클래스 4', dancer: 'Funky Y' },
  { id: 13, genre: '걸스힙합', title: '걸스힙합 클래스 5', dancer: 'Lego' },
  { id: 14, genre: '걸스힙합', title: '걸스힙합 클래스 6', dancer: 'Lego' },
  { id: 15, genre: '걸스힙합', title: '걸스힙합 클래스 7', dancer: 'Koi' },
  { id: 16, genre: '걸스힙합', title: '걸스힙합 클래스 8', dancer: 'Koi' },
  { id: 17, genre: '팝핑', title: '팝핑 클래스 1', dancer: 'Parana' },
  { id: 18, genre: '팝핑', title: '팝핑 클래스 2', dancer: 'Parana' },
  { id: 19, genre: '팝핑', title: '팝핑 클래스 3', dancer: 'Yechan' },
  { id: 20, genre: '팝핑', title: '팝핑 클래스 4', dancer: 'Yechan' },
  { id: 21, genre: '팝핑', title: '팝핑 클래스 5', dancer: 'Funky Y' },
  { id: 22, genre: '팝핑', title: '팝핑 클래스 6', dancer: 'Funky Y' },
  { id: 23, genre: '걸스힙합', title: 'Tania 걸스힙합', dancer: 'Tania' },
  { id: 25, genre: '락킹', title: '락킹 클래스 1', dancer: 'Lego' },
  { id: 26, genre: '락킹', title: '락킹 클래스 2', dancer: 'Lego' },
  { id: 27, genre: '락킹', title: '락킹 클래스 3', dancer: 'Koi' },
  { id: 28, genre: '락킹', title: '락킹 클래스 4', dancer: 'Koi' },
  { id: 29, genre: '락킹', title: '락킹 클래스 5', dancer: 'Parana' },
  { id: 30, genre: '락킹', title: '락킹 클래스 6', dancer: 'Parana' },
  { id: 31, genre: '락킹', title: '락킹 클래스 7', dancer: 'Yechan' },
  { id: 32, genre: '락킹', title: '락킹 클래스 8', dancer: 'Yechan' },
  {
    id: 33,
    genre: '걸리시/힐',
    title: '걸리시/힐 클래스 1',
    dancer: 'Funky Y'
  },
  {
    id: 34,
    genre: '걸리시/힐',
    title: '걸리시/힐 클래스 2',
    dancer: 'Funky Y'
  },
  { id: 35, genre: '걸리시/힐', title: '걸리시/힐 클래스 3', dancer: 'Lego' },
  { id: 36, genre: '걸리시/힐', title: '걸리시/힐 클래스 4', dancer: 'Lego' },
  { id: 37, genre: '걸리시/힐', title: '걸리시/힐 클래스 5', dancer: 'Koi' },
  { id: 38, genre: '걸리시/힐', title: '걸리시/힐 클래스 6', dancer: 'Koi' },
  { id: 39, genre: '걸리시/힐', title: '걸리시/힐 클래스 7', dancer: 'Parana' },
  { id: 41, genre: '크럼프', title: '크럼프 클래스 1', dancer: 'Yechan' },
  { id: 42, genre: '크럼프', title: '크럼프 클래스 2', dancer: 'Yechan' },
  { id: 43, genre: '크럼프', title: '크럼프 클래스 3', dancer: 'Funky Y' },
  { id: 44, genre: '크럼프', title: '크럼프 클래스 4', dancer: 'Funky Y' },
  { id: 45, genre: '크럼프', title: '크럼프 클래스 5', dancer: 'Lego' },
  { id: 49, genre: '텃팅', title: '텃팅 클래스 1', dancer: 'Koi' },
  { id: 50, genre: '텃팅', title: '텃팅 클래스 2', dancer: 'Koi' },
  { id: 51, genre: '텃팅', title: '텃팅 클래스 3', dancer: 'Parana' },
  { id: 52, genre: '텃팅', title: '텃팅 클래스 4', dancer: 'Parana' },
  { id: 53, genre: '텃팅', title: '텃팅 클래스 5', dancer: 'Yechan' },
  { id: 54, genre: '텃팅', title: '텃팅 클래스 6', dancer: 'Yechan' },
  { id: 55, genre: '텃팅', title: '텃팅 클래스 7', dancer: 'Funky Y' },
  { id: 56, genre: '텃팅', title: '텃팅 클래스 8', dancer: 'Funky Y' },
  { id: 57, genre: '코레오', title: '코레오 클래스 1', dancer: 'Lego' },
  { id: 58, genre: '코레오', title: '코레오 클래스 2', dancer: 'Lego' },
  { id: 59, genre: '코레오', title: '코레오 클래스 3', dancer: 'Koi' },
  { id: 60, genre: '코레오', title: '코레오 클래스 4', dancer: 'Koi' },
  { id: 61, genre: '코레오', title: '코레오 클래스 5', dancer: 'Parana' },
  { id: 62, genre: '코레오', title: '코레오 클래스 6', dancer: 'Parana' },
  { id: 65, genre: 'K-pop', title: 'K-pop 클래스 1', dancer: 'Yechan' },
  { id: 66, genre: 'K-pop', title: 'K-pop 클래스 2', dancer: 'Yechan' },
  { id: 67, genre: 'K-pop', title: 'K-pop 클래스 3', dancer: 'Funky Y' },
  { id: 68, genre: 'K-pop', title: 'K-pop 클래스 4', dancer: 'Funky Y' },
  { id: 69, genre: 'K-pop', title: 'K-pop 클래스 5', dancer: 'Lego' },
  { id: 70, genre: 'K-pop', title: 'K-pop 클래스 6', dancer: 'Lego' },
  { id: 71, genre: 'K-pop', title: 'K-pop 클래스 7', dancer: 'Koi' },
  { id: 72, genre: 'K-pop', title: 'K-pop 클래스 8', dancer: 'Koi' }
];

export default dummyClasses;
