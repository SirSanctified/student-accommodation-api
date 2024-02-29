import { useState, useEffect } from "react";

function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQueryListMobile = window.matchMedia("(max-width: 767.98px)");
    const mediaQueryListDesktop = window.matchMedia("(min-width: 768px)");

    setIsMobile(mediaQueryListMobile.matches);
    setIsDesktop(mediaQueryListDesktop.matches);

    const handleChangeMobile = () => setIsMobile(mediaQueryListMobile.matches);
    const handleChangeDesktop = () =>
      setIsDesktop(mediaQueryListDesktop.matches);

    mediaQueryListMobile.addEventListener("change", handleChangeMobile);
    mediaQueryListDesktop.addEventListener("change", handleChangeDesktop);

    return () => {
      mediaQueryListMobile.removeEventListener("change", handleChangeMobile);
      mediaQueryListDesktop.removeEventListener("change", handleChangeDesktop);
    };
  }, []);

  return { isMobile, isDesktop };
}

export { useMediaQuery };
