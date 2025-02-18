import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';

import SearchClass from '../components/Search/SearchClass';
import SearchCommunity from '../components/Search/SearchCommunity';
import SearchDancer from '../components/Search/SearchDancer';

const SearchWrapper = () => {
  const { select } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [danceQuery, setDanceQuery] = useState(query);

  const { selectedFilter } = useOutletContext();

  useEffect(() => {
    if (selectedFilter) {
      let tmp = query + '&hashtagId=' + selectedFilter;
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
};

export default SearchWrapper;
