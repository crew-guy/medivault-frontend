import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '@actions/actionCreators'
import { AppDispatch } from '@redux/store'
import { SelectedAction } from '@data/interfaces'


interface I{
    setActionSelected:(action:SelectedAction)=>void
}

const ShareDelete:React.FC<I> = ({setActionSelected}) => {
    const dispatch: AppDispatch = useDispatch();
    const AC = bindActionCreators(actionCreators, dispatch)
    const { toggleSelectionMode } = AC;
    
    const handleShare = () => {
        toggleSelectionMode();
        setActionSelected(SelectedAction.SHARE)
    }
    const handleDelete = () => {
        toggleSelectionMode();
        setActionSelected(SelectedAction.DELETE)
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            // "share-delete" class has been added on all three HTML elements to only fire event when one of these is clicked
            className="share-delete share-delete-container" >
                <button onClick={handleShare} className="share-delete action-button top" >Share</button>
                <button onClick={handleDelete} className="share-delete action-button bottom" >Delete</button>
        </motion.div>
    )
}

export default ShareDelete
