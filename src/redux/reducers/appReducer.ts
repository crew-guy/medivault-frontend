import * as actions from '@actions/actionTypes'
import { AppState, FileInterface } from '@data/interfaces';
import { initialState } from '@data/data';
import { Mode } from '@data/interfaces'

const appReducer = (state:AppState=initialState , {type,payload}:any) => {
    switch (type) {
        // Setting the app state with data from the backend 
        case actions.SETTING_USER:
            return {
                ...state,
            user:payload.user
            }
        case actions.SETTING_REPORTS_COLLECTION:
            return {
                ...state,
                reportsCollection: {
                    reports:payload.fetchedReportsCollection,
                }
            }
            
        // Related to changing the UI based on some action
        case actions.TOGGLE_ADD_MODE:
            return {
                ...state,
                mode:state.mode === Mode.ADDING ? Mode.VIEWING:Mode.ADDING
            }
        case actions.TOGGLE_SELECTION_MODE:
            return {
                ...state,
                mode:state.mode ===Mode.SELECTING ? Mode.VIEWING : Mode.SELECTING
            }
        
        // Related to selecting some report(s) and then sharing and deleting them 
        case actions.SELECT_REPORT:
            return {
                ...state,
                selectedReports:[...state.selectedReports, payload.report]
            }
        case actions.DESELECT_REPORT:
            return {
                ...state,
                selectedReports:state.selectedReports.filter((rep)=> rep.uuid !== payload.report.uuid)
        }
        // Related to uploading a new report
        case actions.ADDING_FILE:
            return {
                ...state,
                uploadedFiles :[...state.uploadedFiles, payload.file]
            }
        case actions.REMOVE_UPLOADED_FILE:
            return {
                ...state,
                uploadedFiles :state.uploadedFiles.filter((file:FileInterface)=>file.uuid !== payload.uuid )
            }
        case actions.CLEAR_UPLOADED_FILES:
            return {
                ...state,
                uploadedFiles: []
            }
        case actions.UPLOAD_REPORT:
            return {
                ...state,
                reportCollection: [...state.reportsCollection.reports, payload.report]
            }
        // Default case
        default:
            return {...state};
    }
}

export default appReducer