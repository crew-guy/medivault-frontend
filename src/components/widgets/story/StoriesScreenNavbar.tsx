import React, { useState } from 'react'
import moreIcon from '@images/more-icon.svg'
import backArrow from '@images/back-arrow.svg'
import ShareDelete from '@components/widgets/header/ShareDelete';
import { Mode, SelectedAction, Story } from '@data/interfaces'
import { RootState } from '@redux/store'
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router';

interface I {
    story: Story
}

const StoriesScreenNavbar:React.FC<I> = ({story}) => {
    const history = useHistory()
    // To toggle display of options for sharing/deleting
    // eslint-disable-next-line
    const [_, setActionSelected] = useState<SelectedAction>(SelectedAction.SHARE)
    const [showOptions, setShowOptions] = useState(false)
    const mode = useSelector((store: RootState) => store.patient.mode);
    const toggleOptions = () => {
        setShowOptions((showOptions)=>!showOptions)
    }

    return (
        <div className="stories-screen-navbar">
        <button className="back-arrow" onClick={(e) => {
            e.stopPropagation()
            e.preventDefault();
            history.goBack()
        }} >
            <img src={backArrow} alt="" />
        </button>
        <span>
            <p>{story.header.heading}</p>
            <p>{story.header.subheading}</p>
        </span>
        <button className="more-options" onClick={
                (e:any) => {
                e.stopPropagation()
                e.preventDefault();
                toggleOptions();
            }
        } >
            <img src={moreIcon} alt="" />
        </button>
    {showOptions && mode!==Mode.ADDING &&  <ShareDelete setActionSelected={setActionSelected} />}
    </div>
    )
}

export default StoriesScreenNavbar
