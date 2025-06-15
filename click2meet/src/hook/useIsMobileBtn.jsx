import { useEffect, useState } from "react";

function useIsMobileBtn(breakpoint = 768) {
  const [isMobileBtn, setIsMobileBtn] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileBtn(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobileBtn;
}

export default useIsMobileBtn;