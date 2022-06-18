import {User, Mode} from '../data/interfaces'
import { apiClient } from '@utils/apiClient';


export const retrieveData = async (patientId:string) => {
    try {
        const reportsCollection: any = await apiClient.get(`/reports/${patientId}`)
        const parsedReportsCollection = reportsCollection.data.map((report: any) => ({...report, date: new Date(report.date)}))
        return parsedReportsCollection
    } catch (error) {
        console.log(error)
        throw error
    }
}

const initialUser: User = {
    patientName: "Demo User",
    phoneNumber: "9820178330",
    jwt: ""
}

export const initialState = {
    user: initialUser,
    reportsCollection: {reports: []},
    selectedReports: [],
    mode: Mode.VIEWING,
    uploadedFiles: [],
}
