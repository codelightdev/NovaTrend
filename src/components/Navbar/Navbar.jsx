import { useState } from 'react'
import { menuList } from '../../assets/data'
import { NavLink, useLocation } from 'react-router-dom'
import "./Navbar.css"
import { MdOutlineSearch } from 'react-icons/md'
import { IoHeartOutline } from 'react-icons/io5'
import { RiCloseFill, RiMenu2Fill, RiShoppingBagLine } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { RxCaretDown } from 'react-icons/rx'
import { motion , AnimatePresence } from 'motion/react'
import { AiOutlineUserAdd } from 'react-icons/ai'

function Navbar() {

    const [showDropdown, setShowDropdown] = useState(null);
    const [mobileShowDropdown, setMobileShowDropdown] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const location = useLocation();
    const [prevPath, setPrevPath] = useState(location.pathname);

    if (location.pathname !== prevPath) {
        setPrevPath(location.pathname);
        setShowDropdown(null);
        setMobileShowDropdown(null)
        setIsMobileMenuOpen(false)
    }

    const handleShowDropdown = (item) => {
        if (!item.subMenu) return;

        setShowDropdown((prev) =>
            prev === item.name ? null : item.name
        );
    };

    const handleMobileShowDropdown = (item) => {
        if(!item.subMenu) return;

        setMobileShowDropdown((prev) =>
            prev === item.name ? null : item.name
        );
    }

    const handleShowMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const container = {
        hidden: { opacity: 0, y: 15 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.2, staggerChildren: 0.08, ease: "easeInOut" } 
        },
        exit: { 
            opacity: 0, 
            y: 15, 
            transition: { duration: 0.3, ease: "easeInOut" } // Exits faster than it enters
        }
    };

    const childItem = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        transition: { duration: 0.08 } 
    };

    const sidebarContainer = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.25,
                ease: "easeOut",
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeIn",
            },
        },
    };

    const sidebarBox = {
        hidden: {
            x: "-100%",
        },
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 320,
                damping: 32,
                mass: 0.8,
            },
        },
        exit: {
            x: "-100%",
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 1, 1],
            },
        },
    };

  return (
    <header className="nova-header sticky top-0 left-0 w-full h-auto z-50 px-5 py-2 bg-[rgba(248, 243, 239, 0.88)]">
        <nav className="nova-nav flex w-full p-2 justify-between bg-white rounded-2xl">
            <div className="logo flex items-center gap-3">
                <div className="resp-btn">
                    <RiMenu2Fill className="md:hidden block cursor-pointer" onClick={handleShowMobileMenu} size={22} />
                </div>

                <NavLink to="/" className="nova-brand">
                    <h2 className="text-2xl font-extrabold font-heading">
                        Nova<span className="text-coral">Tech</span>
                    </h2>
                </NavLink>
            </div>
            <ul className="desktop-nav my-1 mx-2 md:flex hidden">
                {menuList.map((item) => (
                    <li key={item.name} className="relative inline-block px-2 lg:px-3 py-3">
                        {item.subMenu ? (
                            <div className="w-full">
                               <div className="link-group">
                                    <NavLink to={item.link} onClick={(e) => {
                                                e.preventDefault(); // Prevents it from going anywhere
                                                handleShowDropdown(item);
                                            }}
                                            className={({ isActive }) => 
                                                // Checks if path is active OR if the dropdown is open
                                                `!flex !flex-row !flex-nowrap !items-center gap-1 font-body cursor-pointer ${
                                                    isActive || showDropdown === item.name ? "active font-body" : ""
                                                }`
                                            }
                                        >
                                            <span className="!inline-block whitespace-nowrap">
                                                {item.name}
                                            </span>
                                            <RxCaretDown 
                                                className={`!inline-block !shrink-0 transition-transform duration-300 ${
                                                    showDropdown === item.name ? "rotate-180" : ""
                                                }`} 
                                                size={18} 
                                            />
                                        </NavLink>
                                </div>
                                <AnimatePresence mode="wait">
                                    {showDropdown === item.name && item.subMenu && (
                                        <motion.div
                                            key={item.name}
                                            variants={container}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="submenu-container fixed left-1/2 top-[100px] z-40 w-[calc(100%-40px)] max-w-[1240px] -translate-x-1/2 overflow-y-auto"
                                        >
                                            <div className="menu-box w-full p-5 md:p-7">

                                                {/* Submenu Heading */}
                                                <motion.div
                                                    className="submenu-head mb-6"
                                                    variants={childItem}
                                                >
                                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-coral">
                                                        Discover NovaTech
                                                    </p>

                                                    <h2 className="font-heading text-2xl font-bold text-ink md:text-3xl">
                                                        Explore Categories
                                                    </h2>

                                                    <p className="mt-2 text-sm text-muted">
                                                        Find the technology that fits your lifestyle.
                                                    </p>
                                                </motion.div>

                                                {/* Category Cards */}
                                                <motion.div
                                                    className="submenu-item"
                                                    variants={childItem}
                                                >
                                                    {item.subMenu.map((submenu) => (
                                                        <NavLink
                                                            to={submenu.link}
                                                            key={submenu.name}
                                                            onClick={() => setShowDropdown(null)}
                                                            className="submenu-card"
                                                        >
                                                            <motion.div
                                                                className="submenu-card-content"
                                                                variants={childItem}
                                                            >
                                                                <div className="icon">
                                                                    {submenu.icon}
                                                                </div>

                                                                <div className="cat-text">
                                                                    <span>{submenu.name}</span>

                                                                    <span className="category-arrow">
                                                                        ↗
                                                                    </span>
                                                                </div>
                                                            </motion.div>
                                                        </NavLink>
                                                    ))}
                                                </motion.div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (

                            <NavLink to={item.link} className={({ isActive }) => (isActive && showDropdown === null) ? "active font-body" : "font-body"}>
                                {item.name}
                            </NavLink>
                        )}
                        
                    </li>
                ))}
            </ul>
            <div className="menu-btn flex items-center gap-2 sm:gap-3 mx-2">
                <motion.div className=" search icon relative z-10 cursor-pointer before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[30px] before:h-[30px] before:rounded-full before:bg-white before:-z-10 before:scale-0 hover:before:scale-100 before:duration-500" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.9, y: 1 }} transition={{ type: "spring", stiffness: 700, damping: 20}}>
                    <MdOutlineSearch size={20} className="" />
                </motion.div>
                <motion.div className="wishlist icon relative z-10 cursor-pointer before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[30px] before:h-[30px] before:rounded-full before:bg-white before:-z-10 before:scale-0 hover:before:scale-100 before:duration-500" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.9, y: 1 }} transition={{ type: "spring", stiffness: 700, damping: 20}}>
                    <IoHeartOutline />
                </motion.div>
                <motion.div className="cart icon relative z-10 cursor-pointer before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[30px] before:h-[30px] before:rounded-full before:bg-white before:-z-10 before:scale-0 hover:before:scale-100 before:duration-500" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.9, y: 1 }} transition={{ type: "spring", stiffness: 700, damping: 20}}>
                    <RiShoppingBagLine />
                </motion.div>
                <motion.div className="user icon relative z-10 cursor-pointer before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[30px] before:h-[30px] before:rounded-full before:bg-white before:-z-10 before:scale-0 hover:before:scale-100 before:duration-500" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.9, y: 1 }} transition={{ type: "spring", stiffness: 700, damping: 20}}>
                    <BiUser />
                </motion.div>
            </div>
        </nav>


        <AnimatePresence>
            {isMobileMenuOpen && (  
                    <motion.div className="sidebar-container fixed inset-0 z-[1000] md:hidden" variants={sidebarContainer} initial="hidden" animate="visible" exit="exit" onClick={handleShowMobileMenu}>
                        <motion.div className="ssidebar absolute top-0 left-0 z-[1001] flex h-full w-[300px] max-w-[85vw] flex-col overflow-hidden bg-cloud px-1 py-1 shadow-2xl" variants={sidebarBox} initial="hidden" animate="visible" exit="exit" onClick={(e) => e.stopPropagation()}>
                            <div className="mx-3 my-3 logo gap-3 flex items-center border-b-1 border-b-[rgba(0,0,0,0.2)] pb-2">
                                <div className="resp-btn cursor-pointer">
                                    <RiCloseFill className="font-bold" size={25} onClick={handleShowMobileMenu} />
                                </div>
                                <a href="/">
                                    <h2 className="text-2xl font-bold text-black font-heading">Nova<span className='text-coral'>Tech</span></h2>
                                </a>
                            </div>

                            <div className="menu-list  mx-3 my-10 flex-1 overflow-y-auto scrollbar-none">
                                {menuList.map((item) => (
                                    <div className="menu-box my-1">
                                        {item.subMenu ? (
                                            <>
                                                <NavLink to={item.link} onClick={(e) => {e.preventDefault(); handleMobileShowDropdown(item)}} className="ease-in-out duration-[0.8s] hover:text-coral">
                                                    <div className="menu-logo w-full h-auto p-3 flex items-center gap-3">
                                                        <div className="icon">
                                                            {item.icon}
                                                        </div>
                                                        <div className="menu-text w-full flex items-center justify-between">
                                                            <span>{item.name}</span>
                                                            <RxCaretDown className={`!inline-block !shrink-0 transition-transform duration-300 ${mobileShowDropdown === item.name ? "rotate-180" : ""}`} size={25} />
                                                        </div>
                                                    </div>
                                                </NavLink>
                                                <div className="menu w-full">
                                                    {mobileShowDropdown === item.name && item.subMenu && (
                                                        <div className="w-full py-1">
                                                            <motion.div className="sidebar-submenu mx-1 bg-mist" variants={container} initial="hidden" animate="visible" exit="exit">
                                                                {item.subMenu.map((submenu) => (
                                                                    <NavLink to={submenu.link} className="block px-3 py-2 mt-1 text-wrap ease-in-out duration-[0.3s] hover:!text-coral">
                                                                        <div className="submenu flex gap-2 items-center ">
                                                                            <div className="icon icon my-2  text-3xl md:text-4xl ease-in-out duration-[0.3s] hover:!text-coral">
                                                                                {submenu.icon}
                                                                            </div>
                                                                            <div className="menu-sub-text text-black ease-in-out duration-[0.3s] hover:text-coral">
                                                                                {submenu.name}
                                                                            </div>
                                                                        </div>
                                                                    </NavLink>   
                                                                ))}
                                                            </motion.div>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <NavLink to={item.link} className="ease-in-out duration-[0.8s] hover:text-coral">
                                                <div className="menu-item w-full h-auto p-3 flex items-center gap-3 my-5">
                                                    <div className="icon">
                                                        {item.icon}
                                                    </div>
                                                    <div className="menu-text">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </NavLink>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="sidebar-bottom w-full mt-auto shrink-0 p-3">
                                <motion.button
                                    className="w-full p-2 flex items-center justify-center gap-2 rounded-sm bg-white text-black cursor-pointer shadow-md hover:bg-coral hover:text-white"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.9, y: 1 }}
                                    transition={{ type: "spring", stiffness: 700, damping: 20 }}
                                >
                                    <AiOutlineUserAdd />
                                    <span>Sign In</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
            )}
        </AnimatePresence>
    </header>
  )
}

export default Navbar