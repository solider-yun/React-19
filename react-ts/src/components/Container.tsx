import React, { JSX, PropsWithChildren, useState } from "react";
import Meteor from "../components/MeteorSky";
import Ground from "../components/Ground";

const ContainerCSS: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};
const PracticeCSS: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const Container: React.FC<
  PropsWithChildren<{
    isPractice?: boolean;
    trigger: boolean;
    type: number | null;
  }>
> = (params) => {
  const { isPractice, trigger, type, children } = params;
  return (
    <div style={isPractice ? PracticeCSS : ContainerCSS}>
      {children}
      <Meteor trigger={trigger} />
      <Ground trigger={trigger} />
    </div>
  );
};

export default Container;
