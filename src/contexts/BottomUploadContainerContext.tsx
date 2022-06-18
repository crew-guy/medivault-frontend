import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

const BottomUploadContainer = createContext<boolean>(true)
const UpdateBottomUploadContainer = createContext<Dispatch<SetStateAction<boolean>>>(()=>{})

export const useBottomUploadContainer = () => {
    return useContext(BottomUploadContainer)
}

export const useUpdateBottomUploadContainer = () => {
    return useContext(UpdateBottomUploadContainer)
}

// TODO : add type to "children"
const BottomUploadContainerProvider = ({children}:any) => {
    const [bottomUploadContainerOpen, setBottomUploadContainerOpen] = useState<boolean>(true)

    return (
        <BottomUploadContainer.Provider value={bottomUploadContainerOpen}>
            <UpdateBottomUploadContainer.Provider value={setBottomUploadContainerOpen} >
                {children}
            </UpdateBottomUploadContainer.Provider>
        </BottomUploadContainer.Provider>
    )

}

export default BottomUploadContainerProvider