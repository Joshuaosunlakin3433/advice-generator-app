import { TiMediaPause } from "react-icons/ti";
import { LuDices } from "react-icons/lu";
import { useState} from "react";

const App = () => {
  const [advice, setAdvice] = useState<string>("");
  const [id, setId] = useState<number>(0);

  const fetchAdvice = async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      console.log(data);
      setAdvice(data.slip.advice);
      setId(data.slip.id);
    } catch (error) {
      console.error("Error fetching advice:", error);
    }
  };
  fetchAdvice();

  return (
    <main className="bg-[#222732] h-screen w-screen flex items-center justify-center">
      <div className="relative bg-[#323a49] h-60 w-96 flex flex-col items-center justify-center px-3 gap-5 rounded-lg">
        <p className="text-[#52ffaa]">#Advice #{id}</p>
        <blockquote className="text-center text-white">{advice}</blockquote>

        <div className="relative w-full">
          <hr className="text-white w-full absolute" />
          <TiMediaPause className="absolute bg-[#323a49] rounded-full text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute -bottom-5 size-12 bg-[#52ffaa] rounded-full flex items-center justify-center">
          <LuDices className="text-4xl p-1.5 text-white animate-bounce transition duration-500 cursor-pointer" onClick={()=> fetchAdvice()}/>
        </div>
      </div>
    </main>
  );
};

export default App;
