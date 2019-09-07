import React, { Component } from 'react';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
import AddRecipe from './AddRecipe';

class App extends Component {
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

 this.onChangeInput=this.onChangeInput.bind(this);
 this.sendData=this.sendData.bind(this);
 //this.addRecipe=this.addRecipe.bind(this);
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




sendData () {

  const listPost = {
    title: this.state.title,
    text: this.state.text,
    categoryId: this.state.categoryId
  };
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/create';
  var option = {
    //mode: 'no-cors',
    method: "POST",
    body: JSON.stringify(listPost),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
};
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  fetch(qUrl, option).then(data =>{
          console.log("Successful" + data);

          this.setState({
            categoryId:'',
            title:'',
            text:''
        });
    })


  }

/*
addRecipe(){
  this.setState({categoryId:_id})
}
*/
  onChangeInput(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
    }

  toggle=()=>{
    this.setState({visible:!this.state.visible})
  }



render(){

    let list = this.state.data;


    let addInput;
    if (this.state.visible){
      addInput =
  <div>
  <Input onChange={this.onChangeInput} name='categoryId' placeholder='Category' value={this.state.categoryId}/>
  <Input onChange={this.onChangeInput} name='title' placeholder='Title' value={this.state.title}/>
  <textarea onChange={this.onChangeInput} name='text' placeholder='Recipe' value={this.state.text} />
  <Button positive onClick={this.sendData} >
    <Icon name='plus' />Add</Button>
       </div>



    }

  return (
    <div className="App">
      <header className="App-header">
    <h2>AdminPanel</h2>
      </header>
{this.state.categoryId}
{this.state.onOpen ? <AddRecipe categoryId={this.state.categoryId} /> : ''}

<Button style={{marginTop:-50,marginLeft:50}} positive onClick={this.toggle}>
<Icon name='plus' />Add Category To List</Button>
       {addInput}


{list.map((el,index)=>{return <li key={index}>
{el.title}<br/>
{el._id} <Button onClick={()=>this.setState({categoryId:el._id,onOpen:true,
      dataRecipe:[]})}>


 Add Recipe To This Category</Button>
 </li>}) }


</div>
  );

}
}


export default App;
