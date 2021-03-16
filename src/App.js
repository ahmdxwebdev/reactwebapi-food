import React, {useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "569d22da";
  const APP_KEY = "60f84f938beaf3e838d597640cbf2f52";
  // const APP_ID = "43b1e4ef";
  // const APP_KEY = "74f96126425fdcd308c980b7adf78c43";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  

  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };


  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};



export default App;
