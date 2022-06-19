import React, {useState, useEffect, useRef} from 'react'
import logoDark from '@images/logo-dark.svg'
import arrow from '@images/arrow.svg'
import cx from 'classnames'
import OTPBottomSheet from '@components/widgets/bottom-sheet/OTPBottomSheet'
import { Button } from '@mui/material'
import { useAuth } from '@contexts/AuthContext'
import GoogleIcon from '@mui/icons-material/Google';
// import APIClient from "./../../APIClient";

const LoginScreen = () => {
    const [isBlurred, setIsBlurred] = useState<boolean>(false)
    const [isValidPhoneNum, setIsValidPhoneNum] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const phoneNumRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>("")

    const loginScreenClassname = cx({
        'login-screen': true,
        'blurred': isBlurred
    })

    const arrowClassname = cx({
        'opaque': isValidPhoneNum
    })

    useEffect(() => {
        // if (APIClient.users.isLoggedIn()) {
        //     document.location = "/";
        // }
    })
    const auth = useAuth()

    return (
        <div className={loginScreenClassname}>
            <div className="login-container">
                <div className="img-container">
                    <img src={logoDark} alt=""/>
                </div>
                <div className="text-content">
                    <div className="title">Log In</div>
                    <div className="sub-title">to start storing</div>
                </div>
                <Button
                    onClick={() => {
                        console.log('clicked', auth)
                        auth.signInWithGoogle()
                    }} endIcon={<GoogleIcon />}>Sign In To Continue</Button>
            </div>
            <OTPBottomSheet open={open} setIsOpen={setOpen} setError={setError}
                            phone={(phoneNumRef.current || {})!.value || ""}/>
        </div>
    )
}

export default LoginScreen
