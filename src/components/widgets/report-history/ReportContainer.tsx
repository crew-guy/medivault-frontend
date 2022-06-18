import React,{useState} from 'react'
import { Mode, Report } from '@data/interfaces'
import ReportCard from './ReportCard'
import ImagesContainer from './ImagesContainer'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import CheckBox from '@widgets/CheckBox'
import {AnimatePresence} from 'framer-motion'
import cx from 'classnames'

const ReportContainer: React.FC<{ report: Report }> = ({ report }) => {
    const [isImagesVisible, setIsImagesVisible] = useState(false);
    const mode = useSelector((state: RootState) => state.patient.mode);
    
    const reportContainerClass = cx({
        "report-container": true,
        "expanded":isImagesVisible
    })
    
    return (
        <div className="report-container-wrapper">
            {mode=== Mode.SELECTING && <CheckBox report={report} />}
            <div className={reportContainerClass} >
                <ReportCard report={report} isImagesVisible={isImagesVisible} setIsImagesVisible={setIsImagesVisible} />
                {isImagesVisible &&
                    <AnimatePresence exitBeforeEnter>
                        <ImagesContainer isDeleteable={false} report={report} />
                    </AnimatePresence>
                }
            </div>
        </div>
    )
}

export default ReportContainer
