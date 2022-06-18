import React, {Fragment, useState} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '@redux/store'
import cx from 'classnames'
import {motion, AnimatePresence} from 'framer-motion'

const PatientName: React.FC<{ isJwt: Boolean }> = ({isJwt}) => {
    const user = useSelector((state: RootState) => state.patient.user)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const toggleVisible = () => {
        setIsVisible((prevIsVisible: boolean) => !prevIsVisible)
    }

    const dropdownArrowClassName = cx({
        "dropdown-arrow": true,
        "upwards": isVisible
    })

    const handleLogout = () => {
        // APIClient.users.logout();
    }

    console.log(user.patientName)

    return (
        <div className="dropdown-container">
            <p className="patient-name">{user.patientName}</p>
            {isJwt
                ? <Fragment />
                : <Fragment>
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
                </Fragment>}
        </div>
    )
}

export default PatientName
