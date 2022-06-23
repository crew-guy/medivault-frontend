import logoDark from '@images/logo-dark.svg'
import { motion, AnimatePresence } from 'framer-motion'
const Footer:React.FC = () => {

    return (
        <div className="footer-wrapper">
            <div className="white-bar"></div>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{type:"spring", delay:0.2, duration:1.6}}
                    exit={{opacity: 0, y:40}}
                    className="footer">
                    <div className="heading-wrapper">
                        <p className="heading" >Your goto medical safe</p>
                    </div>
                    <motion.div
                        className="medivault-logo">
                        <div className="logo-img-container">
                            <img className="logo-img" src={logoDark} alt="MediVault" />
                        </div>
                        <p className="logo-text" >medivault</p>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default Footer
