import React, { Component } from 'react';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
import AddRecipe from './AddRecipe';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
//import {fetchList} from '../actions';


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
  categoryDeleteId:'',
  visibleInputCategory:false,
  onOpenAdd:false,
  onOpenEdit:false
 }

}


fetchList = () => {
    fetch('https://test-task-server.herokuapp.com/api/v1/category/all')
          .then((res) => { return res.json() })
          .then((data) => {
              console.log(data);
              this.setState({ data });
              });
        }
componentDidMount(){
  //this.props.dispatch(fetchList());
  this.fetchList();
}

addList = (value) => {
  this.setState({data:[...this.state.data, value]});
  this.fetchList();
}

newList = () => {
  this.fetchList();
  this.forceUpdate();
  this.setState({onOpenEdit:false})

}

removeElement = (value) => {
    this.setState({
        data: this.state.data.filter(el => el._id !== value)
    })
}

sendData = () => {

  const listPost = {
    title: this.state.title,
    text: this.state.text,
    categoryId: this.state.categoryId
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


deleteCategory = (value) => {
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/category/'+value;
  var option = {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };
  fetch(qUrl, option).then(data =>{
          console.log("Successful" + data);
    })
}

  onChangeInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
    }

  toggle = () => {
    this.setState({visibleInputCategory:!this.state.visibleInputCategory})
  }



render(){

    let list = this.state.data;


  return (
    <div className="App">
      <header className="App-header">
    <h2>AdminPanel</h2>
      </header>
{this.state.categoryId}
{this.state.title}
{this.state.visibleInputCategory ? <AddCategory addList={this.addList}/> : ''}

{/*{this.state.onOpen ? <AddRecipe categoryId={this.state.categoryId} /> : ''}
*/}

{!this.state.visibleInputCategory?<Button style={{marginLeft:350}} positive onClick={this.toggle}>
<Icon name='plus' />Add New Category</Button>:
<Button style={{marginLeft:350}} onClick={this.toggle}>
<Icon name='times' /></Button>}


{list.map((el,index)=>{return <li key={index}>
<span style={{width:350}}>{el.title}</span><br/>

<Button style={{width:230}}>{el._id}</Button><Button positive onClick={()=>this.setState({
            categoryId:el._id,onOpenAdd:true,onOpenEdit:false})}>
 <Icon name='plus' />New Recipe</Button>

 <Button onClick={()=>this.setState({categoryId:el._id,onOpenEdit:true,onOpenAdd:false})}>
<Icon name='edit' /></Button>

 <Button onClick={()=>{this.setState({categoryDeleteId:el._id});this.deleteCategory(el._id); this.removeElement(el._id); }}>
 <Icon name='times' /></Button>

 {this.state.onOpenAdd&&el._id===this.state.categoryId ?
     <AddRecipe categoryId={this.state.categoryId} fetchList={this.fetchList} /> : ''}

 {this.state.onOpenEdit&&el._id===this.state.categoryId ?
     <EditCategory title={el.title} categoryId={this.state.categoryId} newList={this.newList} /> : ''}
 </li>}) }


</div>
  );

}
}


export default App;
