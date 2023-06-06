import React from "react";

export const useGetBBox = (ref: React.RefObject<SVGGElement>) => {
  const [rect, setRect] = React.useState<DOMRect>();

  React.useEffect(() => {
    const rect = ref.current?.getBBox();
    if (rect) setRect(rect);
  }, [ref]);

  return rect;
};
