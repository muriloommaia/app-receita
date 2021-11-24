import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreFoodsOrDrinks from './pages/ExploreFoodsOrDrinks';
import ExploreByIngredients from './pages/ExploreByIngredients';
import Profile from './pages/Profile';
import Main from './pages/Main';
import RecipeDetails from './pages/RecipeDetails';
import FavoriteRecipes from './pages/FavoriteRecipes';
import ExploreByArea from './pages/ExploreByArea';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="h-full bg-tertiary">
      <BrowserRouter basename="/app-receita">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Main } />
          <Route exact path="/comidas/:id" component={ RecipeDetails } />
          <Route exact path="/bebidas/:id" component={ RecipeDetails } />
          <Route exact path="/bebidas" component={ Main } />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/receitas-feitas" component={ FavoriteRecipes } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreByIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreByIngredients }
          />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/comidas/:id/in-progress" component={ RecipeDetails } />
          <Route exact path="/bebidas/:id/in-progress" component={ RecipeDetails } />
          <Route exact path="/explorar/bebidas" component={ ExploreFoodsOrDrinks } />
          <Route exact path="/explorar/comidas" component={ ExploreFoodsOrDrinks } />
          <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
          <Route path component={ NotFound } />
        </Switch>
      </BrowserRouter>
      <div className="h-14 bg-tertiary" />
    </div>
  );
}

export default App;
