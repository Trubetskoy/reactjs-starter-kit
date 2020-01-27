import React from "react";
import { Route, Switch } from "react-router";
import { HashRouter, Link, RouteComponentProps } from "react-router-dom";
import ComponentAContainer from "./ComponentsA/ComponentAContainer";
import ComponentBContainer from "./ComponentsB/ComponentBContainer";
import PersonContainer from "./Person/PersonContainer";
import PlanetContainer from "./Planets/PlanetContainer";
import StarshipsContainer from "./Starships/StarshipsContainer";
import logo from "../assets/images/logo.svg";
import { AppElement, AppHeaderElement, AppIntro, AppLogo } from "./AppElements"

interface IProps {
  value: number;
  changeStateProp: (first: string, second: number, third: string) => void;
  myCustomPropsFunc: any;
}

const NotFound = () => {
  return (
    <Route
        // @ts-ignore
      render={({ staticContext }: RouteComponentProps<string, any, string>) => {
        if (staticContext) {
          staticContext.status = 404;
        }
        return (
          <div>
            <h1>Sorry, can’t find that.</h1>
          </div>
        );
      }}
    />
  );
};

export const App: React.FC<IProps> = props => {
  return (
    <HashRouter>
      <AppElement>
        <AppHeaderElement>
          <AppLogo src={logo} alt="logo" />
          <h2>Welcome to React</h2>
        </AppHeaderElement>

        <div>
          <ul>
            <li>
              <Link to="/">AppContainer(Home)</Link>
            </li>
            <li>
              <Link to="/componentA">ComponentAContainer</Link>
            </li>
            <li>
              <Link to="/componentB">ComponentBContainer</Link>
            </li>
            <li>
              <Link to="/person">Person</Link>
            </li>
            <li>
              <Link to="/planet">Planet</Link>
            </li>
            <li>
              <Link to="/starships">Starships</Link>
            </li>
          </ul>
        </div>

        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div>
                    <h2>Welcome to App</h2>
                    <AppIntro>
                      <code>src/components/App.js</code>
                    </AppIntro>
                    <p>Value: {props.value}</p>
                    <p>
                      <button
                        onClick={() =>
                          props.changeStateProp("value", 0, "main")
                        }
                      >
                        Reset to "0"
                      </button>
                    </p>
                  </div>
                );
              }}
            />
            <Route path="/componentA" component={ComponentAContainer} />
            <Route path="/person" component={PersonContainer} />
            <Route path="/planet" component={PlanetContainer} />
            <Route path="/starships" component={StarshipsContainer} />
            <Route
              path="/componentB"
              render={obj => {
                return (
                  <ComponentBContainer
                    {...obj}
                    description="Value (custom description)"
                  />
                );
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </AppElement>
    </HashRouter>
  );
};

App.defaultProps = {
  value: 0,
  changeStateProp: () => {},
  myCustomPropsFunc: () => {}
};
