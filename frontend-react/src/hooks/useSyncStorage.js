import { useEffect } from "react";

export default function useSyncStorage(callback) {
  useEffect(() => {
    const sync = () => {
      callback();
    };

    window.addEventListener("storage", sync);

    return () => window.removeEventListener("storage", sync);
  }, [callback]);
}