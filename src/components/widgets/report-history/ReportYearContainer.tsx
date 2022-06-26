import moment from 'moment';
import React from 'react'
import { Report } from '@redux/data/interfaces'
import YearBar from './YearBar';
import ReportsMonthContainer from './ReportsMonthContainer';

interface YearlyReports {
    yearlyReports:Report[],
    yearKey:string,
    index:number,
}

const ReportYearContainer: React.FC<YearlyReports> = ({ yearKey, yearlyReports,index }) => {
    const bucketedByMonth: any = new Map();
    yearlyReports.forEach((report, i) => {
        const monthNum = report.date.getMonth() + 1;
        if (!bucketedByMonth.get(monthNum)) {
            bucketedByMonth.set(monthNum, { monthNum: monthNum,yearNum:yearKey, reports:[report]})
        } else {
            const existingValue = bucketedByMonth.get(monthNum)
            bucketedByMonth.set(monthNum,{...existingValue,yearNum:yearKey, reports:[...existingValue.reports, report]} )
        }
    })
    const finalMap = bucketedByMonth
    const monthlyReportsArray:any[] = [];
    finalMap.forEach((value: any, key: any) => monthlyReportsArray.push(value));
    return (
        <div className="year-container" >
            <YearBar yearKey={yearKey} barIndex={index} />
                {monthlyReportsArray.map((object, i) =>
                    <ReportsMonthContainer
                        key={i}
                        monthYearKey={moment(`${yearKey}-${object.monthNum}`).format('MMMM YYYY')}
                        monthlyReports={object.reports}
                    />
                )}
        </div>
    )
}

export default ReportYearContainer
