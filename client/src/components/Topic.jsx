import React, { useState } from 'react'
import { motion } from "motion/react"

function Topic() {
    const[topic, setTopic] = useState("")
    const[classLevel, setClassLevel] = useState("")
    const[examType, setExamType] = useState("")
    const[revisionMode, setRevisionMode] = useState(false)
    const[includeDiagram, setIncludeDiagram] = useState(false)
    const[includeChart, setIncludeChart] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            
            className='rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 
            backdrop-blur-2xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.75)] p-8 space-y-6 text-white  '>

                <input type="text " className='w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg
                border border-white/20 placeholder-gray-400 text-white 
                focus:outline-none focus:ring-2 focus:ring-white/30 ' placeholder='Enter topic (eg. Web development )' />

        </motion.div>
    )
}

export default Topic