import React, { Component } from 'react';
import '../App.css';
import {Input, List, Grid, Button, Icon } from 'semantic-ui-react';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
//import AddRecipe from './AddRecipe';

class AddCategory extends Component {
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

componentDidMount(){
  //this.props.dispatch(fetchList());
  fetch('https://test-task-server.herokuapp.com/api/v1/category/all')
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                this.setState({ data });
                });
}




sendData = () => {

  const newPost = {
    title: this.state.title,
  };
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/category/create';
  var option = {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
};

  fetch(qUrl, option).then(data =>{
          console.log("Successful" + data);
          this.props.addList(newPost) })
.then(this.setState({title:''}));
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


    <Grid>
    <Grid.Row width={3}>
    <Input onChange={this.onChangeInput} name='title' placeholder='Title' value={this.state.title}/>
    <Button positive onClick={this.sendData} >
      <Icon name='plus' />Add</Button>
      </Grid.Row>
      </Grid>


  );

}
}


export default AddCategory;
