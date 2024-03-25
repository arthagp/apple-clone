import Highlights from "./components/Highlights"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Model from "./components/Model"
import Features from "./components/Features"

const App = () => {
  return (
    <h1 className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
    </h1>
  )
}

export default App
