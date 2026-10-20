import { Outlet } from "react-router-dom"
// import CustomCursor from "../../components/CustomCursor/CustomCursor"
import Navbar from "../../components/Navbar/Navbar"
import { motion, useScroll } from "motion/react"

function RootLayout() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          originX: 0,
          borderRadius: "10px",
          backgroundColor: "var(--color-coral)",
          zIndex: 60, // Ensure it sits above the navbar z-50
        }}
      />
      <div className="app min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default RootLayout