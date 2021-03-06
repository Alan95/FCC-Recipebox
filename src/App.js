import React, { Component } from 'react';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import './App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: this.props.recipes, 
      showAddModal: false,
      showEditModal: false,
      newRecipeName: '',
      newRecipeIngredients: [],
      currentRecipeName: '',
      currentRecipePlan: '',
      recipeId: ''
    };
    this.toggleRecipeModal = this.toggleRecipeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.toggleEditRecipeModal = this.toggleEditRecipeModal.bind(this);
    this.deleteReceipe = this.deleteReceipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
  }

  toggleRecipeModal() {
    this.setState({
      showAddModal: !this.state.showAddModal
    });
  }

  handleChange(event){
    if(event.target.name === 'recipeName'){
        this.setState({newRecipeName: event.target.value})
    } else {
        this.setState({newRecipeIngredients: event.target.value})
    }
    
  }

  toggleEditRecipeModal(recipe){
   this.setState({
      showEditModal: !this.state.showEditModal,
   });
   if(recipe !== undefined){
    this.setState({
      newRecipeName: recipe.name,
      newRecipeIngredients: recipe.plan,
      recipeId: this.state.recipes.indexOf(recipe)
    });
   } 
  }

  addRecipe(event) {
    event.preventDefault();
    let recipe = this.state.newRecipeName;
    let ingredients = this.state.newRecipeIngredients;
    ingredients = ingredients.split(",");
    let newRecipe = {name: recipe, plan: ingredients};

    this.setState({
      recipes: [...this.state.recipes, newRecipe],
      newRecipeName: '',
      newRecipeIngredients:''
    }, function() {
      localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    });
    
    this.toggleRecipeModal();
  }

  editRecipe(event) {
    event.preventDefault();
    const newState = this.state.recipes;
    let recipe = this.state.newRecipeName;
    let ingredients = this.state.newRecipeIngredients;
    if(!Array.isArray(ingredients)) {
     ingredients = ingredients.split(',');
    }
    let editedRecipe = {name: recipe, plan: ingredients};
    newState.splice(this.state.recipeId, 1, editedRecipe);
    this.setState({
      recipe: newState
    });
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    this.toggleEditRecipeModal();
  }

  deleteReceipe(recipe) {
    const newState = this.state.recipes;
    if(this.state.recipes.indexOf(recipe) !== -1){
      newState.splice(newState.indexOf(recipe), 1);
      this.setState({
      recipe: newState
    });
    }
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <ListGroup className="col-md-4 col-sm-4 mx-auto">
          {this.state.recipes.map(item => 
          <div id="list-item">
            <ListGroupItem key={item.name}>
              <div className="clearfix">
                <h5 className="float-left">{item.name}</h5>
                <small className="float-right">{item.plan.map(ingredients =>  `-${ingredients} `)}</small>
              </div>
              <hr/>
              <div className="clearfix">
                <button className="btn btn-success float-left btn-sm" onClick={this.toggleEditRecipeModal.bind(null, item)}>Edit</button>
                <button className="btn btn-danger float-right btn-sm" onClick={this.deleteReceipe.bind(null, item)}>Delete</button>
              </div>
            </ListGroupItem>
           </div> 
          )}
        </ListGroup> 
        <br/>
        <div className="col-md-1 col-sm-1 mx-auto">
          <button onClick={this.toggleRecipeModal} className="btn btn-success btn-block">+</button>
        </div>
        <br/>
        <Footer></Footer>
        <Modal isOpen={this.state.showAddModal} toggle={this.toggleRecipeModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleRecipeModal}>Add Recipe</ModalHeader>
          <Form onSubmit={this.addRecipe}>
          <ModalBody>
            <Label for="recipeName">Name:</Label>
            <Input name="recipeName" onChange={this.handleChange} id="recipeName" placeholder="Enter Name"/>
            <Label for="recipes">Ingredients</Label>
            <Input name="ingredients" onChange={this.handleChange} id="ingredients" placeholder="Enter Ingredients" type="textarea"/>
          </ModalBody>
          <ModalFooter>
            <div className="mx-auto">
            <Button color="primary" type="submit">Add</Button>{' '}
            <Button color="danger" onClick={this.toggleRecipeModal}>Cancel</Button>
            </div>
          </ModalFooter>
          </Form>
        </Modal>

        <Modal isOpen={this.state.showEditModal} toggle={this.toggleEditRecipeModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleEditRecipeModal}>Recipe</ModalHeader>
          <Form onSubmit={this.editRecipe}>
          <ModalBody>
            <Label for="recipeName">Name:</Label>
            <Input name="recipeName" value={this.state.newRecipeName} onChange={this.handleChange} id="recipename"/>
            <Label for="ingredients">Ingredients:</Label>
            <Input name="ingredients" value={this.state.newRecipeIngredients} onChange={this.handleChange} type="textarea"/>
          </ModalBody>
          <ModalFooter>
            <div className="mx-auto">
              <Button color="primary" type="submit">Save</Button>{' '}
              <Button color="danger" onClick={this.toggleEditRecipeModal}>Close</Button>
            </div>
          </ModalFooter>
          </Form>
        </Modal>
        
      </div>
    );
  }
}

export default App;
