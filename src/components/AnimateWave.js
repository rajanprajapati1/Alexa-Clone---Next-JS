import React from 'react'
import { motion } from 'framer-motion'
const AnimateWave = ({ isRecording }) => {
    return (
        <div className="flex space-x-2">
            {[0, 1, 2, 3].map((index) => (
                <motion.div
                    key={index}
                    className="w-16 sm:w-14 h-40 sm:h-40 bg-white rounded-full"
                    animate={
                        isRecording
                            ? {
                                height: ["10rem", "5rem", "7rem"],
                                transition: {
                                    duration: 1,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: index * 0.1,
                                },
                            }
                            : {}
                    }
                />
            ))}
        </div>
    )
}

export default AnimateWave