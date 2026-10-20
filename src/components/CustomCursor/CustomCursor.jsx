import { useEffect, useState } from "react";
import {
  motion as Motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import "./CustomCursor.css";

function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
  });

  const springY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);

  useEffect(() => {
    const interactiveSelector =
      "a, button, input, select, textarea, [role='button']";

    const moveCursor = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);
    };

    const handlePointerOver = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const interactive = target.closest(interactiveSelector);

      setIsOverLink(Boolean(interactive));
      setIsHovering(
        Boolean(target.closest("[data-cursor-hover]"))
      );
    };

    const handlePointerOut = (event) => {
      const target = event.relatedTarget;

      if (!(target instanceof Element)) {
        setIsOverLink(false);
        setIsHovering(false);
        return;
      }

      setIsOverLink(
        Boolean(target.closest(interactiveSelector))
      );

      setIsHovering(
        Boolean(target.closest("[data-cursor-hover]"))
      );
    };

    window.addEventListener("pointermove", moveCursor);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [mouseX, mouseY]);

  return (
    <Motion.div
      className="custom-cursor"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: isVisible && !isOverLink ? 1 : 0,
        backgroundColor: isHovering
          ? "rgba(220, 214, 247, 0.7)"
          : "rgba(255, 255, 255, 0.55)",
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 24,
        },
        backgroundColor: {
          duration: 0.25,
        },
        opacity: {
          duration: 0.12,
        },
      }}
    />
  );
}

export default CustomCursor;