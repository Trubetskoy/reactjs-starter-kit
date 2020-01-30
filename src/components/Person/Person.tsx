import React, { useEffect, useState } from "react";
import API from "../../services/api";
import PersonDataContainer from "../PersonData/PersonDataContainer";
import SinglePersonDataContainer from "../SinglePersonData/SinglePersonDataContainer";
import { PersonContainer, PersonContainerButton } from "./PersonElements";

interface IProps {
  value: number;
  spinnerStartLoading: () => {};
  spinnerEndLoading: () => {};
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
    await props.spinnerEndLoading();
  };

  const getNextPageSWPeople = async () => {
    if (swPeoplePage < 9) {
      props.spinnerStartLoading();
      setSwPeoplePage(swPeoplePage + 1);
      let peopleData = await API.getPeople(`${swPeoplePage + 1}`);
      await setPeople(peopleData);
      await props.spinnerEndLoading();
    }
  };

  const getPrevPageSWPeople = async () => {
    if (swPeoplePage > 1) {
      props.spinnerStartLoading();
      setSwPeoplePage(swPeoplePage - 1);
      let peopleData = await API.getPeople(`${swPeoplePage - 1}`);
      await setPeople(peopleData);
      await props.spinnerEndLoading();
    }
  };
  const getOnePersonData = async (url: string) => {
    props.spinnerStartLoading();
    setOnePersonHomeworld({ name: "" })
    let onePersonData = await API.get(url);
    await setOnePersonData(onePersonData);
    await props.spinnerEndLoading();
  };

  const getOnePersonHomeworld = async (url: string) => {
    props.spinnerStartLoading();;
    let onePersonHomeworld = await API.get(url);
    await setOnePersonHomeworld(onePersonHomeworld);
    await props.spinnerEndLoading();
  };

  useEffect(() => {
    props.spinnerStartLoading();
    getSWPeople();
  }, []); // eslint-disable-line

  return (
    <div className="ComponentA">
      <div className="ComponentA-header">
        <h2>Welcome to SWapi Person Component</h2>
      </div>
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
      <PersonContainerButton>
        <button onClick={getPrevPageSWPeople}> {`<<<`} </button>
        <button onClick={getNextPageSWPeople}> {`>>>`} </button>
      </PersonContainerButton>
    </div>
  );
};
