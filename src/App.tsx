import { TiMediaPause } from "react-icons/ti";
import { LuDices } from "react-icons/lu";
import { useEffect, useState } from "react";

const App = () => {
  const [advice, setAdvice] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.adviceslip.com/advice?cache=${Math.random()}`
      );
      const data = await res.json();
      console.log(data);
      setAdvice(data.slip.advice);
      setId(data.slip.id);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center text-white/70 bg-[#323a49] min-h-screen">
  //       <span className="animate-pulse">Loading...</span>
  //     </div>
  //   );
  // }

  return (
    <main className="bg-[#222732] h-screen w-screen flex items-center justify-center overflow-y-clip">
      <div className="relative bg-[#323a49] h-60 w-96 flex flex-col items-center justify-center px-3 gap-5 rounded-lg pb-3 mx-4 md:mx-0">
        <p className="text-[#52ffaa] uppercase font-semibold tracking-widest font-primary text-sm">
          Advice #{id}
        </p>
        <q className="text-center text-[hsl(193,38%,86%)] font-primary text-lg pb-3">
          {advice}
        </q>

        <div className="relative w-full">
          <hr className="text-white w-full absolute border-1 border-[hsl(217,19%,38%)]" />
          <TiMediaPause className="absolute bg-[#323a49] text-white/60 rounded-full text-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="absolute ml-2 -bottom-5 size-12 bg-[#52ffaa] rounded-full flex items-center justify-center">
          <LuDices
            className={`text-4xl p-1.5 text-white transition duration-500 cursor-pointer ${
              loading ? "animate-spin opacity-50" : "animate-bounce"
            }`}
            onClick={loading ? undefined : fetchAdvice} // Disable when loading
          />
        </div>
      </div>
    </main>
  );
};

export default App;
