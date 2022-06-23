import {useState, useEffect, Fragment} from 'react'
import Header from '../widgets/header/Header';
import ReportsWrapper from '@widgets/report-history/ReportsWrapper';
import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '@redux/store';
import {Mode} from '@data/interfaces'
import BottomUploadContainer from '@components/widgets/bottom-sheet/BottomUploadContainer';
import cx from 'classnames'
import Footer from '@components/widgets/report-history/Footer';
// import {useHistory} from 'react-router-dom'
// import {useLocation} from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as actionCreators from '@actions/actionCreators'
import {retrieveData} from '@data/data'
import PreloaderScreen from './PreloaderScreen';
// eslint-disable-next-line
// import mixpanel from 'mixpanel-browser'
// import jwt_decode from "jwt-decode";
import {AnimatePresence} from 'framer-motion'
import AddReportButton from '@widgets/AddReportButton';
import BottomUploadContainerProvider from '@contexts/BottomUploadContainerContext';
import BottomNavigationComp from '@components/widgets/BottomNavigationComp';
import { useAuth } from '@contexts/AuthContext'
import { useHistory } from 'react-router-dom';

const ViewReportsScreen: React.FC<{ hasLoaded: boolean, setHasLoaded: any }> = ({hasLoaded, setHasLoaded}) => {
    const [reachedFooter, setReachedFooter] = useState<boolean>(false)
    const patientId = useSelector((state:RootState)=> state.app.user.phoneNumber)
    const mode = useSelector((state: RootState) => state.app.mode);
    const [loading, setLoading] = useState<boolean>(true)
    const viewReportsClass = cx({
        "view-reports-layout": true,
        'blurred': mode === Mode.ADDING
    })
    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actionCreators, dispatch)
    const { setReportsCollection } = AC
    const auth = useAuth()
    const history = useHistory()

    useEffect(() => {
        console.log(reachedFooter)
        if (!auth.authUser) {
            return history.push('/login')
        }
        (async () => {
            try {
                const fetchedReportsCollection = await retrieveData(patientId)
                setReportsCollection(fetchedReportsCollection);
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
                setHasLoaded(true)
            }
        })()
        // eslint-disable-next-line
    }, [])

    return (
        <BottomUploadContainerProvider>
            <Fragment>
                {loading && !hasLoaded && <PreloaderScreen/>}
                {!loading && <>
                    {/* <AnimatePresence key={'top level'} > */}
                        <div className={viewReportsClass}>
                            <Header isJwt={true}/>
                            <ReportsWrapper/>
                            <AnimatePresence>
                               {mode !== Mode.SELECTING &&
                               <AddReportButton/>
                               }
                            </AnimatePresence>
                            <Footer setReachedFooter={setReachedFooter}/>
                        </div>
                        <BottomNavigationComp/>
                        <BottomUploadContainer/>
                    {/* </AnimatePresence> */}
                </>}
            </Fragment>
            </BottomUploadContainerProvider>
    )
}

export default ViewReportsScreen
