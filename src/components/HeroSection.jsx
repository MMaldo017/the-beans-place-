// ============================================================
// HEROSECTION.JSX — The Hero / Landing Section (Day 2-3)
// ============================================================
// The Hero Section is the first thing visitors see. It contains
// the big headline, a tagline, call-to-action buttons, trust
// indicators, and a large hero image of coffee beans.
//
// WHAT YOU WILL LEARN:
// - Importing React hooks (useEffect, useState) and images
// - Using framer-motion for scroll-based parallax animations
// - Creating animation variants (objects that define motion)
// - Embedding JavaScript expressions in JSX with { }
// - Scroll-to-section with document.getElementById()
// - Reusing UI components (Button, Badge)
//
// CONCEPTS COVERED:
// - Named imports vs default imports
// - Motion components (motion.h1, motion.div, motion.img)
// - useScroll, useTransform hooks from framer-motion
// - Animation variants with staggerChildren
//
// ============================================================

// STEP 1: Imports
// Import hooks from react: useEffect, useState
// Import motion utilities from "framer-motion":
//   - motion, useScroll, useTransform
// Import the hero image: import heroBeans from "../assets/hero-beans.png";
// Import reusable UI components: Button and Badge

/* --- YOUR IMPORTS GO HERE --- */
import {motion,useScroll,useTransform} from "framer-motion";
//the hero image file
import  heroBeans from "../assets/hero-beans.png";
//our custom resuable UI components
import Button from "./ui/Button";
import Badge from "./ui/Badge";



// STEP 2: Animation Variants (outside the component)
// Create two objects that define how text animates:
//
// const textVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } }
// };
//
// const wordVariant = {
//   hidden: { opacity: 0, y: 60, rotateX: -40 },
//   visible: {
//     opacity: 1, y: 0, rotateX: 0,
//     transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
//   }
// };
//
// DISCUSSION: Why do we define these OUTSIDE the component?
// Answer: They don't change, so React doesn't need to recreate them on every render.

/* --- YOUR ANIMATION VARIANTS GO HERE --- */


// STEP 3: Create the HeroSection component
// export default function HeroSection() { ... }
//
// Inside the component:
// A) Use useScroll() to get { scrollY }
// B) Use useTransform() to create parallax values:
//    - imgScale:   scrollY [0,600] -> [1.35, 0.9]
//    - imgOpacity: scrollY [0,500] -> [1, 0]
//    - imgY:       scrollY [0,600] -> [0, 100]
//
// STEP 4: Build the JSX (inside return)
// Use a React Fragment (<> ... </>) as the wrapper
//
// LEFT COLUMN (className="hero-text-column", id="home"):
//   - Badge component with text: "Premium Coffee Beans — Roasted Fresh Daily"
//   - Animated h1 with three lines: "YOUR PLACE", "FOR COFFEE", "BREWING"
//     Use motion.h1 with textVariants, and motion.span for each word
//     The middle line gets className="muted" for lighter color
//   - Subtitle paragraph (motion.p, className="lead")
//   - Two buttons: "SHOP COFFEE" (accent) and "OUR STORY" (outline)
//     Each button scrolls to a section using:
//     document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
//   - Trust indicators: star rating and free shipping note
//
// RIGHT COLUMN (className="hero-art-container"):
//   - motion.img with the hero beans image
//     Apply parallax: style={{ scale: imgScale, opacity: imgOpacity, y: imgY }}
//   - Floating price badge (circular badge showing "FROM $14.99 per bag")

/* --- YOUR COMPONENT CODE GOES HERE --- */
//textVariants describes animation states for the heading Container
//staggerChildren - dely each child's animation by .12s so the words dont appear all at once
const textVariants = {
    hidden: {}, //starting state
    visible: {transition: {staggerChildren: 0.12}}//when this is visiable, it will stagger the children
};

const wordVariant = {
    hidden: {opacity: 0, y: 60, rotateX: -40}, //hidden is equal to state before animation
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {duration: 0.7, ease: [0.25,0.46,0.45,0.94]}
    }//visiable the final state: fully shown, in position, flat (no tilt)
};

//The main component, "export default" makes it usable in other files
export default function HeroSection(){
    //get a live value of how far the bage has scrolled vertically
    //Hook
    const {scrollY} = useScroll();

    //useTransform maps the scroll postition to a new value
    //as the user scrolls from 0px to 600px, shrik the image from 1.35x down to 0.9x
    const imgScale = useTransform(scrollY, [0,600], [1.35,0.9]);

    //from 0px to 500px of scroll, fade the image from fully visible (1) to invisible (0)
    const imgOpacity = useTransform(scrollY, [0,500], [1,0]);

    //from 0px to 600px of scroll, move the image down by 100px - parallax effect
    const imgY = useTransform(scrollY, [0,600], [0,100]);

    //everything returned here is waht actually shows on the screen (the jsx)
    //NOTE: inside JSX, comments must be {/*  */}

    return(

        // <> .... </> this is a react fragment- it groups elements without an extra wrapper tag
        <>
        {/* Left Side - all the text content */}
        <div id="home" className="hero-text-column">
            {/* Badge (small pill at the top) initial = where it starts, animate = where it ends up. Here: fade in + slide up over 0.5s */}
            <motion.div 
            //inside of a custom element we imported
                initial={{opacity: 0, y: 20}}
                animate = {{opacity: 1, y: 0}}
                transition = {{duration: 0.5, delay: 0.1}}
            >   
                {/* inserting a component inside this component */}
                <Badge variant = "outline" className="mb-5">
                    Premium Coffee Beans - Roasted Fresh Daily
                </Badge>
            </motion.div>

            {/* Main headline - it uses "textvariants' to stagger its words
                perspect: 600px and gives the 3d tilt effect (rotatex) a realistic depth
                variants + initial = 'hidden' + animate='visiable' tie it to the animation
                states defind at the top of the file
                " */}
            <motion.h1
                className="h1-stack"
                style={{margin: 0, perspective: "600px"}}
                variants = {textVariants}
                intial="hidden"
                animate="visible"
            
            >
                {/* EAch <motion.span> is one animated word using "wordVariant".
                    display: "inline-block" is required so y/rotateX transform work
                     */}
                <motion.span variants={wordVariant} style={{display: "inline-block"}}>
                    Your Place
                </motion.span>
                <br />
                <motion.span 
                    variants={wordVariant}
                    className="muted"
                    stye={{display: "inline-block"}}
                >
                    For Coffee
                </motion.span>
                <br />
                <motion.span
                    variants={wordVariant}
                    style ={{display: "inline-block"}}
                >
                    Brewing
                </motion.span>
            </motion.h1>


        </div>
        </>

    ); 
}