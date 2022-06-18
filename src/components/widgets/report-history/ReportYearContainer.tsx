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
    //! Using moment js and lodash
    // const finalMap = getBucketChronologicalMonths(yearlyReports);
    // const monthlyReportsArray:any[] = [];
    // const monthYearKeyArray:string[] = [];
    // finalMap.forEach((value, key) => monthlyReportsArray.push(value));
    // finalMap.forEach((value,key)=> monthYearKeyArray.push(key))
    
    //! Using my own code
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
    // const finalMap = getReportsByMonth(yearlyReports);
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


//! Using moment and lodash
// const getBucketChronologicalMonths = (collection:Report[]) => {
//     const reformattedDateCollection:any = []
//     collection.forEach((report:Report) => {
//         reformattedDateCollection.push({
//             ...report,
//             dateAsString : moment(report.date).format('YYYY-MM-DD')
//         })
//     })
//     const arrangeReportsByMonth = _.groupBy(reformattedDateCollection, (b:any) =>
//     moment(b.dateAsString).startOf('month').format('YYYY/MM'));
  
//     _.values(arrangeReportsByMonth)
//         .forEach((arr: any) => arr.sort((a: any, b: any) => moment(a.dateAsString).day() - moment(b.modDate).day()));
    
//     const finalMap = new Map(Object.entries(arrangeReportsByMonth));
//     return finalMap;
// }


//! This method failed as it was placing reports of December,2021 and December,2020 in the same array although on UI they're different clusters
// const getReportsByMonth = (collection: Report[]) => {
    
//     //* Using JS Maps instead
    // const bucketedByMonth:any= new Map();
    // collection.map((report, i) => {
    //     const monthNum = report.date.getMonth();
    //     if (!bucketedByMonth.get(monthNum)) {
    //         bucketedByMonth.set(monthNum, { monthNum: monthNum, reports:[report]})
    //     } else {
    //         const existingValue = bucketedByMonth.get(monthNum)
    //         bucketedByMonth.set(monthNum,{...existingValue, reports:[...existingValue.reports, report]} )
    //     }
    // })
    // return bucketedByMonth


//     //* Using JS array
//     // const bucketedByMonth:any= [];
//     // collection.map((report, i) => {
//     //     const date = report.date.getMonth();
//     //     if (!bucketedByMonth[date]) {
//     //         bucketedByMonth[date] = [report]
//     //     } else {
//     //         bucketedByMonth[date].push(report)
//     //     }
//     // })
//     // return bucketedByMonth.map((elem: Report[]) => {
//     //     console.log(elem)
//     //     if (!elem) {
//     //         return [];
//     //     } else {
//     //         return elem
//     //     }
//     // });

// }

// const getReportsByMonth = (collection: Report[]) => {
//     const bucketedByMonth:any= new Map();
//     collection.map((report, i) => {
//         const monthNum = report.date.getMonth();
//         if (!bucketedByMonth.get(monthNum)) {
//             bucketedByMonth.set(monthNum, { monthNum: monthNum, reports:[report]})
//         } else {
//             const existingValue = bucketedByMonth.get(monthNum)
//             bucketedByMonth.set(monthNum,{...existingValue, reports:[...existingValue.reports, report]} )
//         }
//     })
//     return bucketedByMonth

// }