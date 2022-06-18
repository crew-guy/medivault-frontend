import { ReportType } from '@data/interfaces';
import React, { Dispatch, SetStateAction,useState } from 'react'

interface FormInterface {
    reportName: string,
    reportDate: Date,
    reportType:ReportType|string
}


const ButtonTray: React.FC<{ setForm: Dispatch<SetStateAction<FormInterface>> }> = ({ setForm }) => {
    const [isCustomTagVisible, setIsCustomTagVisible] = useState<boolean>()
    
    const handleButtonSelect = (e:any) =>
    {
        e.stopPropagation();
        const selectedButton = e.target as HTMLButtonElement
        if (e.target.value === ReportType.OTHER) {
            setIsCustomTagVisible(true)
        } else {
            setIsCustomTagVisible(false)
        }
        setForm((prevForm: FormInterface) => ({ ...prevForm, reportType: e.target.value }))
        const allBtns = e.target.parentElement.childNodes
        allBtns.forEach((btn:any) => btn.classList.remove('active'))
        selectedButton.classList.add('active')
    }
    return (
        <div className="btn-tray">
        <p>Type of the report</p>
        <Button text={"Prescription"} buttonType={ReportType.PRESCRIPTION} handleClick={handleButtonSelect} />
        <Button text={"Vaccine"} buttonType={ReportType.VACCINE} handleClick={handleButtonSelect} />
        <Button text={"Lab Report"} buttonType={ReportType.LAB_REPORT} handleClick={handleButtonSelect} />
        <Button text={"Other"} buttonType={ReportType.OTHER} handleClick={handleButtonSelect} />
            {
                isCustomTagVisible && <>
                    <input
                        title="input"
                        type="text"
                        className="report-tag-input"
                        onChange={(e:any)=>setForm((prevForm:FormInterface)=> ({...prevForm, reportType:e.target.value}))}
                    />
                </>
            }
    </div>
    )
}

export default ButtonTray

const Button = (
    {
        text,
        buttonType,
        handleClick
    }: {
            text: string,
            buttonType: ReportType,
            // TODO : assign a type to e
            handleClick: (e: any) => void
    }) => {
    return (
        <button 
            type="button" 
            value={buttonType} 
            onClick={(e)=>handleClick(e)} 
            className="id-btn"
        >
                {text}
        </button>
    )
}