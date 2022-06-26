import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

const BottomUploadContainer = createContext<boolean>(true)
const UpdateBottomUploadContainer = createContext<Dispatch<SetStateAction<boolean>>>(()=>{})

export const useBottomUploadContainer = () => {
    return useContext(BottomUploadContainer)
}

export const useUpdateBottomUploadContainer = () => {
    return useContext(UpdateBottomUploadContainer)
}

const BottomUploadContainerProvider = ({children}:any) => {
    const [bottomUploadContainerOpen, setBottomUploadContainerOpen] = useState<boolean>(false)

    return (
        <BottomUploadContainer.Provider value={bottomUploadContainerOpen}>
            <UpdateBottomUploadContainer.Provider value={setBottomUploadContainerOpen} >
                {children}
            </UpdateBottomUploadContainer.Provider>
        </BottomUploadContainer.Provider>
    )

}

export default BottomUploadContainerProvider