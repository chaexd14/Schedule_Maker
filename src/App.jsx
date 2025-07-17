import './App.css'
import Squares from "./components/ui/Squares/Squares"
import { Times } from './data/time'
import { Day } from './data/day'

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
  <section className="relative z-10 h-screen w-full flex flex-col p-10 gap-3 pointer-events-none">
    
    <div className="h-fit w-full flex justify-center">
      <h1 className="custom-font text-6xl text-center font-extrabold text-[#2B2C34] pointer-events-auto">
        My <span className='text-[#6246EA] font-extrabold text-7xl'>Schedule</span>
      </h1>
    </div>

    <div className="flex-1 flex flex-row gap-10 min-h-0">
      {/* Scrollable area */}
      <div className="flex-1 border-4 bg-white/70 border-[#2B2C34] rounded-lg pt-8 px-14 box-border flex flex-col min-h-0 pointer-events-auto gap-2">
        
        <div className="h-fit w-full">
          <ul className="w-full flex justify-between text-center">
            {Day.map((d,i)=>(
              <li className="w-full custom-font text-[26px] font-semibold text-[#2B2C34] border border-red-400" key={i}>{d.day}</li>
            ))}
          </ul>
        </div>

        <div className="flex-1 overflow-auto scrollbar scrollbar-thumb-[#6246EA] scrollbar-track-transparent border-t-4 border-x-4 border-[#2B2C34] rounded-t-md">
          <div className="h-[1300px] bg-white">
            {/* Scrollable content */}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-fit flex flex-col gap-3 border border-blue-400">
        <button className="normal-button pointer-events-auto">Add</button>
        <button className="normal-button pointer-events-auto">Settings</button>
        <button className="normal-button pointer-events-auto">Download</button>
      </div>
    </div>
  </section>
</main>

    </>
  )
}

export default App
