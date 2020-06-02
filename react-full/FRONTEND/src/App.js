import React from "react";
import { Route, Switch, Link } from "react-router-dom"

// UI Screens we will define later
import MoviePage from "./MoviePage.js" //New
import MovieList from "./MovieList.js" //New

import "./App.css"

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={MovieList} />
                
                {// colon before slug means it is a dynamic value
                // that makes slug parameter anything
                // like: /movie/the-lighthouse-2019   or /movie/anything
                // as long as slug matches with database.
                }
                <Route exact path="/movie/:slug" component={MoviePage} />
            </Switch>
        </div>
    )
}
export default App