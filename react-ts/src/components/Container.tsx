import React, { JSX, PropsWithChildren, useState } from "react";
import Meteor from "../components/MeteorSky";
import Ground from "../components/Ground";

const ContainerCSS: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};

const Container: React.FC<PropsWithChildren<{ trigger: boolean }>> = (params) => {
  const { trigger, children } = params;
  return (
    <div style={ContainerCSS}>
      {children}
      <Meteor trigger={trigger} />
      <Ground trigger={trigger} />
    </div>
  );
};

export default Container;
