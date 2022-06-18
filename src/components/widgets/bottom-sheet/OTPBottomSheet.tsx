import React, {Dispatch, SetStateAction, useState} from 'react'
import {BottomSheet} from 'react-spring-bottom-sheet';
import OtpInput from 'react-otp-input';
import arrow from '@images/arrow.svg'
// import APIClient from "../../../APIClient";

interface I {
    open: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string>>,
    phone: string
}

const OTPBottomSheet: React.FC<I> = ({open, setIsOpen, phone, setError}) => {
    const [otp, setOtp] = useState<string>("")

    const handleChange = (otp: string) => {
        setOtp(otp);
        if (otp.length === 4) {
            handleOTPSubmit()       
        }
    }

    const handleOTPSubmit = async () => {
        console.log('i was called')
        if (otp.length === 4) {
                    setIsOpen(false)
                    setError("OTP is invalid. Please try again.")
            // APIClient.users.login(phone, otp)
            //     .then(() => console.log('yayy'))
            //     .catch((err) => {
            //         console.log(err);
            // })
        }
    }

    return (
        <div>
            <BottomSheet
                open={open}
                onDismiss={() => {
                    setIsOpen(false)
                    console.log('dismissed otp bottom sheet')
                }}
                // maxHeight == window.innerHeight (this variable is defined in the library itself)
                defaultSnap={({maxHeight}) => maxHeight}
                expandOnContentDrag={true}
                header={
                    <div className="rsbs-header">
                        <p>Enter OTP</p>
                    </div>
                }
            >
                <div className="otp-input-container">
                    <div className="enter-otp">
                        <OtpInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={4}
                            separator={<span> </span>}
                        />
                    </div>
                    <div className="otp-info">
                        Enter 4-digit code we sent your number as SMS. <span className="strong" onClick={() => {
                        // APIClient.users.sendOTP(phone);
                    }}> Resend OTP.</span>
                    </div>
                    <div className="submit-otp-button" onClick={handleOTPSubmit}>
                        <img src={arrow} alt=""/>
                    </div>
                </div>
            </BottomSheet>
        </div>
    )
}

export default OTPBottomSheet
