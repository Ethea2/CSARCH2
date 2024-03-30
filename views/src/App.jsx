import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [normalized, setNormalized] = useState("");
  const [exponent, setExponent] = useState("");
  const [base, setBase] = useState(10);

  return (
    <>
      <main className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="w-1/2 h-1/2 flex flex-col  items-center border-2">
          <div className="w-full h-[50%] flex justify-center items-center gap-2">
            binary-32 input:
            <input
              type="text"
              className="w-1/3 border-2 border-teal-300 bg-black rounded-lg p-2"
              onChange={(e) => setNormalized(e.target.value)}
            />
            x
            <select
              defaultValue={10}
              className="w-[10%] border-2 border-teal-300 bg-black rounded-lg p-2"
              onChange={(e) => setBase(e.target.value)}
            >
              <option value={10}>10</option>
              <option value={2}>2</option>
            </select>
            ^
            <input
              type="text"
              className="w-[10%] border-2 bg-black rounded-lg border-teal-300 p-2"
              onChange={(e) => setExponent(e.target.value)}
            />
            <button
              className="bg-black text-teal-300 border-2 border-teal-300 p-2 rounded-lg transition ease-in duration-300 hover:scale-110"
              onClick={() => {
                console.log(`normalized: ${normalized}`);
                console.log(`base: ${base}`);
                console.log(`exponent: ${exponent}`);
              }}
            >
              Convert!
            </button>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            output:
            <textarea className="w-full h-full resize-none bg-black text-teal-300" />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
