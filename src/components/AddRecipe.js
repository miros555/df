import React, { Component } from 'react';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';

class AddRecipe extends Component {
constructor(props){
super(props);
this.state={
  data:[],
  error: null,
  isLoaded: false,
  categoryId:this.props.categoryId,
  title:'',
  text:'',
  visible:false
 }

 this.onChangeInput=this.onChangeInput.bind(this);
 this.sendRecipe=this.sendRecipe.bind(this);
 //this.reload=this.reload.bind(this);
}

/*
componentDidMount(){
    //this.props.dispatch(fetchList());
  fetch('https://test-task-server.herokuapp.com/api/v1/recipe/byCategory/'+this.props.categoryId)
              .then((res) => { return res.json() })
              .then((data) => {
                  console.log(data);
                  this.setState({ data: data });
                  });
  }
*/

sendRecipe () {

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
    })


  }


  onChangeInput(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
    }

  toggle=()=>{
    this.setState({visible:!this.state.visible})
  }

  reload = () => {
     fetch('https://test-task-server.herokuapp.com/api/v1/recipe/byCategory/'+this.props.categoryId)
                .then((res) => { return res.json() })
                .then((data) => {
                    console.log(data);
                    this.setState({ data: data });
                    });
    }


render(){

//var s = new Date().getTime() / 1000;

this.reload();


  return (

  <div  style={{marginTop:-50,marginLeft:550}}>
  {this.state.categoryId}
  <Input onChange={this.onChangeInput} name='title' placeholder='Title' value={this.state.title}/>
  <textarea onChange={this.onChangeInput} name='text' placeholder='Text of your Recipe' value={this.state.text} />
  <Button onClick={this.sendRecipe} >Add</Button>

  { this.state.data.map((el,i)=>{return <li key={i}>{el.title}</li> }) }
  </div>

  );

}
}


export default AddRecipe;
