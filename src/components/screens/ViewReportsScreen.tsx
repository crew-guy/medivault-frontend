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
// import APIClient from "./../../APIClient";
import BottomUploadContainerProvider from '@contexts/BottomUploadContainerContext';

const ViewReportsScreen: React.FC<{ hasLoaded: boolean, setHasLoaded: any }> = ({hasLoaded, setHasLoaded}) => {
    const [reachedFooter, setReachedFooter] = useState<boolean>(false)
    const patientId = useSelector((state:RootState)=> state.patient.user.phoneNumber)
    const mode = useSelector((state: RootState) => state.patient.mode);
    const [loading, setLoading] = useState<boolean>(true)
    const viewReportsClass = cx({
        "view-reports-layout": true,
        'blurred': mode === Mode.ADDING
    })

    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actionCreators, dispatch)
    const { setUser, setReportsCollection } = AC
    const patientName = useSelector((state:RootState)=> state.patient.user.patientName)

    useEffect(() => {
        (async () => {
            try {
                const fetchedReportsCollection = await retrieveData(patientId)
                setReportsCollection(fetchedReportsCollection);
                // TODO : Implement auth
                setUser(patientName, 'patientAuthToken');
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
                               {mode !== Mode.SELECTING && !reachedFooter &&
                               <AddReportButton/>
                               }
                            </AnimatePresence>
                            <Footer setReachedFooter={setReachedFooter}/>
                        </div>
                        <BottomUploadContainer/>
                    {/* </AnimatePresence> */}
                </>}
            </Fragment>
        </BottomUploadContainerProvider>
    )
}

export default ViewReportsScreen
