import { useEffect, useState } from "react";

const useDebounce = <T,>(input: T, time: number): T => {
  const [output, setOutput] = useState<T>(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setOutput(input);
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, [input, time]);

  return output;
};

export default useDebounce;