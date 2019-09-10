import React, { Component } from 'react';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
import Recipe from './Recipe';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class Category extends Component {
  constructor(props){
  super(props);
  this.state={
    posts: [],
    data: [],
    visible:'',
    categoryId:'',
    title:'',
    text:''
   }

  }

  fetchList_1 = () => {
     var  value = this.props.categoryId;
      fetch('https://test-task-server.herokuapp.com/api/v1/recipe/byCategory/'+value)
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                this.setState({ data });
                });
          }
  componentDidMount(){
    this.fetchList_1();
  }


  render(){
let listOfOneCategory = this.state.data;

    return(

<div>
      {listOfOneCategory.map((el,index)=>{return <li key={index}>
<a style={{cursor:'pointer'}}><div onClick={()=>{
      this.setState({visible:!this.state.visible})} }>

      {el.title} </div> </a><br/>
      <span style={{width:350}}>{el._id}</span>
      <Recipe recipeId={el._id} /> 
{/*
     {this.state.visible ? <Recipe recipeId={el._id} /> : ''}
     <Route path={"/recipe/"+el._id} render={()=><Recipe recipeId={el._id} />} />
     <Recipe recipeId={el._id} />
     href={"/recipe/"+el._id}
*/}
          </li>}) }


   </div>
     );
  }
}

export default Category;
