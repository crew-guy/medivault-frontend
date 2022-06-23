import React, {Fragment, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '@redux/store'
import cx from 'classnames'
import {motion, AnimatePresence} from 'framer-motion'
import useFirebaseAuth from '../../../hooks/useFirebaseAuth'
// import APIClient from "./../../../APIClient";

const PatientName: React.FC = () => {
    const user = useSelector((state: RootState) => state.app.user)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const { signOutUser } = useFirebaseAuth()

    const toggleVisible = () => {
        setIsVisible((prevIsVisible: boolean) => !prevIsVisible)
    }

    const dropdownArrowClassName = cx({
        "dropdown-arrow": true,
        "upwards": isVisible
    })

    const handleLogout = () => {
        signOutUser()
    }

    return (
        <div className="dropdown-container">
            <p className="patient-name">{user.patientName}</p>
                <Fragment>
                    <div onClick={toggleVisible} className={dropdownArrowClassName}></div>
                    <AnimatePresence>
                        {isVisible &&
                        <motion.div
                            className="dropdown"
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            exit={{scale: 0}}
                        >
                            <div className="name">{user.patientName}</div>
                            <div onClick={handleLogout} className="logout">Logout</div>
                        </motion.div>
                        }
                    </AnimatePresence>
                </Fragment>
        </div>
    )
}

export default PatientName
