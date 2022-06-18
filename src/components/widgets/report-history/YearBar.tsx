import React from 'react'
// eslint-disable-next-line
// import {motion} from 'framer-motion'


const YearBar: React.FC<{ yearKey: string,barIndex: number }> = ({ yearKey,barIndex }) => {

    return (
            <div className="year-bar" >
                <p>{yearKey }</p>
                <p>{ barIndex === 0 ? "": "" }</p>
            </div>
    )
}

export default YearBar