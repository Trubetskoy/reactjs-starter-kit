// @ts-ignore
import React, { useState } from "react";
import "./ComponentPersonData.css";
import { IPropsData } from "./ComponentPersonDataInterfaces";
import API from "../../services/api";

export const ComponentPersonData: React.FC<IPropsData> = props => {
  const initialPersonData = {
    height: null,
    mass: null,
    hair_color: null
  };
  const [personData, setPersonData] = useState(initialPersonData);
  const [openData, setOpenData] = useState(false);

  const getSWPersonData = async () => {
    if (!openData){
      let onePersonData = await API.get(`${props.data.url}`);
      await setPersonData(onePersonData);
    }
      setOpenData(!openData)
  };

  return (
    <div className="ComponentA">
      <button className="PersonName" onClick={getSWPersonData}>
        {props.data.name}
      </button>

      {props.data.name && openData &&(
        <div>
          {personData.height && <p>height: {personData.height}</p>}
          {personData.mass && <p>mass: {personData.mass}</p>}
          {personData.hair_color && <p>hair color: {personData.hair_color}</p>}
        </div>
      )}
    </div>
  );
};
