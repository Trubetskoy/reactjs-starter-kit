// @ts-ignore
import React from "react";
import "./SingleStarship.css";
import { IPropsSingleStarship } from "./SingleStarshipInterfaces";

export const SingleStarship: React.FC<IPropsSingleStarship> = props => {
  return (
    <div className={"SingleStarship"}>
      Starship Name: {props.element.name}
    </div>
  );
};