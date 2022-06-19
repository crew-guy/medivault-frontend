import React, {Fragment, useState} from 'react'
// import moreIcon from '@images/more-icon.svg'
import moreIcon from '@images/more-icon.svg'
import {bindActionCreators} from 'redux'
// import {RootState} from '@redux/store'
import {useSelector, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from '@redux/store'
import ShareDelete from './ShareDelete'
import {Mode, SelectedAction} from '@data/interfaces'
import * as actionCreators from '@actions/actionCreators'
import PatientName from './PatientName'
import { AnimatePresence } from 'framer-motion'

const Header: React.FC<{ isJwt: Boolean }> = ({isJwt}) => {
    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = () => {
        setShowOptions((showOptions) => !showOptions)
    }

    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actionCreators, dispatch)
    const {toggleSelectionMode} = AC

    const [actionSelected, setActionSelected] = useState<SelectedAction>(SelectedAction.SHARE)

    const mode = useSelector((state: RootState) => state.app.mode)
    const selectedReports = useSelector((state: RootState) => state.app.selectedReports)
    return (
        <div className="header">
            {(mode === Mode.VIEWING || mode === Mode.ADDING) &&
            (
                <>
                    <PatientName isJwt={isJwt}/>
                    <div className="img-container" onClick={toggleOptions}>
                       <img className="more-options" src={moreIcon} alt=""/>
                    </div>
                    {showOptions &&
                        <AnimatePresence>
                            <ShareDelete setActionSelected={setActionSelected} />
                        </AnimatePresence>
                    }
                </>
            )
            }
            {
                mode === Mode.SELECTING &&
                (
                    <>
                        <div className="status action-bar">
                            <p className="back-to-viewing" onClick={() => {
                                toggleSelectionMode();
                                setShowOptions(false);
                            }}> {`< Back to Viewing`}</p>
                            <p className="selected-items">{selectedReports.length} {selectedReports.length === 1 ? "item" : "items"}</p>
                        </div>
                        <p className=" action-bar" onClick={() => {
                            if (actionSelected === SelectedAction.SHARE) {
                                navigator.share(selectedReports[0].files[0].dataUrl)
                            }
                        }}>{actionSelected}</p>
                    </>
                )
            }
        </div>
    )
}

export default Header
