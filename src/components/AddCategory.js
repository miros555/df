import React, { Component } from 'react';
import '../App.css';
import {Input, List, Grid, Button, Icon } from 'semantic-ui-react';
import {FormErrors} from './FormErrors';
import { Col, Form, FormGroup, FormControl,
   Clearfix, Tab, Row, Nav, NavItem } from 'react-bootstrap';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
//import AddRecipe from './AddRecipe';

class AddCategory extends Component {
constructor(){
super();
this.state={
  posts: [],
  data: [],
  error: null,
  isLoaded: false,
  categoryId:'',
  title:'',
  text:'',
  visible:false,
  onOpen:false,

  formErrors: {title: ''},
  formValid: true,
  titleValid: false
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


validateField (fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let titleValid = this.state.titleValid;
switch(fieldName) {
    case 'title':
      titleValid = value.length >= 3;
      fieldValidationErrors.title = titleValid ? '': ' is too short';

      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  titlValid: titleValid
                }, this.validateForm);
}
validateForm() {
  this.setState({formValid: this.state.titleValid});
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
.then(this.setState({
  title:'',
  formErrors: {title: ''},
  formValid: false
}));
  }


onChangeInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
    }

toggle = () => {
    this.setState({visible:!this.state.visible})
  }



render(){


  return (


    <Grid>
    <Grid.Row width={3}>
<div style={{color:'red',marginLeft:20}} className='panel panel-default'>
      <FormErrors formErrors={this.state.formErrors} />
        </div><br/>

    <Input onChange={this.onChangeInput} name='title' placeholder='Title' value={this.state.title}/>
    <Button positive onClick={this.sendData} disabled={this.state.formValid}>
      <Icon name='plus' />Add</Button>
      </Grid.Row>
      </Grid>


  );

}
}


export default AddCategory;
