import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from "motion/react"

const About = ({isDarkMode}) => {
  const fullText =
    "Highly motivated and dedicated student with a strong commitment to continuous learning and personal growth. Eager to contribute my skills and work ethic to an organization that values innovation and professional development, while leveraging opportunities to further enhance my expertise and create mutual success.";

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
    id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <motion.h4 
      initial={{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.5, delay:0.3}}
      className='text-center mb-2 text-lg font-ovo'>Introduction</motion.h4>
      <motion.h2 
      initial={{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.5, delay:0.5}}
      className='text-center text-5xl font-ovo'>About me</motion.h2>

      <motion.div 
      initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8}}
      className='flex w-full flex-col lg:flex-row items-center gap-20 my-10'>
        <motion.div 
        initial={{opacity:0, scale:0.9}} whileInView={{opacity:1, scale:1}} transition={{duration:0.6}}
        className='w-64 sm:w-80 rounded-3xl max-w-none'>
          <Image src={assets.user_image} alt='user' className='w-full rounded-3xl'/>
        </motion.div>

        <motion.div 
        initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.6}}
        className='flex-1'>
          <p ref={paragraphRef} className='mb-10 max-w-2xl font-ovo'>
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
          </p>

          <motion.ul 
          initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8, delay:1}}
          className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
            {infoList.map(({icon, iconDark, title, description}, index)=> (
              <motion.li 
              whileHover={{scale:1.05}}
              key={index} className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover duration-500 hover:-translate-y-1 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50'>
                <Image src={isDarkMode? iconDark : icon} alt='title' className='w-7 mt-3' />
                <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.h4 
          initial={{y:20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:1.3, delay:0.5}}
          className='my-6 text-gray-700 font-ovo dark:text-white/80'>Tools I use</motion.h4>
          <motion.ul 
          initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1.5, delay:0.6}}
          className='flex items-center gap-3 sm:gap-5'>
            {toolsData.map((tool, index)=> (
              <motion.li 
              whileHover={{scale: 1.1}}
              key={index} className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer duration-500 hover:-translate-y-1'>{
                <Image src={tool} alt='tool' className='w-7 sm:w-9' />
              }</motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default About