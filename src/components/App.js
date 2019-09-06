import React, { Component } from 'react';
import logo from '../logo.svg';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
import {requestSuccess,request,requestError,fetchList} from '../actions';

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
  visible:false
 }

 this.onChangeInput=this.onChangeInput.bind(this);
 this.sendData=this.sendData.bind(this);
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
  var url = 'https://test-task-server.herokuapp.com/api/v1/recipe/create';
  var data = {
    "title": this.state.title,
    "text":this.state.text,
    "categoryId":this.state.categoryId
  };
    fetch(url, {
      mode: 'same-origin',
      body: JSON.stringify(data),
      /*headers: {
        'dataType': 'json',
        'content-type': 'application/json'
      },*/
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      redirect: 'follow'
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response.text());
    } else {
     throw new Error('Something went wrong on api server!');
    }
  })
  .catch(error => {
    console.error(error);
  });


  /*
  const listPost = {
    title: this.state.title
  };
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/recipe/create';
  var option = {
  method: "post",
  headers: {"X-API-TOKEN": "###"},
  contentType: "application/json",
  payload: JSON.stringify(listPost),
  muteHttpExceptions: true,
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
*/

  }


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
      addInput = <Grid>
      <div style={{color:'red'}} className='panel panel-default'>
      <Input onChange={this.onChangeInput} name='categoryId' placeholder='Category' value={this.state.categoryId}/>
      <Input onChange={this.onChangeInput} name='title' placeholder='Title' value={this.state.title}/>
      <textarea onChange={this.onChangeInput} name='text' placeholder='Recipe' value={this.state.text} />
        <Button positive onClick={this.sendData} >
        <Icon name='plus' />Add</Button>
          </div>
          </Grid>
    }

  return (
    <div className="App">
      <header className="App-header">

       <div>


    {list.map((el,index)=>{ return <li
    key={index}>{el.title}<br/>{el.text}</li>}) }


  </div>

      <h2>Adminka</h2>
      <Button style={{marginTop:-50,marginLeft:50}} positive onClick={this.toggle}>
       <Icon name='plus' />Add To List</Button>
       {addInput}
      </header>

      {this.state.categoryId}
    </div>
  );

}
}


export default App;
