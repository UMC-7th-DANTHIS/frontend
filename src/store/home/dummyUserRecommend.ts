import {
  DummyClass01,
  DummyClass02,
  DummyClass03,
  DummyClass04,
  DummyDancer01,
  DummyDancer02,
  DummyDancer03,
  DummyDancer04
} from '../../assets/main/ForDummy';

export const CONST_RECOMMEND_DANCER = {
  dancers: [
    {
      id: 1,
      dancerName: 'Minseo',
      genres: ['코레오'],
      images: [DummyDancer01]
    },
    {
      id: 2,
      dancerName: 'Waackxxxy',
      genres: ['왁킹'],
      images: [DummyDancer02]
    },
    {
      id: 3,
      dancerName: 'Koi',
      genres: ['락킹'],
      images: [DummyDancer03]
    },
    {
      id: 4,
      dancerName: 'Hannah',
      genres: ['힐오'],
      images: [DummyDancer04]
    }
  ]
};

export const CONST_RECOMMEND_CLASS = {
  page: 1,
  totalPages: 1,
  totalElements: 1,
  danceClasses: [
    {
      id: 1,
      className: 'EZ-Master class',
      dancerName: 'Funky Y',
      dates: [],
      days: [],
      thumbnailImage: DummyClass01,
      genre: '왁킹',
      hashtagIds: [3, 4]
    },
    {
      id: 2,
      className: 'Worst behavior',
      dancerName: 'Groot',
      dates: [],
      days: [],
      thumbnailImage: DummyClass02,
      genre: '코레오',
      hashtagIds: [3, 5, 4]
    },
    {
      id: 3,
      className: 'LEGO Hiphop class',
      dancerName: 'LEGO',
      dates: [],
      days: [],
      thumbnailImage: DummyClass03,
      genre: '힙합',
      hashtagIds: [7]
    },
    {
      id: 4,
      className: 'APT.- Learner class',
      dancerName: 'Funky Y',
      dates: [],
      days: [],
      thumbnailImage: DummyClass04,
      genre: '코레오',
      hashtagIds: [12, 11, 8]
    }
  ]
};
