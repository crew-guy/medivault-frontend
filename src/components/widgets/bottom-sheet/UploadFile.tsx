import uploadFile from '@images/upload-file.svg'
import ButtonWrapper from './ButtonWrapper';


const UseCamera = () => {
    
    return (
        <ButtonWrapper
            imgSrc={uploadFile}
            text={"Upload File"}
            isCapturing={false}
        />
    )
}

export default UseCamera
