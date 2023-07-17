import { ReactComponentElement, cloneElement } from "react";

type RenderComponentsProps = {
  items: object[];
  children: ReactComponentElement<any>;
};

const RenderComponents = ({ items, children }: RenderComponentsProps): JSX.Element => {
  const renderComponents = items?.map((item: any) => {
    return cloneElement(children, { item, key: item.id });
  });

  return <>{renderComponents}</>;
};

export default RenderComponents;
