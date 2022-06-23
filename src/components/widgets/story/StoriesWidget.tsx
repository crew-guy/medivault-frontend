import React, { useRef, useState,useEffect } from 'react'
import { useHistory } from 'react-router'
import Stories from 'react-insta-stories';

const StoriesWidget = ({storiesArray}:any) => {
    // Code to handle going back and forth between images in the same story
    const storiesContainerRef = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState<number>(0)
    const TOTAL_TIME_INTERVAL = 2000000
    const history = useHistory()
    const TIME_PER_STORY = TOTAL_TIME_INTERVAL / storiesArray.length;

    // let interval: any

    // const updateCount = (() => {
    //     setCount((prevCount:number) => prevCount + 1)
    // })

    // function playinterval(){
    //     interval = setTimeout(function(){updateCount();},TIME_PER_STORY); 
    //     return false;
    //   }
      
    //   function stopinterval(){
    //       clearTimeout(interval);
    //     return false;
    // }

    
    useEffect(() => {
        if (count >= storiesArray.length || count < 0) {
            history.goBack()
        } else {
            // Effort to have no gradually increasing progress bar but just a filled static dash showing current story selected 
            const tabsContainer = document.querySelector('.stories-container > div')!.children[0] as any
            tabsContainer.style.marginTop = "1rem"
            const activeChild = tabsContainer.children[count]
            const progress = activeChild.children[0]! as any
            progress.style.transform = "scaleX(1)"
        }
    // eslint-disable-next-line
    },[count])
    return (
        <div className="stories-container" ref={storiesContainerRef} onClick={(e: any) => {
            e.stopPropagation()
            const left = (window.innerWidth / 2) > e.clientX
            if (left) {
                setCount((prevCount: number) => prevCount - 1)
            }
            if (!left) {
                setCount((prevCount: number) => prevCount + 1)
            }
        }}  >
            <Stories
                defaultInterval={TIME_PER_STORY}
                width={window.innerWidth}
                height={window.innerHeight}
                stories={storiesArray}
                // onStoryStart={() => {
                //     count++;
                //     playinterval()
                // }}
                currentIndex={count}
                // onStoryEnd={() => {
                //     stopinterval()
                // }}
                loop={false}
                keyboardNavigation={true}
                onAllStoriesEnd={()=>history.goBack()}
            />
        </div>
    )
}

export default StoriesWidget
