import { useState, useEffect } from 'react';
import {
  useLocation,
  useSearchParams,
  useOutletContext
} from 'react-router-dom';

import SearchClass from '../common/Search/SearchClass';
import SearchCommunity from '../common/Search/SearchCommunity';
import SearchDancer from '../common/Search/SearchDancer';

import { SearchFilterOutlet } from '@/types/Context/SearchFilter';

const SearchWrapper = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const query: string | null = searchParams.get('query');

  const defaultQuery: 'dance-classes' | 'dancers' | 'posts' = pathname.includes(
    'posts'
  )
    ? 'posts'
    : pathname.includes('dancers')
      ? 'dancers'
      : 'dance-classes';

  const [danceQuery, setDanceQuery] = useState<string | null>(query);

  const { selectedFilter } = useOutletContext<SearchFilterOutlet>();

  useEffect(() => {
    if (selectedFilter) {
      let tmp: string = query + '&hashtagId=' + selectedFilter;
      setDanceQuery(tmp);
    } else setDanceQuery(query);
  }, [selectedFilter, query]);

  if (defaultQuery === 'dance-classes') {
    return <SearchClass query={danceQuery} select={defaultQuery} />;
  }
  if (defaultQuery === 'dancers') {
    return <SearchDancer query={query} select={defaultQuery} />;
  }
  if (defaultQuery === 'posts') {
    return <SearchCommunity query={query} select={defaultQuery} />;
  }

  return <div>잘못된 경로입니다.</div>;
};

export default SearchWrapper;
