import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from "motion/react"

const Header = () => {
    const fullText =
    "CS Undergraduate at UOK (UBIT) | Full-Stack Web Developer Learner | Exploring AI | Core Java | Python (Basic) | OOP | SQL | DSA";

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
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4'>
        <motion.div 
        initial={{scale: 0}}
        whileInView={{scale: 1}}
        transition={{duration: 0.8, type: "spring", stiffness: 100}}
        >
            <Image src={assets.profile_img} alt='' className='rounded-full w-32' />
        </motion.div>

        <motion.h3 
        initial={{y:-20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6, delay:0.3}}
        className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'>Hi! I'm Jawwad Khan
            <Image src={assets.hand_icon} alt='' className='w-6' />
        </motion.h3>

      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-ovo flex items-center justify-center"
      >
        Web developer based in Pakistan.
      </motion.h1>

      <motion.p
      ref={paragraphRef}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto font-ovo"
    >
      {/* Typed text */}
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

        {/* <motion.p 
        initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.6, delay:0.7}}
        className='max-w-2xl mx-auto font-ovo'>
            CS Undergraduate at UOK (UBIT) | Full-Stack Web Developer Learner | Exploring AI | Core Java | Python (Basic) | OOP | SQL | DSA
        </motion.p> */}
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <motion.a 
            initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6, delay:1}}
            href="#contact" className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'>contact me
                <Image src={assets.right_arrow_white} alt='' className='w-4' />
            </motion.a>
            <motion.a 
            initial={{y:30, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:0.6, delay:1.2}}
            href="/sample-resume.pdf" className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'>my resume
                <Image src={assets.download_icon} alt='' className='w-4' />
            </motion.a>
        </div>
    </div>
  )
}

export default Header