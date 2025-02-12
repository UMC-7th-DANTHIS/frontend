import { useParams, useSearchParams } from 'react-router-dom';
import SearchClass from '../components/Search/SearchClass';
import SearchCommunity from '../components/Search/SearchCommunity';
import SearchDancer from '../components/Search/SearchDancer';

const SearchWrapper = () => {
  const { select } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  if (select === 'dance-classes') {
    return <SearchClass query={query} select={select} />;
  }
  if (select === 'dancers') {
    return <SearchDancer query={query} select={select} />;
  }
  if (select === 'posts') {
    return <SearchCommunity query={query} select={select} />;
  }
};

export default SearchWrapper;
