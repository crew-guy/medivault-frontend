import React,{useState} from 'react'
import checkBox from '@images/checkbox.svg'
import classNames from 'classnames'
// eslint-disable-next-line
import {useSelector,useDispatch } from 'react-redux'
// eslint-disable-next-line
import {RootState,AppDispatch} from '@redux/store'
import * as actionCreators from '@actions/actionCreators'
import { bindActionCreators } from 'redux'
import {motion} from 'framer-motion'
import { Report } from '@data/interfaces'

const CheckBox:React.FC<{report:Report}> = ({report}) => {
    const [isChecked,setIsChecked] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch()
    // const selectedReports = useSelector((state:RootState)=>state.app.selectedReports)
    
    const AC = bindActionCreators(actionCreators, dispatch)
    const {selectReport,deselectReport} = AC

    const checkBoxClassName = classNames({
        "active": isChecked,
        "passive":!isChecked
    })
    const selectHandler = () => {
        if (isChecked) {
            setIsChecked(false);
            deselectReport(report);
        } else {
            setIsChecked(true);
            selectReport(report);
        }
    }

    return (
        <motion.div
            onClick={selectHandler}
            initial={{ x: -25 }}
            animate={{x:0}}
            className='checkbox-container' >
            <img src={checkBox} className={checkBoxClassName} alt="" />
        </motion.div>
    )
}

export default CheckBox
