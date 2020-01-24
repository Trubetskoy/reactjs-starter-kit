// @ts-ignore
import React, { useState } from "react";
import "./ComponentStarships.css";
import { IPropsStarships } from "./ComponentStarshipsInterfaces";
import API from "../../services/api";
import { IElement } from "../ComponentPerson/ComponentPersonInterfaces";
import ComponsntSingleStarshipContainer from "../ComponentSingleStarship/ComponsntSingleStarshipContainer"

export const ComponentStarships: React.FC<IPropsStarships> = props => {
  const [starships, setStarships] = useState({ results: [] });

  const getSWPeople = async () => {
    console.log(starships);
    let peopleData = await API.get(`https://swapi.co/api/starships/?page=1`);
    await setStarships(peopleData);
  };
  return (
    <>
      <button className="ComponentA" onClick={getSWPeople}>getStarships</button>
      {starships?.results.map((element: IElement, id: number) => {
        return (
          <div>
            <ComponsntSingleStarshipContainer key={id} element={element}/>
            <div>123</div>
          </div>
        );
      })}
    </>

  );
};
