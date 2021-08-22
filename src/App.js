import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ViewFavorites from "./view-favorites.jsx";
import Dogs from "./dogs.jsx";

function App() {
	return (
	  <div className="wrapper">
      <BrowserRouter>
        <Switch>
					<Route path="/favorites">
						<ViewFavorites />
					</Route>
          <Route path="/">
						<Dogs />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
