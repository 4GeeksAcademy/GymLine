import { useState, useEffect, useRef } from "react";

const useScrollSection = (ref, direction) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const { current: sectionRef } = ref;

    const handleScroll = (e) => {
      if (direction === "next") {
        if (sectionRef.offsetLeft + sectionRef.offsetWidth < container.scrollLeft) {
          setIsScrolling(true);
          container.scrollTo({
            left: sectionRef.offsetLeft,
            behavior: "smooth",
          });
        }
      } else {
        if (sectionRef.offsetLeft > container.scrollLeft) {
          setIsScrolling(true);
          container.scrollTo({
            left: sectionRef.offsetLeft - container.offsetWidth,
            behavior: "smooth",
          });
        }
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [ref, direction]);

  useEffect(() => {
    if (!isScrolling) return;

    const timer = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isScrolling]);

  return isScrolling;
};

export default useScrollSection;