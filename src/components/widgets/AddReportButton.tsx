import React from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { bindActionCreators } from 'redux'
import * as actionCreators from '@actions/actionCreators'
import { motion } from 'framer-motion'
import {useUpdateBottomUploadContainer} from '@contexts/BottomUploadContainerContext'

const AddReportButton = () => {
    const dispatch:AppDispatch = useDispatch()
    const setBottomUploadContainer = useUpdateBottomUploadContainer()
    const AC = bindActionCreators(actionCreators, dispatch);
    const {toggleAddMode} = AC

    const openBottomSheet = () => {
        toggleAddMode();
        setBottomUploadContainer(true);
    }

    return (
        <motion.div
            initial={{opacity:0, y:60}}
            animate={{opacity:1, y:0}}
            exit={{opacity:0, y:60}}
            onClick={openBottomSheet} className="add-report-button" >
            Add Report
        </motion.div>
    )
}

export default AddReportButton
