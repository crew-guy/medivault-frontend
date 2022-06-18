import useCamera from '@images/use-camera.svg'
import ButtonWrapper from './ButtonWrapper';


const UseCamera = () => {
    
    return (
        <ButtonWrapper
            imgSrc={useCamera}
            text={"Use Camera"}
            isCapturing ={true}
        />
    )
}

export default UseCamera
