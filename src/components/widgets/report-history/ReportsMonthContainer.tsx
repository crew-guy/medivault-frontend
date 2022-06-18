import React from 'react'
// import { Report } from '@data/interfaces';
import { Report } from '@data/interfaces';
import ReportContainer from './ReportContainer';
import MonthBar from './MonthBar';

interface MonthlyReports {
    monthlyReports:Report[],
    monthYearKey:string
}

const ReportsMonthContainer:React.FC<MonthlyReports> = ({monthlyReports, monthYearKey}) => {
    return (
        <div className="reports-by-month" >
            <MonthBar monthYearKey={monthYearKey}/>
            {monthlyReports.map((report,i) =>
                <div key={i} >
                    <ReportContainer report={report}/>
                </div>
            )}
        </div>
    )
}

export default ReportsMonthContainer
