import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';

import SearchClass from '../components/Search/SearchClass';
import SearchCommunity from '../components/Search/SearchCommunity';
import SearchDancer from '../components/Search/SearchDancer';

import { SearchFilterOutlet } from '@/types/Context/SearchFilter';

const SearchWrapper = () => {
  const { select } = useParams<string>();
  const [searchParams] = useSearchParams();
  const query: string | null = searchParams.get('query');

  const [danceQuery, setDanceQuery] = useState<string | null>(query);

  const { selectedFilter } = useOutletContext<SearchFilterOutlet>();

  useEffect(() => {
    if (selectedFilter) {
      let tmp: string = query + '&hashtagId=' + selectedFilter;
      setDanceQuery(tmp);
    } else setDanceQuery(query);
  }, [selectedFilter, query]);

  if (select === 'dance-classes') {
    return <SearchClass query={danceQuery} select={select} />;
  }
  if (select === 'dancers') {
    return <SearchDancer query={query} select={select} />;
  }
  if (select === 'posts') {
    return <SearchCommunity query={query} select={select} />;
  }

  return <div>잘못된 경로입니다.</div>;
};

export default SearchWrapper;
