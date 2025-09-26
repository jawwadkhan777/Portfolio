import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from "motion/react"

const Work = ({isDarkMode}) => {
    const fullText =
    "Welcome to my portfolio — browse front-end and full-stack projects that demonstrate how I can bring your ideas to life.";

  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const paragraphRef = useRef(null);
  const inView = useInView(paragraphRef, { once: false }); 

   const intervalRef = useRef(null);

  useEffect(() => {
    if (!inView) {
      // Stop if we leave the viewport
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Reset everything
    setTypedText("");
    setShowCursor(true);

    let i = 0;

    // Clear any running interval before starting new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      i++;
      if (i <= fullText.length) {
        // Slice directly from the original text → no race conditions
        setTypedText(fullText.slice(0, i));
      } else {
        clearInterval(intervalRef.current);
        setShowCursor(false);
      }
    }, 40);

    return () => {
      // Cleanup on unmount or on inView change
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView]);


  return (
    <motion.div 
    initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}
    id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 
        initial={{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.5, delay: 0.3}}
        className='text-center mb-2 text-lg font-ovo'>My portfolio</motion.h4>
        <motion.h2 
        initial={{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.5, delay: 0.5}}
        className='text-center text-5xl font-ovo'>My latest work</motion.h2>

        <motion.p 
        ref={paragraphRef}
        initial={{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.5}}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
            {typedText}
                  {/* Blinking cursor stays inline with text */}
                  {showCursor && (
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      |
                    </motion.span>
                  )}
        </motion.p>

        <motion.div 
        initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.6, delay: 0.9}}
        className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] my-10 gap-5 dark:text-black'>
            {workData.map((project, index)=> (
                <motion.div 
                whileHover={{scale:1.05}}
                transition={{duration:0.3}}
                key={index} style={{backgroundImage: `url(${project.bgImage})`}} className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'>
                    <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                        <div>
                            <h2 className='font-semibold'>{project.title}</h2>
                            <p className='text-sm text-gray-700'>{project.description}</p>
                        </div>
                        <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'>
                            <Image src={assets.send_icon} alt='send-icon' className='w-5' />
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>

        <motion.a 
        initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5, delay:1.1}}
        href="#contact" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover'>
            Get in touch to collaborate
            <Image src={isDarkMode? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='right-arrow' className='w-4' />
        </motion.a>
    </motion.div>
  )
}

export default Work