import React, { Component } from 'react';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';
import Category from './Category';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//import {fetchList} from '../actions';


class BlockTree extends Component {
constructor(props){
super(props);
this.state={
  posts: [],
  data: [],
  error: null,
  isLoaded: false,
  categoryId:'',
  parentId:'',
  title:'',
  text:'',
  categoryDeleteId:'',
  visibleInputCategory:false,
  onOpenAdd:false,
  onOpenAddchildCat:false,
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

onOpenAddchild = (value) => {
  this.setState({onOpenAddchildCat:value})
}

render(){

    let list = this.state.data;
    let listSelected = list.filter(el => el.parentId==null);
    let listChildCat = list.filter(el => el.parentId===this.props.parentId);

    //listSelected.push(listChildCat);

  {/*  listSelected = [...listSelected, listChildCat];  */}



  return (

<Router>

<div>

 {listChildCat.map((el,index)=>{return <li key={index}>
 <span style={{marginLeft:20,width:350}}>{el._id}</span><br/>
 <a href={"/category/"+el._id}>
 <button onClick={()=>this.setState({title:el.title})} style={{width:130}}>{/*{el.title}*/}
 <span style={{color:'#2874A6'}}>{el.title}</span></button></a>


{/************************************************************/}

 <Button size='mini' positive onClick={()=>this.setState({categoryId:el._id, parentId:el._id,
                    title:el.title, onOpenEdit:false, onOpenAddchildCat:!this.state.onOpenAddchildCat,
                    onOpenEdit:false})}>
  <Icon name='plus' />Add Child Category</Button>


 <Button size='mini' positive onClick={()=>this.setState({categoryId:el._id,
                    title:el.title, onOpenAdd:!this.state.onOpenAdd,
                    onOpenAddchildCat:false, onOpenEdit:false})}>
  <Icon name='plus' />New Recipe</Button>

  <Button size='mini' onClick={()=>this.setState({categoryId:el._id,
                     onOpenEdit:!this.state.onOpenEdit, onOpenAddchildCat:false, onOpenAdd:false})}>
 <Icon name='edit' /></Button>

  <Button size='mini' onClick={()=>{this.setState({categoryDeleteId:el._id});this.deleteCategory(el._id); this.removeElement(el._id); }}>
  <Icon name='times' /></Button>

  {this.state.onOpenAddchildCat&&el._id===this.state.categoryId ?
      <AddCategory parentId={el._id} onOpenAddchild={this.onOpenAddchild} addList={this.addList}/> : ''}

  {this.state.onOpenAdd&&el._id===this.state.categoryId ?
      <AddRecipe categoryId={this.state.categoryId} fetchList={this.fetchList} /> : ''}

  {this.state.onOpenEdit&&el._id===this.state.categoryId ?
      <EditCategory title={el.title} categoryId={this.state.categoryId} newList={this.newList} /> : ''}





<BlockTree parentId={el._id} />




 <Route path={"/category/"+el._id} render={()=><Category categoryId={el._id} />}   />


{/****************************************************************/}


 </li>}) }

</div>



    </Router>);

   }
}


export default BlockTree;
