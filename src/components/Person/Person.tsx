import React, { useEffect, useState } from "react";
import API from "../../services/api";
import PersonDataContainer from "../PersonData/PersonDataContainer";
import SinglePersonDataContainer from "../SinglePersonData/SinglePersonDataContainer";
import { PersonContainer } from "./PersonElements";
import { Spinner } from "../Spinner/Spinner";

interface IProps {
  value: number;
  spinnerIsLoading: any;
  isLoading: boolean;
}
interface IElement {
  name: string;
  url: string;
}

export const Person: React.FC<IProps> = props => {
  const [people, setPeople] = useState({ results: [] });
  const [swPeoplePage, setSwPeoplePage] = useState(1);
  const [onePersonData, setOnePersonData] = useState({ results: [] });
  const [onePersonHomeworld, setOnePersonHomeworld] = useState({ name: "" });

  const getSWPeople = async () => {
    setSwPeoplePage(1);
    let peopleData = await API.getPeople("1");
    await setPeople(peopleData);
    await props.spinnerIsLoading();
  };

  const getNextPageSWPeople = async () => {
    if (swPeoplePage < 9) {
      props.spinnerIsLoading();
      setSwPeoplePage(swPeoplePage + 1);
      let peopleData = await API.getPeople(`${swPeoplePage + 1}`);
      await setPeople(peopleData);
      await props.spinnerIsLoading();
    }
  };

  const getPrevPageSWPeople = async () => {
    if (swPeoplePage > 1) {
      props.spinnerIsLoading();
      setSwPeoplePage(swPeoplePage - 1);
      let peopleData = await API.getPeople(`${swPeoplePage - 1}`);
      await setPeople(peopleData);
      await props.spinnerIsLoading()
    }
  };
  const getOnePersonData = async (url: string) => {
    let onePersonData = await API.get(url);
    await setOnePersonData(onePersonData);
  };

  const getOnePersonHomeworld = async (url: string) => {

    let onePersonHomeworld = await API.get(url);
    await setOnePersonHomeworld(onePersonHomeworld);
  };
  useEffect(() => {
    props.spinnerIsLoading();
    getSWPeople();
  }, []);

  return (
      props.isLoading ? <Spinner />:
    <div className="ComponentA">
      <div className="ComponentA-header">
        <h2>Welcome to SWapi People Component</h2>
      </div>
      <PersonContainer>
        <button onClick={getPrevPageSWPeople}> {`<<<`} </button>
        <button onClick={getNextPageSWPeople}> {`>>>`} </button>
      </PersonContainer>
      <PersonContainer>
        <div>
          {people?.results.map((element: IElement, id: number) => {
            return (
              <PersonDataContainer
                id={id}
                key={element.url}
                element={element}
                swPeoplePage={swPeoplePage}
                getOnePersonData={getOnePersonData}
              />
            );
          })}
        </div>
        <SinglePersonDataContainer
          element={onePersonData}
          getOnePersonHomeworld={getOnePersonHomeworld}
          onePersonHomeworld={onePersonHomeworld.name}
        />
      </PersonContainer>
    </div>
  );
};
