import React, { Component } from 'react';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
//import AddRecipe from './AddRecipe';

class EditCategory extends Component {
constructor(props){
super(props);
this.state={
  posts: [],
  data: [],
  error: null,
  isLoaded: false,
  categoryId:'',
  title:'',
  text:'',
  visible:false,
  onOpen:false
 }


}



updateData = () => {

  const newTitle = {
      _id: this.props.categoryId,
    title: this.state.title,
  };
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/category/update';
  var option = {
    method: "PUT",
    body: JSON.stringify(newTitle),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
};

  fetch(qUrl, option).then(data =>{
          console.log("Successful" + data);
          //var a = this.props.categoryId;
          //var b = this.state.title;
          this.props.newList();
          //this.props.addList(newPost)
        })
.then(this.setState({title:''}) );



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
    <Grid.Row width={3}>
    <Input onChange={this.onChangeInput} name='title' placeholder={this.props.title} value={this.state.title}/>
    <Button positive onClick={this.updateData} >
      <Icon name='plus' />Edit Name of Category</Button>
      </Grid.Row>
      </Grid>


  );

}
}


export default EditCategory;
