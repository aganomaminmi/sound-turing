import p5 from "p5";
import { useRef, useEffect } from "react";
import { sketch } from "./sketch";

export const AudioAPI = () => {
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!target.current || target.current?.hasChildNodes()) { return }
    new p5(sketch, target.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={target} />;
};
