import { useSelector } from 'react-redux'
import type {RootState} from '@redux/store'
import ReportYearContainer from './ReportYearContainer';


const ReportsWrapper = () => {
    const collection = useSelector((state: RootState) => state.app.reportsCollection).reports;
    const chronologicalCollection = collection?.sort((a: any, b: any) => b.date - a.date)
    const bucketedByYear: any = new Map();
    chronologicalCollection?.forEach((report: any) => {
        if (report?.date?.getFullYear()) {
            const yearNum = report?.date?.getFullYear();
            if (!bucketedByYear.get(yearNum)) {
                bucketedByYear?.set(yearNum, { yearNum: yearNum, reports: [report] })
            } else {
                const existingValue = bucketedByYear.get(yearNum)
                bucketedByYear?.set(yearNum, { ...existingValue, reports: [...existingValue.reports, report] })
            }
        }
    });
    const yearlyReportsArray:any[] = [];
    const yearKeyArray:string[] = [];
    bucketedByYear?.forEach((value: any, key: any) => yearlyReportsArray.push(value));
    bucketedByYear?.forEach((value: any, key: any) => yearKeyArray.push(key))
    return (
        <div className="reports-wrapper">
            {
                yearlyReportsArray.map((object, i) => {
                    return (<ReportYearContainer key={i} index={i} yearKey={object.yearNum} yearlyReports={object.reports} />)
                })
            }
        </div>
    )
}

export default ReportsWrapper