import { useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";

export default function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const currentRef = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          });
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [controls]);

  return { ref, controls };
}
