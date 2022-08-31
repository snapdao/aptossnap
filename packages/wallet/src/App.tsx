import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { routerHistory, Routes } from "./router";

function App(): JSX.Element {
  return (
    <HistoryRouter history={routerHistory}>
      <Routes />
    </HistoryRouter>
  );
}

export default App;
