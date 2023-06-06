import { useGetBBox } from "../hooks/useGetBBox";
import { useRef } from "react";

const Ellipse = (props: Shape) => {
  const myRef = useRef<SVGGElement>(null);

  const rect = useGetBBox(myRef);

  return (
    <g ref={myRef}>
      <rect
        fill={props.color}
        width={props.width}
        height={props.height}
        transform={`translate(${props.x}, ${props.y}) rotate(${
          props.rotation
        }) translate(${-props.width / 2}, ${-props.height / 2})`}
        cx={props.x}
        cy={props.y}
        rx={props.width / 2}
        ry={props.height / 2}
      ></rect>
      <circle
        data-mono="0.2564313725490196"
        fill="#FFFFFF"
        cx={props.x}
        cy={props.y}
        r="4"
      ></circle>
      <text x={props.x} y={props.y} fill="#FFFFFF">
        <tspan>{props.rotation}°</tspan>
      </text>
      {!!rect && (
        <rect
          fill="none"
          strokeWidth="2"
          strokeOpacity="0.4"
          stroke="#FF0000"
          width={rect.width}
          height={rect.height}
          transform={`translate(${props.x}, ${props.y}) translate(${
            -(rect.width || 0) / 2
          }, ${-(rect.height || 0) / 2})`}
        ></rect>
      )}
    </g>
  );
};

export default Ellipse;
