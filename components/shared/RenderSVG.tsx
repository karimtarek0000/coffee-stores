import { CSSProperties } from "react";

type RenderSVGTypes = {
  name: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
};

function RenderSVG({ name, size = "2.5rem", className, style }: RenderSVGTypes): JSX.Element {
  return (
    <svg className={className} width={size} height={size} style={style}>
      <use xlinkHref={`/icons/sprite.svg#${name}`}>
        <title>{name}</title>
      </use>
    </svg>
  );
}

export default RenderSVG;
