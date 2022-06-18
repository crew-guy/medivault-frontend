import {createContext,useState, useContext} from 'react'

enum UploadStatus{
    UPLOADING_IMAGE,
    FILLING_FORM
}
const UploadStatusContext = createContext<UploadStatus>(UploadStatus.UPLOADING_IMAGE)
const UpdateUploadStatusContext = createContext<() => void>(() => { });

export const useUploadStatus = () => {
    return useContext(UploadStatusContext);
}

export const useUpdateUploadStatus = () => {
    return useContext(UpdateUploadStatusContext);
}

const UploadStatusProvider: React.FC<{ children: any }> = ({ children }) => {
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.UPLOADING_IMAGE)
    
    const toggleUploadStatus = () => {
        setUploadStatus((uploadStatus) => uploadStatus == UploadStatus.UPLOADING_IMAGE ? UploadStatus.FILLING_FORM : UploadStatus.UPLOADING_IMAGE);
    }

    return (
        <UploadStatusContext.Provider value={uploadStatus} >
            <UpdateUploadStatusContext.Provider value={toggleUploadStatus} >
                {children}
            </UpdateUploadStatusContext.Provider>
        </UploadStatusContext.Provider>
    )
}

export default UploadStatusProvider
