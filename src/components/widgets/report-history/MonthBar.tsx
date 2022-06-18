import React from 'react'

const MonthBar: React.FC<{monthYearKey:string}> = ({monthYearKey}) => {
    return (
        <div className="month-bar" >
            <div className="circle"></div>
            <p className="month-year-key">{monthYearKey}</p>
        </div>
    )
}

export default MonthBar
