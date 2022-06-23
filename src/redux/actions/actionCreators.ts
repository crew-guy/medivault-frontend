import *as actions from './actionTypes'
// import {Report} from '@data/interfaces'
import { FileInterface, Report } from '../data/interfaces'
import {v4 as uuid} from 'uuid'

export const setReportsCollection = (fetchedReportsCollection:Report[]) => {
    
    return (dispatch: any) => dispatch({
        type: actions.SETTING_REPORTS_COLLECTION,
        payload:{fetchedReportsCollection}
    })
}

export const toggleAddMode = () => {
    return (dispatch:any) => dispatch({
        type:actions.TOGGLE_ADD_MODE
    })
}

export const toggleSelectionMode = () => {
    return(dispatch:any) => dispatch({ type: actions.TOGGLE_SELECTION_MODE})
}

export const selectReport = (report:Report) => {
    return (dispatch: any) => dispatch({
        type: actions.SELECT_REPORT,
        payload: { report }
    })
}
export const deselectReport = (report: Report) => {
    return (dispatch:any) => dispatch({ type: actions.DESELECT_REPORT, payload:{report}})
}

export const setUser = (name: string, phoneNumber:string,jwt:string) => {
    return (dispatch: any) => dispatch({
        type: actions.SETTING_USER,
        payload:{user:{patientName:name, phoneNumber:phoneNumber,jwt:jwt}}
    })
}

export const uploadFile = (file: FileInterface) => {
    return (dispatch: any) => dispatch({
        type: actions.ADDING_FILE,
        payload:{file:{...file,uuid:uuid()}}
    })
}

export const removeUploadedFile = (uuid: string) => {
return (dispatch: any) =>
    dispatch({
    type: actions.REMOVE_UPLOADED_FILE,
    payload:{uuid}
})
}

export const clearUploadedFiles = () => {
    return (dispatch: any) => dispatch({
        type:actions.CLEAR_UPLOADED_FILES,
    })
}


export const uploadReport = (report:Report) => {
    return (dispatch: any) => dispatch({
        type: actions.UPLOAD_REPORT,
        payload:{report}
    })
}