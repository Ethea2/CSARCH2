import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [input, setInput] = useState("");
  const [exponent, setExponent] = useState("");
  const [base, setBase] = useState("10");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      if (input === "" || exponent === "") {
        setError("Input and exponent cannot be empty.");
      }

      if (base === "2") {
        if (!/^[01]+$/.test(input)) {
          setError(
            "Invalid input. Input should only contain 0s and 1s for base 2.",
          );
        }
      } else if (base === "10") {
        const decimal = parseFloat(input);
        if (isNaN(decimal)) {
          setError(
            "Invalid input. Input should be a valid decimal for base 10.",
          );
        }
      }

      const parsedExponent = parseInt(exponent, 10);
      if (isNaN(parsedExponent)) {
        setError("Invalid exponent. Exponent should be a valid integer.");
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <main className="w-full h-screen flex flex-col justify-center items-center bg-black text-white">
        <div className="w-1/2 h-1/2 flex flex-col  items-center border-2">
          <div className="w-full h-[50%] flex justify-center items-center gap-2">
            binary-32 input:
            <input
              type="text"
              className="w-1/3 border-2 border-teal-300 bg-black rounded-lg p-2"
              onChange={(e) => setInput(e.target.value)}
            />
            x
            <select
              defaultValue={"10"}
              className="w-[10%] border-2 border-teal-300 bg-black rounded-lg p-2"
              onChange={(e) => setBase(e.target.value)}
            >
              <option value={"10"}>10</option>
              <option value={"2"}>2</option>
            </select>
            ^
            <input
              type="text"
              className="w-[10%] border-2 bg-black rounded-lg border-teal-300 p-2"
              onChange={(e) => setExponent(e.target.value)}
            />
            <button
              className="bg-black text-teal-300 border-2 border-teal-300 p-2 rounded-lg transition ease-in duration-300 hover:scale-110"
              onClick={() => convert()}
            >
              Convert!
            </button>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            output:
            <textarea className="w-full h-full resize-none bg-black text-teal-300" />
          </div>
        </div>
        {error === "" ? "" : <p className="text-red-300 font-bold">{error}</p>}
      </main>
    </>
  );
}

export default App;
