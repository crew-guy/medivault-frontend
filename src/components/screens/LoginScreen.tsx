import React, {useState, useEffect, useRef} from 'react'
import logoDark from '@images/logo-dark.svg'
import arrow from '@images/arrow.svg'
import cx from 'classnames'
import OTPBottomSheet from '@components/widgets/bottom-sheet/OTPBottomSheet'
// import APIClient from "./../../APIClient";

const LoginScreen = () => {
    // eslint-disable-next-line
    const [phoneNum, setPhoneNum] = useState<string>("")
    // eslint-disable-next-line
    const [isBlurred, setIsBlurred] = useState<boolean>(false)
    const [isValidPhoneNum, setIsValidPhoneNum] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const phoneNumRef = useRef<HTMLInputElement>(null)
    const [isEnteringPhoneNum, setIsEnteringPhoneNum] = useState<boolean>()
    const [error, setError] = useState<string>("")

    const handleChange = (e: any) => {
        setIsValidPhoneNum(false)
        // const inputRegex = new RegExp('^([0-9]{1,10})$')
        // if (inputRegex.test(phoneNumRef.current!.value)) {
        //     if (phoneNumRef.current!.value.length === 10) {
        //         APIClient.users.sendOTP(phoneNumRef.current!.value);
        //         // To handle Backspace key which has keycode = 8
        //         if (e.keyCode === 8) {
        //             return
        //         }
        //     }
        // } else {
        //     // To cancel a regex mismatched input
        //     // console.log('regex mismatched')
        //     phoneNumRef.current!.value = phoneNumRef.current!.value.slice(0, -1)
        // }

        // Phone number validation logic
        if (phoneNumRef.current!.value.length === 10) {
            setPhoneNum(e.target.value)
            setIsValidPhoneNum(true)
        }
    }

    const loginScreenClassname = cx({
        'login-screen': true,
        'blurred': isBlurred
    })

    const arrowClassname = cx({
        'opaque': isValidPhoneNum
    })

    const handleSubmit = () => {
        setOpen(true)
    }

    useEffect(() => {
        // if (APIClient.users.isLoggedIn()) {
        //     document.location = "/";
        // }
    })

    return (
        <div className={loginScreenClassname}>
            <div className="login-container">
                <div className="img-container">
                    <img src={logoDark} alt=""/>
                </div>
                <div className="text-content">
                    <div className="title">Log In</div>
                    <div className="sub-title">to start working</div>
                </div>
                <div className="input-container">
                    {isEnteringPhoneNum && <span className="phone-extension">+91</span>}
                    <input
                        className="phone-num-input"
                        onFocus={() => setIsEnteringPhoneNum(true)}
                        ref={phoneNumRef}
                        onChange={(e) => handleChange(e)}
                        type="number"
                        placeholder="Your phone number"
                    />
                    {error && <div className="error">{error}</div>}
                </div>
                <button title="button" disabled={!isValidPhoneNum} onClick={handleSubmit} className="arrow-button">
                    <img className={arrowClassname} src={arrow} alt=""/>
                </button>
            </div>
            <OTPBottomSheet open={open} setIsOpen={setOpen} setError={setError}
                            phone={(phoneNumRef.current || {})!.value || ""}/>
        </div>
    )
}

export default LoginScreen
