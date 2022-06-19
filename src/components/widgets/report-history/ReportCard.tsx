import React from 'react'
import {Report} from '@data/interfaces'
import moment from 'moment'
import downArrow from '@images/down-arrow.svg'
import classNames from 'classnames'


interface ReportCardInterface {
    report: Report,
    setIsImagesVisible: any,
    isImagesVisible:boolean
}


const ReportCard: React.FC<ReportCardInterface> = (
    {
        report,
        setIsImagesVisible,
        isImagesVisible
    }) => {
        const toggleImageVisibility = () => {
            setIsImagesVisible((prevVal:boolean) => !prevVal)
    }
    const downArrowClassNames = classNames({
        'images-visible': isImagesVisible,
        'images-hidden':!isImagesVisible
    })

    return (
        <>
            <div className="report-card" onClick={toggleImageVisibility} >
                <div className="title-date">
                    <p className="title" >
                        <div className="white-gradient"></div>
                        <p>{report.title }</p>
                    </p>
                    <p className="date" >{moment(report.date).format('DD/MM/YYYY') }</p>
                </div>
                <div className="tag-icon">
                    <div className="tags-container">
                        <p className="report-tag">{report.tags}</p>
                    </div>
                    <div className="icon-img-container"  >
                        <img src={downArrow} className={downArrowClassNames}  alt="see reports" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportCard
