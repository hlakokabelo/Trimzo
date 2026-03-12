import * as React from "react";
import Header from "./components/Header";
import Container from "./components/Container";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
      <Header />
      <Container />
    </>
  );
};

export default App;
