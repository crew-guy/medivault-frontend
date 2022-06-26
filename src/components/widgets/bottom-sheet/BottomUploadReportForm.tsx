import { useState, useEffect } from 'react'
import moment from 'moment'
// import Calendar from 'react-calendar';
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { ReportType } from '@data/interfaces'
import UploadReportFilesBottomSheet from './UploadReportFilesBottomSheet';
import ButtonTray from './ButtonTray';
import { useUpdateBottomUploadReportFilesContext, useBottomUploadReportFilesContext } from '@contexts/BottomUploadReportFilesContext'
import cx from 'classnames'
import { useUpdateBottomUploadContainer } from '@contexts/BottomUploadContainerContext'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '@actions/actionCreators'
import { AppDispatch } from '@redux/store'
import { apiClient } from '@utils/apiClient'
import toast from 'react-hot-toast'

interface FormInterface {
    reportName: string,
    reportDate: Date,
    reportType: ReportType | string
}

const BottomUploadReportForm = () => {
    const setBottomUploadContainer = useUpdateBottomUploadContainer()
    const bottomUploadReportFilesOpen = useBottomUploadReportFilesContext()
    const setBottomUploadReportFilesOpen = useUpdateBottomUploadReportFilesContext()
    const uploadedFiles = useSelector((store: RootState) => store.app.uploadedFiles)
    const [form, setForm] = useState<FormInterface>({ reportName: "", reportDate: new Date(), reportType: ReportType.OTHER });
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [date, setDate] = useState<string>(moment(new Date()).format('YYYY-MM-DD'))
    const patientId = useSelector((store: RootState) => store.app.user.emailAddress);

    // Preparing dispatch actions
    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actions, dispatch)
    const { clearUploadedFiles, toggleAddMode, uploadReport } = AC

    useEffect(() => {
        // There should atleast be some file uploaded
        const finiteUploadedFiles = uploadedFiles.length > 0

        // Report name should be something
        const reportNameEntered = form.reportName !== ""

        // Some tag must be selected
        // const reportTypeSelected = form.reportType

        if (finiteUploadedFiles && reportNameEntered) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [uploadedFiles.length, form.reportName, form.reportType])

    const submitForm = async () => {
        const submission = {
            date: date,
            title: form.reportName,
            tags: [form.reportType],
            files: uploadedFiles,
            authorId: patientId,
        }
        try {
            const toastId = toast.loading('Adding record...');
            const response = await apiClient.post('/reports', submission)
            toast.dismiss(toastId)
            toast.success('Successfully uploaded record!')
            uploadReport(response as any);
        } catch (error) {
            toast.error('Failed to upload record!')
        }
        setForm({ reportName: "", reportDate: new Date(), reportType: ReportType.OTHER })
        clearUploadedFiles()
        toggleAddMode()
        setBottomUploadContainer(false)
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
