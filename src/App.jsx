import Highlights from "./components/Highlights"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Model from "./components/Model"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"

const App = () => {
  return (
    <h1 className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />
    </h1>
  )
}

export default App
