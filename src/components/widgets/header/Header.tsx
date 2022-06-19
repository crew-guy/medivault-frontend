import React, {Fragment, useState} from 'react'
// import moreIcon from '@images/more-icon.svg'
import moreIcon from '@images/more-icon.svg'
import {bindActionCreators} from 'redux'
// import {RootState} from '@redux/store'
import {useSelector, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from '@redux/store'
import ShareDelete from './ShareDelete'
import {Mode, Report, FileInterface, SelectedAction} from '@data/interfaces'
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
                        <p className=" action-bar" onClick={async() => {
                            if (actionSelected === SelectedAction.SHARE) {
                                const masterString = selectedReports.map((selectedReport: Report) => selectedReport.files.map((file: FileInterface) => `${selectedReport.title}-${file.dataUrl}`).join(" ")).join(" ")
                                console.log(masterString);
                                await navigator?.share({title: 'My Reports', text:masterString})
                                await navigator.clipboard.writeText(masterString)
                            }
                        }}>{actionSelected}</p>
                    </>
                )
            }
        </div>
    )
}

export default Header
