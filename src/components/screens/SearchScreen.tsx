import ReportContainer from '@components/widgets/report-history/ReportContainer';
import { Report } from '@data/interfaces';
import algoliasearch from 'algoliasearch';
import {useSelector} from 'react-redux'
import {RootState} from '@redux/store';
import {
  InstantSearch,
  SearchBox,
  Hits,
} from 'react-instantsearch-hooks-web';
import BottomNavigationComp from '@components/widgets/BottomNavigationComp';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID!, process.env.REACT_APP_ALGOLIA_API_KEY!);

function Hit({ hit }: any) {
    const patientId = useSelector((state:RootState)=> state.app.user.phoneNumber)
    const {title, date, tags, uuid, files, authorId} = hit
    const report:Report = { title, date, tags, uuid, files, authorId}
    return report.authorId === patientId
    ? (<ReportContainer report={report} />)
    : <></>
}

function SearchScreen() {
  return (
    <InstantSearch searchClient={searchClient} indexName="report_text">
      <SearchBox className='search-input' />
      <p style={{padding:'1rem', fontSize:'1.3rem'}} className="logo-text">Search through all the text in all your reports</p>
      <Hits hitComponent={Hit} />
      <BottomNavigationComp/>
    </InstantSearch>
  );
}

export default SearchScreen