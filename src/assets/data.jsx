import { FiSmartphone, FiWatch, FiHome, FiShoppingBag, FiGrid, FiPackage, FiMail } from "react-icons/fi";
import { BsLaptop, BsTablet } from "react-icons/bs";
import { LuCable } from "react-icons/lu";

export const menuList = [
  {
    name: "Home",
    link: "/",
    icon: <FiHome size={18} />,
  },
  {
    name: "Shop",
    link: "/shop",
    icon: <FiShoppingBag size={18} />,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <FiGrid size={18} />,
    subMenu: [
      {
        name: "Smartphones",
        category: "smartphones",
        link: "/categories/smartphones",
        icon: <FiSmartphone size={18} />,
      },
      {
        name: "Laptops",
        category: "laptops",
        link: "/categories/laptops",
        icon: <BsLaptop size={18} />,
      },
      {
        name: "Tablets",
        category: "tablets",
        link: "/categories/tablets",
        icon: <BsTablet size={18} />,
      },
      {
        name: "Mobile Accessories",
        category: "mobile-accessories",
        link: "/categories/mobile-accessories",
        icon: <LuCable size={18} />,
      },
      {
        name: "Men's Watches",
        category: "mens-watches",
        link: "/categories/mens-watches",
        icon: <FiWatch size={18} />,
      },
      {
        name: "Women's Watches",
        category: "womens-watches",
        link: "/categories/womens-watches",
        icon: <FiWatch size={18} />,
      },
    ],
  },
  {
    name: "New Arrivals",
    link: "/new-arrivals",
    icon: <FiPackage size={18} />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <FiMail size={18} />,
  },
];