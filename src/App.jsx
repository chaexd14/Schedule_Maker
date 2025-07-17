import './App.css'
import Squares from "./components/ui/Squares/Squares"
import { Times } from './data/time'

function App() {
  return (
    <>
<main className="h-screen w-full bg-[#FFFFFE] relative">
  {/* Hoverable background */}
  <div className="absolute inset-0 h-full w-full z-0">
    <Squares 
      speed={0.2} 
      squareSize={40}
      direction="diagonal"
      borderColor="#D1D1E9"
      hoverFillColor="#D1D1E9"
    />
  </div>

  {/* Main content — allow hover to pass through */}
  <section className="relative z-10 h-screen w-full flex flex-col p-10 gap-4 pointer-events-none">
    
    <div className="h-fit w-full flex justify-center">
      <h1 className="custom-font text-6xl text-center font-semibold text-[#2B2C34] pointer-events-auto">
        Schedule
      </h1>
    </div>

    <div className="flex-1 flex flex-row gap-10 min-h-0">
      {/* Scrollable area */}
      <div className="flex-1 border-4 bg-white border-black rounded-lg pt-8 px-14 box-border flex flex-col min-h-0 pointer-events-auto">
        
        <div className="h-fit w-full border border-red-400">
          <ul className="w-full flex justify-between text-center">
            <li className="w-full border border-red-400">Monday</li>
            <li className="w-full border border-red-400">Tuesday</li>
            <li className="w-full border border-red-400">Wednesday</li>
            <li className="w-full border border-red-400">Thursday</li>
            <li className="w-full border border-red-400">Friday</li>
            <li className="w-full border border-red-400">Saturday</li>
            <li className="w-full border border-red-400">Sunday</li>
          </ul>
        </div>

        <div className="flex-1 overflow-auto border border-blue-400">
          <div className="h-[1300px]">
            {/* Scrollable content */}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-fit flex flex-col gap-3 border border-blue-400 pointer-events-auto">
        <button className="normal-button">Add</button>
        <button className="normal-button">Settings</button>
        <button className="normal-button">Download</button>
      </div>
    </div>
  </section>
</main>

    </>
  )
}

export default App
