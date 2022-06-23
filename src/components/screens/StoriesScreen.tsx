import { useState} from 'react'
import {useLocation} from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
import PDFViewer from '@components/widgets/story/PDFViewer';
import { MimeType,Story } from '@data/interfaces';
import StoriesScreenNavbar from '@components/widgets/story/StoriesScreenNavbar';
import StoriesWidget from '@components/widgets/story/StoriesWidget';

interface StoriesInterface{
    stories: Story[]
}

const StoriesScreen = () => {

    
    const  location  = useLocation()
    const { stories } = location.state as StoriesInterface
    // eslint-disable-next-line
    const [currentStories, setCurrentStories] = useState<Story[]>(stories)
    // TODO : Define type of this stories array
    const storiesArray:any = currentStories.map((story:Story ,i) => {
        return (
            {
                content: ({ action, isPaused }: any) => {
                    return (
                        <>
                            <StoriesScreenNavbar story={story}/>                            
                            <div className="stories-image-container">
                                {
                                    story.fileMimeType === MimeType.PDF
                                        ? <PDFViewer pdfSrc={story.url} />
                                        : <img src = {story.url} alt = "medical report"/>
                                }
                            </div>
                        </>
                    );
                },
            }
        )   
    })    

    return (
        <div className="stories-screen">
            <StoriesWidget storiesArray={ storiesArray}/>
        </div>
    )
}

export default StoriesScreen

