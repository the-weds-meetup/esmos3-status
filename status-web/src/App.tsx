import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./screens";

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 24px;
  @media (max-width: 1400px) {
    width: 80%;
  }
  @media (max-width: 720px) {
    width: 90%;
  }
  @media (max-width: 350px) {
    width: 95%;
  }
`;

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};
