import Highlights from "./components/Highlights"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <h1 className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
    </h1>
  )
}

export default App
