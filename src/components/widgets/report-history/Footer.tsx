import {useEffect} from 'react'
import logoDark from '@images/logo-dark.svg'
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion'
const Footer:React.FC<{setReachedFooter:any}> = ({setReachedFooter}) => {
    // eslint-disable-next-line
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0.01,
    });

    useEffect(() => {
        setReachedFooter(inView)
        // eslint-disable-next-line
    },[inView])

    return (
        <div ref={ref} className="footer-wrapper">
            <div className="white-bar"></div>
            <AnimatePresence>
                {inView && <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{type:"spring", delay:0.2, duration:1.6}}
                    exit={{opacity: 0, y:40}}
                    className="footer">
                    <div className="heading-wrapper">
                        <p className="heading" >Your goto medical safe</p>
                    </div>
                    <motion.div
                        className="farmako-logo">
                        <div className="logo-img-container">
                            <img className="logo-img" src={logoDark} alt="MediVault" />
                        </div>
                        <p className="logo-text" >medivault</p>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default Footer
