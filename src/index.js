import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

let recipes = [
    {name: "Spaghetti", plan: ['Wash', 'Cook', 'Eat']},
    {name: "Steak", plan: ['Wash', 'Cook', 'Eat']},
    {name: "Hamburger", plan: ['Wash', 'Cook', 'Eat']}
];

if(localStorage.getItem("recipes") !== null) {
    recipes = JSON.parse(localStorage["recipes"]);
} else {
    localStorage.setItem('recipes', JSON.stringify(recipes));
} 

ReactDOM.render(<App recipes={recipes}/>, document.getElementById('root'));
registerServiceWorker();

