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
import { apiClient } from '@utils/apiClient'
import toast from 'react-hot-toast'

function copyStringToClipboard (str:string) {
    // Create new element
    let el:any = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }

const Header: React.FC = () => {
    const [showOptions, setShowOptions] = useState(false)
    const toggleOptions = () => {
        setShowOptions((showOptions) => !showOptions)
    }

    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actionCreators, dispatch)
    const {toggleSelectionMode, setReportsCollection } = AC

    const [actionSelected, setActionSelected] = useState<SelectedAction>(SelectedAction.SHARE)

    const mode = useSelector((state: RootState) => state.app.mode)
    const reportsCollection = useSelector((state:RootState)=> state.app.reportsCollection)
    const selectedReports = useSelector((state: RootState) => state.app.selectedReports)
    return (
        <div className="header">
            {(mode === Mode.VIEWING || mode === Mode.ADDING) &&
            (
                <>
                    <PatientName/>
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
                        <p className="action-bar" onClick={async () =>
                        {
                            if (actionSelected === SelectedAction.SHARE) {
                                const masterString = selectedReports.map((selectedReport: Report) => selectedReport.files.map((file: FileInterface) => `${selectedReport.title}-${file.dataUrl}`).join(" ")).join(" ")
                                if (navigator?.share) {
                                    await navigator?.share({title: 'My Reports', text:masterString})
                                }
                                await copyStringToClipboard(masterString)
                                toast.success('Copied to clipboard!')
                                toggleSelectionMode();
                                setShowOptions(false)
                            } else if (actionSelected === SelectedAction.DELETE) {
                                await apiClient.delete('/reports', { data: { data: selectedReports.map((selectedReport: Report) => selectedReport.uuid) } })
                                const remainingReports:Report[] = reportsCollection.reports.filter((report: Report) => !selectedReports.some((selectedReport: Report) => report.uuid === selectedReport.uuid));    
                                setReportsCollection(remainingReports)
                                toast.success("Successfully deleted record!")
                                toggleSelectionMode();
                                setShowOptions(false)
                            } 
                            }
                        }>{actionSelected}</p>
                    </>
                )
            }
        </div>
    )
}

export default Header
