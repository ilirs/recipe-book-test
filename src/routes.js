import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeAdd from './RecipeAdd';
import RecipeDetail from './RecipeDetail';


const AppRouter = () => (

    <Router>
        <Route exact path="/" component={RecipeAdd} />
        <Route exact path="/recipe-list" component={RecipeList} />
        <Route path="/recipe-add" component={RecipeAdd} />
        <Route path="/recipe-details" component={RecipeDetail} />
    </Router>

);


export default AppRouter;