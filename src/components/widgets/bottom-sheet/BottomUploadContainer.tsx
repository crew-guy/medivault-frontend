import { useState, useEffect,useRef } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { useSelector,useDispatch } from 'react-redux'
import { RootState,AppDispatch } from '@redux/store'
import { Mode } from '@data/interfaces';
import { bindActionCreators } from 'redux'
import * as actionCreators from '@actions/actionCreators'
import UploadReportFiles from '@components/widgets/bottom-sheet/UploadReportFiles';
import { useBottomUploadContainer } from '@contexts/BottomUploadContainerContext';


// if setting up the CSS is tricky, you can add this to your page somewhere:
// <link rel="stylesheet" href="https://unpkg.com/react-spring-bottom-sheet/dist/style.css" crossorigin="anonymous">
import 'react-spring-bottom-sheet/dist/style.css'
import UploadReport from './UploadReport';
import BottomUploadReportFilesProvider from '@contexts/BottomUploadReportFilesContext';

export default function BottomUploadContainer() {
    const bottomUploadContainerOpen = useBottomUploadContainer() 
    const mode = useSelector((state: RootState) => state.patient.mode)
    const uploadedFiles = useSelector((state:RootState)=> state.patient.uploadedFiles)
    const dispatch: AppDispatch = useDispatch()
    const AC = bindActionCreators(actionCreators, dispatch)
    const { toggleAddMode } = AC
    const [innerWidth, setInnerWidth] = useState<number>(0);
    const sheetRef = useRef<any>(null)

    useEffect(() => {
        setInnerWidth(window.innerWidth);
    }, [])

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            sheetRef.current?.snapTo(({ // Showing all the available props
                headerHeight, footerHeight, height, minHeight, maxHeight, snapPoints, lastSnap }:any) =>
                // Selecting the largest snap point, if you give it a number that doesn't match a snap point then it'll
                // select whichever snap point is nearest the value you gave
                Math.max(...snapPoints)
              )
        }
    }, [uploadedFiles])
    
    window.addEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
    })

  return (
    <>
          <BottomSheet
              ref={sheetRef}
              expandOnContentDrag={false}
              open={mode === Mode.ADDING  && bottomUploadContainerOpen }
              onDismiss={() => {
                  toggleAddMode()
              }}
              // maxHeight == window.innerHeight (this variable is defined in the library itself)
              defaultSnap={({ maxHeight }) => {
                  if (uploadedFiles.length === 0) {
                      if (innerWidth > 720) {
                          return maxHeight/2.3
                        } else {
                            return maxHeight /1.9
                      }
                  } else {
                      return maxHeight/0.9
                  }
              }}
              snapPoints={({ maxHeight }) => {
                  return [
                      maxHeight * 0.9,
                    maxHeight / 2.3,
                    maxHeight * 0.6,
                  ]
              }}
              header={
                  <div className="rsbs-header" >
                      <p>Add New Report</p>
                </div>
            }
          >
              {uploadedFiles.length === 0 &&
                  (
                  <>
                    <UploadReportFiles />
                  </>
                  )
              }
              {uploadedFiles.length > 0 && <>
                <BottomUploadReportFilesProvider>
                    <UploadReport />
                </BottomUploadReportFilesProvider>
                  
              </>}
          </BottomSheet>
    </>
  )
}