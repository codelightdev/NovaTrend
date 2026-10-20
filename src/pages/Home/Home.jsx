
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LiaCartArrowDownSolid } from 'react-icons/lia'
import { MdStars } from 'react-icons/md'
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Home.css'

const slides = [
  {
    id: 1,
    eyebrow: 'NEW ARRIVALS',
    title: 'ROCO Wireless',
    highlight: 'Headphones',
    description:
      'Immerse yourself in exceptional sound. Designed for effortless listening, all-day comfort, and a style that speaks for itself.',
    image: '/img/products/headphones.png',
    category: 'AUDIO COLLECTION',
    number: '01',
  },
  {
    id: 2,
    eyebrow: 'SMARTER EVERYDAY',
    title: 'Beyond the',
    highlight: 'Ordinary.',
    description:
      'A refined take on everyday technology. Discover thoughtful design and smart features that fit seamlessly into your lifestyle.',
    image: '/img/products/watch.png',
    category: 'SMART ACCESSORIES',
    number: '02',
  },
  {
    id: 3,
    eyebrow: 'POWER MEETS DESIGN',
    title: 'Made for',
    highlight: 'More.',
    description:
      'Meet your next creative companion. Premium performance, elegant design, and the freedom to do more wherever life takes you.',
    image: '/img/products/laptop.png',
    category: 'COMPUTING COLLECTION',
    number: '03',
  },
]

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 45 : -45,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -35 : 35,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  }),
}

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const activeSlide = slides[activeIndex]

  const changeSlide = (newIndex) => {
    if (newIndex === activeIndex) return

    setDirection(newIndex > activeIndex ? 1 : -1)
    setActiveIndex(newIndex)
  }

  const nextSlide = () => {
    changeSlide((activeIndex + 1) % slides.length)
  }

  const prevSlide = () => {
    changeSlide((activeIndex - 1 + slides.length) % slides.length)
  }

  return (
    <section id="heroSection">
      <div className="hero-shell">
        {/* Decorative background */}
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <div className="hero-inner">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeSlide.id}
              className="hero-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* LEFT: Product content */}
              <div className="hero-copy">
                <div className="hero-eyebrow">
                  <span className="hero-eyebrow-icon">
                    <MdStars size={17} />
                  </span>
                  <span>{activeSlide.eyebrow}</span>
                  <span className="hero-eyebrow-line" />
                </div>

                <div className="hero-heading-wrap">
                  <h1 className="hero-heading">
                    {activeSlide.title}
                    <br />
                    <span>{activeSlide.highlight}</span>
                  </h1>
                </div>

                <p className="hero-description">
                  {activeSlide.description}
                </p>

                <div className="hero-actions">
                  <Link to="/shop" className="hero-cta">
                    <span>Explore collection</span>
                    <span className="hero-cta-icon">
                      <LiaCartArrowDownSolid size={23} />
                    </span>
                  </Link>

                  <Link to="/shop" className="hero-secondary-link">
                    Discover more
                    <FiArrowUpRight size={17} />
                  </Link>
                </div>

                <div className="hero-bottom-info">
                  <span className="hero-category">
                    {activeSlide.category}
                  </span>
                  <span className="hero-bottom-divider" />
                  <span>Curated for you</span>
                </div>
              </div>

              {/* RIGHT: Product showcase */}
              <div className="hero-visual">
                <div className="hero-visual-ring" />

                <div className="hero-image-backdrop">
                  <span className="hero-backdrop-word">
                    NOVA
                  </span>
                </div>

                <motion.div
                  className="hero-image-wrap"
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={{
                    opacity: 1,
                    y: [0, -7, 0],
                    scale: 1,
                  }}
                  transition={{
                    opacity: { duration: 0.45, delay: 0.12 },
                    scale: { duration: 0.55, ease: 'easeOut' },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                >
                  <img
                    className="hero-product-image"
                    src={activeSlide.image}
                    alt={`${activeSlide.title} ${activeSlide.highlight}`}
                  />
                </motion.div>

                <div className="hero-product-tag">
                  <span className="hero-tag-dot" />
                  <span>{activeSlide.category}</span>
                </div>

                <div className="hero-index">
                  <span>{activeSlide.number}</span>
                  <span className="hero-index-line" />
                  <span>03</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SLIDER FOOTER */}
          <div className="hero-slider-footer">
            <div className="hero-slider-left">
              <span className="hero-slide-current">
                {activeSlide.number}
              </span>

              <div className="hero-progress-track">
                <motion.div
                  key={activeIndex}
                  className="hero-progress-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (activeIndex + 1) / slides.length }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                />
              </div>

              <span className="hero-slide-total">03</span>
            </div>

            <div className="hero-slider-center">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`hero-dot ${
                    activeIndex === index ? 'active' : ''
                  }`}
                  onClick={() => changeSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={
                    activeIndex === index ? 'true' : undefined
                  }
                />
              ))}
            </div>

            <div className="hero-slider-arrows">
              <button
                type="button"
                className="hero-arrow"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <FiArrowLeft size={19} />
              </button>

              <button
                type="button"
                className="hero-arrow hero-arrow-next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <FiArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
