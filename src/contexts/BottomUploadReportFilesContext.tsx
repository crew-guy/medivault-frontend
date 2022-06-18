import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

const BottomUploadReportFilesContext = createContext<boolean>(false)
const UpdateBottomUploadReportFilesContext = createContext<Dispatch<SetStateAction<boolean>>>(()=>{})

export const useBottomUploadReportFilesContext = () => {
    return useContext(BottomUploadReportFilesContext)
}

export const useUpdateBottomUploadReportFilesContext = () => {
    return useContext(UpdateBottomUploadReportFilesContext)
}

// TODO : add type to "children"
const BottomUploadReportFilesProvider = ({children}:any) => {
    const [bottomUploadReportFilesOpen, setBottomUploadReportFilesOpen] = useState<boolean>(false)

    return (
        <BottomUploadReportFilesContext.Provider value={bottomUploadReportFilesOpen}>
            <UpdateBottomUploadReportFilesContext.Provider value={setBottomUploadReportFilesOpen} >
                {children}
            </UpdateBottomUploadReportFilesContext.Provider>
        </BottomUploadReportFilesContext.Provider>
    )

}

export default BottomUploadReportFilesProvider