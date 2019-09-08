import React, { Component } from 'react';
import '../App.css';
import {Input, TextArea, List, Grid, Image, Button, Icon } from 'semantic-ui-react';

class AddRecipe extends Component {
constructor(props){
super(props);
this.state={
  data:[],
  error: null,
  isLoaded: false,
  categoryId:this.props.categoryId,
  recipeId:'',
  title:'',
  text:'',
  openConfirm:false,
  visible:false
}

}

fetchListRecipe = () => {
fetch('https://test-task-server.herokuapp.com/api/v1/recipe/byCategory/'+this.props.categoryId)
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                this.setState({ data: data });
                });

}

addListRecipe = (value) => {
  this.setState({data: [...this.state.data, value]});
  this.fetchListRecipe ();
}

componentDidMount(){
  this.fetchListRecipe ();
  }


sendRecipe = () => {

  const listPost = {
    title: this.state.title,
    text: this.state.text,
    categoryId: this.props.categoryId
  };
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/create';
  var option = {
    method: "POST",
    body: JSON.stringify(listPost),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
};
  fetch(qUrl, option).then(data =>{
          console.log("Successful" + data);
          this.setState({
            categoryId:'',
            title:'',
            text:''
        });
    }).then(
           this.fetchListRecipe(),
           this.addListRecipe(listPost)
    //this.setState({onOpenEdit:false})
  );

  }

deleteRecipe = (value) => {
  //var recipeId = this.state.recipeId;
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/'+value;
  var option = {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
};
  fetch(qUrl, option).then(data =>{
          console.log("Successful" + data);
    });

    this.setState({data: this.state.data.filter(el => el._id !==value)});
    //this.fetchListRecipe()

}

  onChangeInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
    }

  toggle = () => {
    this.setState({visible:!this.state.visible})
  }


render(){



  return (

  <Grid style={{marginTop:-50,marginLeft:550}}>
  <Grid.Row>
  <Grid.Column width={5}>
  {this.state.recipeId}
  <Input onChange={this.onChangeInput} name='title' placeholder='Title' value={this.state.title}/>
  <TextArea onChange={this.onChangeInput} name='text' placeholder='Text of your Recipe' value={this.state.text} />
  <Button onClick={this.sendRecipe} >Add</Button><br/>

List Recipes of this Category:<br/>
  { this.state.data.map((el,i)=>{return <li key={i}>{el.title}
  <Button style={{marginLeft:150}} onClick={()=>{this.setState({recipeId:el._id});
          this.deleteRecipe(el._id) }} >Delete</Button>{' '}

{/*{this.state.openConfirm?<Button onClick={this.deleteRecipe}>Yes</Button>:''}*/}
  </li> }) }

  </Grid.Column>
  </Grid.Row>
  </Grid>


  );

}
}


export default AddRecipe;
