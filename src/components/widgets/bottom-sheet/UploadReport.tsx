import ImagesContainer from '../report-history/ImagesContainer'
import {RootState} from '@redux/store'
import {useSelector} from 'react-redux'
import { v4 as uuid } from 'uuid';
import BottomUploadReportForm from './BottomUploadReportForm';
import {useUpdateBottomUploadReportFilesContext} from '@contexts/BottomUploadReportFilesContext';


const UploadReport = () => {
    
    const setBottomUploadReportFilesOpen = useUpdateBottomUploadReportFilesContext()
    const uploadFiles = useSelector((store:RootState)=>store.app.uploadedFiles)
    return (

        <div className="upload-report-form">

        <div className="files-container">
                <ImagesContainer
                    report={{
                    files: uploadFiles,
                        date: new Date(),
                        uuid: uuid(),
                        tags: [],
                        title:"Medical Report"
                    }}
                    isDeleteable={true}
                />
                <div
                    className="add-more"
                    onClick={() => setBottomUploadReportFilesOpen(true)}
                >
                    + Add more files
                </div>
            </div>
                <BottomUploadReportForm/>
        </div>

    )
}

export default UploadReport