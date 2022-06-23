import React, { MouseEventHandler } from 'react'
import {useRef, useEffect} from 'react'
import {AppDispatch, RootState } from '@redux/store';
import {useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actionCreators from '@actions/actionCreators'
import { FileInterface } from '@data/interfaces';
import {useUpdateBottomUploadReportFilesContext} from '@contexts/BottomUploadReportFilesContext'
import S3FileUpload from 'react-s3';
import toast from 'react-hot-toast';

// var mime = require('mime-types')
const defaultThumbnailUrl = 'https://medivault-assets.s3.ap-south-1.amazonaws.com/pdf_thumbnail.svg'

const ButtonWrapper:
    React.FC<
        {
            imgSrc: string,
            text: string,
            isCapturing:boolean
        }> = ({ imgSrc, text, isCapturing }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const setBottomUploadReportFilesOpen = useUpdateBottomUploadReportFilesContext()
    //? This is just an element you can use in coordination with the file uploaded to check whether your uploading was successful from frontend clicking/uploading to saving that in local state        
    // const imageOutputRef = useRef<HTMLImageElement>(null)
    const dispatch: AppDispatch = useDispatch();
    const uploadedFiles:FileInterface[] = useSelector((store:RootState)=> store.app.uploadedFiles);
    const patientId = useSelector((store:RootState)=> store.app.user.emailAddress);
    const AC = bindActionCreators(actionCreators, dispatch);
    const { uploadFile } = AC
    
    
    const onClickHandler: MouseEventHandler<HTMLDivElement> =() => {
        fileInputRef.current!.click()
    }
        
        
    const uploadFileToS3 = async (file:any) => {
        const config = {
            bucketName: 'mediavault-reports-db',
            dirName: patientId, /* optional */
            region: 'us-east-1',
            accessKeyId: process.env.REACT_APP_AWS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET,
        } 
    
        try {
            const data = await S3FileUpload.uploadFile(file, config)
            return data.location
        } catch (error) {
        }
    }

    useEffect(() => {
        fileInputRef.current!.addEventListener('change', function () {
            const uploadedFile = (this as any).files[0]
            const typeOfUploadedFile = uploadedFile.type.toLowerCase();
            if (uploadedFile) {
                (async () => {
                    
                    const toastId = toast.loading('Adding file...');
                    const fileLocationInS3 = await uploadFileToS3(uploadedFile)
                    toast.dismiss(toastId)
                    toast.success('Added file!')
                    uploadFile({ dataUrl: fileLocationInS3, thumbnailUrl: typeOfUploadedFile === "application/pdf" ? defaultThumbnailUrl : fileLocationInS3, fileMimeType: typeOfUploadedFile })
                })()
                if (uploadedFiles.length > 0) {
                    setBottomUploadReportFilesOpen(false)
                }
            }
            return;
        })
        //? To consume that imageOutputRef in our context 
        // eslint-disable-next-line
    },[uploadedFiles])

    return (
        <div onClick={onClickHandler} className="button-wrapper" >
            {
                isCapturing
                ?
                <input
                    title="input"
                    style={{display:'none'}}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                />
                :
                <input
                    title="input"
                    style={{display:'none'}}
                    ref={fileInputRef}
                    type="file"
                />
            }
            <img src={imgSrc} alt="" />
            <p>{text}</p>
        </div>
    )
}

export default ButtonWrapper
