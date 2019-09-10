import React, { Component } from 'react';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class Recipe extends Component {
  constructor(props){
  super(props);
  this.state={
    data: {},
    categoryId:'',
    recipeId:'',
    title:'',
    text:''
   }

  }

  fetchList_2 = () => {
     var  value = this.props.recipeId;
      fetch('https://test-task-server.herokuapp.com/api/v1/recipe/item/'+value)
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                this.setState({ data });
                });
          }
  componentDidMount(){
    this.fetchList_2();
  }

  render(){
let recipe = this.state.data;
console.log(recipe);
    return(
<div>
     <span style={{}}>{this.props.categoryName} >> {recipe.title}</span>
      <h2 >{recipe.title}</h2><br/>
      <span style={{width:350}}>{recipe.text}</span>


   </div>
     );
  }
}

export default Recipe;
