import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileInterface, Report } from '@data/interfaces'
import { useDispatch } from 'react-redux'
import * as actions from '@actions/actionCreators'
import { AppDispatch } from '@redux/store'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import cx from 'classnames'
import crossIcon from '@images/cross.svg'
import {AnimatePresence} from 'framer-motion'
import Shimmer from './Shimmer'

const ImagesContainer: React.FC<{ report: Report, isDeleteable: boolean }> = ({ report, isDeleteable }) => {
    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actions, dispatch)
    const {removeUploadedFile} = AC

    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory()
    const files = report.files;
    const reportAllImgsContainer=cx({
        "images-container": true,
        "deletable":isDeleteable
    })
    const reportImgContainer = cx({
        "report-img-container": true,
        "deleteable":isDeleteable
    })
    return (
        <div
            className={reportAllImgsContainer} >
            <div className="images-container-gradient"></div>
            <div className="images-container-subchild" >
                    {files.map((file,i) =>
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{delay:i/8}}
                            className={reportImgContainer}
                            onClick={() => {
                                const storiesArray = files.map((file:FileInterface) => ({
                                    url: file.dataUrl,
                                    header: {
                                        heading: report.title, 
                                        subheading:moment(report.date).format('DD,MMMM, YYYY'),
                                    },
                                    fileMimeType:file.fileMimeType
                                }) )
                                history.push({
                                    pathname: '/view-report',
                                    state:{
                                        stories: storiesArray 
                                    }
                                });                
                            }}
                        >
                            {isDeleteable &&
                                <AnimatePresence>
                                    <motion.div
                                    exit={{ scale:[1,1.2,0]}}
                                    transition={{duration:2}}
                                        onClick={(e:any) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                removeUploadedFile(file.uuid!)
                                            }}
                                            className="removable"
                                        >
                                        <img src={crossIcon} alt="cross icon" />
                                    </motion.div>
                                </AnimatePresence>
                            }
                            {loading && <Shimmer/>}
                            <img
                                onLoad={() => setLoading(false)}
                                className="report-img"
                                src={file.thumbnailUrl}
                                alt="medical report"
                            />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default ImagesContainer
