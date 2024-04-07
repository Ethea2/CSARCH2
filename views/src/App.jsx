import { useEffect, useState } from "react";
import ConvertButton from "./components/ConvertButton";
import { convertBase10, convertBase2 } from "./helpers/converter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [input, setInput] = useState("");
  const [exponent, setExponent] = useState("");
  const [base, setBase] = useState("10");
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState();

  const convert = () => {
    if (exponent === "" || input === "")
      return setError("Please fill the whole form.");
    if (parseFloat(input) === NaN || parseFloat(exponent) === NaN)
      return setError("Please enter integers or decimal only.");

    try {
      if (base === "10") {
        setAnswer(convertBase10(input, exponent));
        return;
      }
      setAnswer(convertBase2(input, exponent));
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (error !== "") {
      toast(error, {
        type: "error",
      });
      setError("");
    }
  }, [error]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
            <ConvertButton convert={convert}>Convert!</ConvertButton>
          </div>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="text-teal-300">
              <p>
                Sign bit:{" "}
                <span className="font-bold">
                  {answer && answer.binAnswer.signBit}
                </span>
              </p>
              <p>
                Exponent:{" "}
                <span className="font-bold">
                  {answer && answer.binAnswer.exponent}
                </span>
              </p>
              <p>
                Mantissa:{" "}
                <span className="font-bold">
                  {answer && answer.binAnswer.mantissa}
                </span>
              </p>
              <p>
                Hex: <span className="font-bold">{answer && answer.hex}</span>
              </p>
              <p>
                Full binary:{" "}
                <span className="font-bold">
                  {answer &&
                    answer.binAnswer.signBit +
                      answer.binAnswer.exponent +
                      answer.binAnswer.mantissa}
                </span>
              </p>
            </div>
          </div>
        </div>
        {error === "" ? "" : <p className="text-red-300 font-bold">{error}</p>}
      </main>
    </>
  );
}

export default App;
