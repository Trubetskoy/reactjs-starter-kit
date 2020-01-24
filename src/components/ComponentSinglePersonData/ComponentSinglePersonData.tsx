// @ts-ignore
import React, { useState } from "react";
import "./ComponentSinglePersonData.css";
import { IPropsSinglePerson } from "./ComponentSinglePersonDataInterfaces";

export const ComponentSinglePersonData: React.FC<IPropsSinglePerson> = props => {
  const [personPlanet, setPersonPlanet] = useState({name: null});
  console.log(111, props);

  return (
    <div>
      <div>
        {props.element.name && <p>Name: {props.element.name}</p>}
        {props.element.height && <p>Height: {props.element.height}</p>}
        {props.element.homeworld && (
          <button onClick={() => {props.getOnePersonHomeworld(props.element.homeworld)}}>
            Homeworld
          </button>
        )}
        {props?.onePersonHomeworld && <p>{props?.onePersonHomeworld}</p>}
      </div>
    </div>
  );
};