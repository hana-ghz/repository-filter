import React from "react";
import "./App.css";
// @local
import RepositoryPage from "./components/repositoryPage";
import { StylesProvider } from "@material-ui/core/styles";

export const URL = "https://api.github.com/users";

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <RepositoryPage />
      </div>
    </StylesProvider>
  );
}

export default App;
