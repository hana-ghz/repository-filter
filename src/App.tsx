import React from "react";
import "./App.css";
// @local
import RepositoryPage from "./components/repositoryPage";

export const URL = "https://api.github.com/users";

function App() {
  return (
    <div className="App">
      <RepositoryPage />
    </div>
  );
}

export default App;
