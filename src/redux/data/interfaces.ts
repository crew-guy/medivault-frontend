//? Interfaces related to a file, like an image, pdf, doc, etc.
export enum MimeType{
    PDF = "application/pdf",
    NON_PDF = ""
}

export interface FileInterface{
    dataUrl: string,
    thumbnailUrl:string,
    fileMimeType: MimeType,
    uuid?:string
}

//? Interfaces related to a report - collection of files, title, date, tags
export interface Report {
    files: FileInterface[],
    // Phone number field will exist on a report only if reports are stored in a separate database and users in another database
    authorId?: string, // to link a report to a unique patient
    date: Date,
    uuid: string,
    tags: (ReportType|string)[],
    partsAffected?: BodyParts[]
    title:string
}

// blood , bone , eye , respiratory, lungs, limbs, nost, ear, throat
export enum BodyParts{
    BLOOD = 'BLOOD',
    BONE = 'BONE',
    EYE = 'EYE',
    RESPIRATORY = 'RESPIRATORY',
    LIMBS = 'LIMBS',
    NOSTRILS = 'NOSTRILS',
    EARS = 'EARS',
    THROAT = 'THROAT'
}

export interface ReportsCollection{
    reports: Report[],
}

export enum ReportType{
    PRESCRIPTION = "prescription",
    VACCINE = "vaccine",
    LAB_REPORT = "lab-report",
    OTHER = "other"
}

//? Interface for the currently logged in user 
export interface User{
    patientName: string, 
    phoneNumber?: string, // phone number can be uuid
    jwt:string // jwt can be uuid
}

//? Interfaces for controlling the UI

// Interface that sets the mode of the screen as per 1 of 3 actions by the user
// 1. Viewing the records
// 2. Selecting records to
    // a. share them
    // b. delete them
// 3. Adding a new record using the form in the bottom sheet
export enum Mode {
    VIEWING = "viewing",
    SELECTING = "selecting",
    ADDING="adding"
}

export enum SelectedAction {
    SHARE="Share",
    DELETE="Delete",
}

// The interface of this object was determined from the object "react-insta-stories" npm package expects, as specified in their docs
export interface Story{
    url: string,
    header: {
        heading: string, 
        subheading:string,
    },
    fileMimeType:MimeType
}

// The state of the entire app
export interface AppState {
    user: User,
    doctor: Doctor,
    mode:Mode
    reportsCollection: ReportsCollection,
    selectedReports: Report[]
    uploadedFiles:FileInterface[],
}


export interface Doctor{
    uuid:string
    qualification:string
    imgUrl:string
    experience:string
}