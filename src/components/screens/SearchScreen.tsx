import ReportContainer from '@components/widgets/report-history/ReportContainer';
import { Report } from '@data/interfaces';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
} from 'react-instantsearch-hooks-web';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID!, process.env.REACT_APP_ALGOLIA_API_KEY!);

function Hit({ hit }: any) {
  console.log(hit)
    const {title, date, tags, uuid, files, authorId} = hit
    const report:Report = { title, date, tags, uuid, files, authorId}
  return (
    <ReportContainer report ={report} />
  );
}

function SearchScreen() {
  return (
    <InstantSearch searchClient={searchClient} indexName="report_text">
      <SearchBox className='search-input' />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
}

export default SearchScreen