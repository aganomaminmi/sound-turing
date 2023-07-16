import p5 from "p5";
import { useRef, useEffect } from "react";
import { sketch } from "./sketch";

export const TuringPattern = () => {
  const target = useRef<HTMLDivElement>(null)
  const isFirst = useRef<boolean>(true)

  useEffect(() => {
    if (!target.current || target.current?.hasChildNodes()) { return }
    if (isFirst.current) {
      isFirst.current = false
    } else {
      return
    }
    new p5(sketch, target.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="root" ref={target} />;
};
