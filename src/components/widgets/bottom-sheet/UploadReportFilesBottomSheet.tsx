import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import UploadReportFiles from '@components/widgets/bottom-sheet/UploadReportFiles';
import {useBottomUploadReportFilesContext} from '@contexts/BottomUploadReportFilesContext'

const UploadReportFilesBottomSheet: React.FC<{ setOpenUploadMore: Dispatch<SetStateAction<boolean>> }> = ({setOpenUploadMore}) => {
    const [innerWidth, setInnerWidth] = useState<number>(0);
    const bottomUploadReportFilesOpen = useBottomUploadReportFilesContext()

    useEffect(() => {
        setInnerWidth(window.innerWidth);
    }, [])
    
    window.addEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
    })

    return (
        <BottomSheet
              open={bottomUploadReportFilesOpen}
              onDismiss={() => {
                  setOpenUploadMore(false)
              }}
              // maxHeight == window.innerHeight (this variable is defined in the library itself)
              defaultSnap={({ maxHeight }:{maxHeight:number}) => {
                  if (innerWidth > 720) {
                    return maxHeight /1.5
                  } else {
                      return maxHeight/2.3
                  }
              }}
              expandOnContentDrag={true}
              header={
                  <div className="rsbs-header" >
                      <p>Add New File</p>
                </div>
            }
          >
            <>
                <UploadReportFiles />
            </>
          </BottomSheet>
    )
}

export default UploadReportFilesBottomSheet
