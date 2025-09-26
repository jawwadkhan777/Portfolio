import { assets, serviceData } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const Services = () => {
  const fullText =
    "Junior full-stack web developer from Pakistan, providing high-quality web development solutions and personalised tuition in programming languages, OOP principles, Web Development and Software Engineering Fundamentals.";

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="services"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        What I offer
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        My Services
      </motion.h2>

      <motion.p
      ref={paragraphRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 my-10"
      >
        {serviceData.map(({ icon, title, description, link }, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12 cursor-pointer hover:shadow-black hover:bg-lightHover hover:-translate-y-1 duration-500 dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50"
          >
            <Image src={icon} alt="" className="w-10" />
            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-5 dark:text-white/80">
              {description}
            </p>
            <a href={link} className="flex items-center gap-2 text-sm mt-5">
              Read more{" "}
              <Image src={assets.right_arrow} alt="" className="w-4" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
