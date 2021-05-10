import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import CocktailHome from './components/Cocktails/CocktailHome';
import CocktailDetail from './components/Cocktails/CocktailDetail';
import CocktailSearch from './components/Cocktails/CocktailSearch';
import IngredientDetail from './components/Ingredients/IngredientDetail';

import Drinks from './components/Drinks/Drinks';
import Drink from './components/Drinks/Drink';

import { Route, Switch } from 'react-router-dom';
import React from 'react';

import UserProfile from './components/Users/UserProfile';
import UserFavoriteList from './components/Users/UserFavoriteList';
import UserPost from './components/Users/UserPost';
import PostNew from './components/Posts/PostNew';
import Post from './components/Posts/Post';
import PostEdit from './components/Posts/PostEdit';
export default function MyRoutes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" exact component={CocktailHome} />
        <Route exact path="/drinks" component={Drinks} />
        <Route path="/drinks/category/:category" component={Drink} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cocktails/:id" component={CocktailDetail} />
        <Route path="/ingredients/:name" component={IngredientDetail} />
        <Route path="/search" component={CocktailSearch} />
        <Route exact path="/user" component={UserProfile} />
        <Route path="/user/favorite" component={UserFavoriteList} />
        <Route exact path="/user/posts" component={UserPost} />
        <Route exact path="/user/posts/new" component={PostNew} />
        <Route exact path="/user/posts/:postId" component={Post} />
        <Route exact path="/user/posts/:postId/edit" component={PostEdit} />
      </Switch>
    </div>
  );
}
