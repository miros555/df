import React, { Component } from 'react';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';

class Category extends Component {
  constructor(props){
  super(props);
  this.state={
    posts: [],
    data: [],
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
      <span style={{width:350}}>{el.title}<br/>{el._id}</span><br/>

          </li>}) }
</div>
    );
  }
}

export default Category;
