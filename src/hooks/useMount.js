import { useEffect, useState } from "react";

/**
|--------------------------------------------------
| Mount detector
|
| @returns mount state
|--------------------------------------------------
*/

const useMount = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return mounted;
};

export default useMount;
