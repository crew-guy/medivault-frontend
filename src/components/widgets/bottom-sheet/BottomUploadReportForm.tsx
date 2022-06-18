import { useState, useEffect } from 'react'
import moment from 'moment'
// import Calendar from 'react-calendar';
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { FileInterface, Report, ReportType } from '@data/interfaces'
import UploadReportFilesBottomSheet from './UploadReportFilesBottomSheet';
import ButtonTray from './ButtonTray';
import { useUpdateBottomUploadReportFilesContext, useBottomUploadReportFilesContext } from '@contexts/BottomUploadReportFilesContext'
import cx from 'classnames'
import { v4 as uuid } from 'uuid'
import { useUpdateBottomUploadContainer } from '@contexts/BottomUploadContainerContext'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '@actions/actionCreators'
import { AppDispatch } from '@redux/store'
import axios from 'axios'
import S3FileUpload from 'react-s3';
import { apiClient } from '@utils/apiClient'

interface FormInterface {
    reportName: string,
    reportDate: Date,
    reportType: ReportType | string
}

const BottomUploadReportForm = () => {
    const setBottomUploadContainer = useUpdateBottomUploadContainer()
    const bottomUploadReportFilesOpen = useBottomUploadReportFilesContext()
    const setBottomUploadReportFilesOpen = useUpdateBottomUploadReportFilesContext()
    const uploadedFiles = useSelector((store: RootState) => store.patient.uploadedFiles)
    const [form, setForm] = useState<FormInterface>({ reportName: "", reportDate: new Date(), reportType: ReportType.OTHER });
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [date, setDate] = useState<string>(moment(new Date()).format('YYYY-MM-DD'))
    const patientId = useSelector((store:RootState)=> store.patient.user.phoneNumber);

    // Preparing dispatch actions
    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actions, dispatch)
    const { clearUploadedFiles, toggleAddMode, uploadReport } = AC


    const uploadFileToS3 = async (file:any) => {
        const config = {
            bucketName: 'mediavault-reports-db',
            dirName: patientId, /* optional */
            region: 'us-east-1',
            accessKeyId: 'AKIAXVK5ZIQTU5WQXTX7',
            secretAccessKey: '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',
        }    
    
        try {
            const data = await S3FileUpload.uploadFile(file, config)
            return data.location
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        // There should atleast be some file uploaded
        const finiteUploadedFiles = uploadedFiles.length > 0

        // Report name should be something
        const reportNameEntered = form.reportName !== ""

        // Some tag must be selected
        // const reportTypeSelected = form.reportType

        console.log({ finiteUploadedFiles, reportNameEntered })
        if (finiteUploadedFiles && reportNameEntered) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [uploadedFiles.length, form.reportName, form.reportType])

    const submitForm = async () => {
        const submission = {
            date: form.reportDate,
            title: form.reportName,
            tags: [form.reportType],
            files: uploadedFiles,
            authorId: patientId,
        }
        // console.log(submission)
        setBottomUploadContainer(false)
        clearUploadedFiles()
        toggleAddMode()
        // uploadReport(submission)
        console.log(submission)
        try {
            console.log('submitting response to backend')
            const response = await apiClient.post('/reports',submission)
            console.log(response)
        } catch (error) {
            
        }
        setForm({ reportName: "", reportDate: new Date(), reportType: ReportType.OTHER })
    }

    const uploadButtonClass = cx({
        "upload": true,
        "disabled": isDisabled
    })

    return (
        <div className="upload-report-form">
            <form className="report-form">
                <div className="report-name-wrapper">
                    <input
                        onChange={(e: any) => setForm((prevForm: FormInterface) => ({ ...prevForm, reportName: e.target.value }))}
                        type="text"
                        placeholder="What is this report related to?" id="report-related" />
                    <label htmlFor="report-related">eg. Blood test, COVID, etc.</label>
                </div>
                <ButtonTray setForm={setForm} />
                <div className="report-date-container">
                    <input type="date" id="report-date" value={date} onChange={(e: any) => setDate(e.target.value)} />
                    <label htmlFor="report-date">dd / mm / yyyy</label>
                </div>
            </form>
            <div className="action-buttons">
                <button className="cancel" >Cancel</button>
                <button type="submit" onClick={submitForm} className={uploadButtonClass} disabled={isDisabled} >Upload</button>
            </div>
            {bottomUploadReportFilesOpen &&
                <UploadReportFilesBottomSheet setOpenUploadMore={setBottomUploadReportFilesOpen} />
            }
        </div>
    )
}

export default BottomUploadReportForm
