import React, { Component } from 'react';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import '../App.css';
import {Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import {requestSuccess,request,requestError,fetchList} from '../actions';
import AddRecipe from './AddRecipe';
import AddArticle from './AddArticle';
import Recipe from './Recipe';
import BlockTree from './BlockTree';
import Category from './Category';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
  parentId:'',
  title:'',
  text:'',
  categoryDeleteId:'',
  visibleInputCategory:false,
  onOpenAdd:false,
  onOpenAddArticle:false,
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
    let listChildCat = list.filter(el => el.parentId !==null);


  return (

<Router>

    <div className="App">

      <header className="App-header">
    <h2>AdminPanel</h2>
      </header>


{/*this.state.categoryId*/}
<b>{this.state.title}</b>{' '}>>{' '}


{this.state.visibleInputCategory ? <AddCategory parentId={null} onOpenAddchild={this.onOpenAddchild}
        addList={this.addList}/> : ''}


{!this.state.visibleInputCategory?<Button style={{marginLeft:350}} positive onClick={this.toggle}>
<Icon name='plus' />Add New Category</Button>:
<Button style={{marginLeft:350}} onClick={this.toggle}>
<Icon name='times' /></Button>}



{listSelected.map((el,index)=>{return <li key={index}>
<span style={{width:350}}>{el._id}</span><br/>

<a href={"/category/"+el._id}>
<Button onClick={()=>this.setState({title:el.title})} style={{width:230}}>{/*{el.title}*/}
<span style={{color:'#2874A6'}}>{el.title}</span></Button></a>

<Button positive onClick={()=>this.setState({categoryId:el._id, parentId:el._id,
                   title:el.title, onOpenAddchildCat:!this.state.onOpenAddchildCat,
                   onOpenEdit:false})}>
 <Icon name='plus' />Add Child Category</Button>



{!this.state.onOpenAddArticle ?
 <Button color='blue' onClick={()=>this.setState({categoryId:el._id,
                    title:el.title, onOpenAddArticle:!this.state.onOpenAddArticle,onOpenEdit:false})}>
  <Icon name='plus' />New Article</Button> :
  <Button onClick={()=>this.setState({onOpenAddArticle:!this.state.onOpenAddArticle})}>
  <Icon name='times' /></Button> }


{!this.state.onOpenAdd ?
<Button color='teal' onClick={()=>this.setState({categoryId:el._id,
                   title:el.title, onOpenAdd:!this.state.onOpenAdd,onOpenEdit:false})}>
 <Icon name='plus' />New Recipe</Button> :
 <Button onClick={()=>this.setState({onOpenAdd:!this.state.onOpenAdd})}>
 <Icon name='times' /></Button> }




 <Button onClick={()=>this.setState({categoryId:el._id,onOpenEdit:true,onOpenAdd:false})}>
<Icon name='edit' /></Button>

 <Button onClick={()=>{this.setState({categoryDeleteId:el._id});this.deleteCategory(el._id); this.removeElement(el._id); }}>
 <Icon name='times' /></Button>


 <Route path={"/category/"+el._id} render={()=><Category categoryId={el._id} />}   />



 {this.state.onOpenAddchildCat&&el._id===this.state.categoryId ?
     <AddCategory parentId={el._id} onOpenAddchild={this.onOpenAddchild} addList={this.addList}/> : ''}

 {this.state.onOpenAdd&&el._id===this.state.categoryId ?
     <AddRecipe categoryId={this.state.categoryId} fetchList={this.fetchList} /> : ''}

{this.state.onOpenAddArticle&&el._id===this.state.categoryId ?
         <AddArticle categoryId={this.state.categoryId} fetchList={this.fetchList} /> : ''}

 {this.state.onOpenEdit&&el._id===this.state.categoryId ?
     <EditCategory title={el.title} categoryId={this.state.categoryId} newList={this.newList} /> : ''}




<BlockTree parentId={el._id} />


 </li>}) }

{/*<Route path="/:el._id" component={Category} categoryId={el._id} />
<Route path='/recipe/' component={Recipe}/>

<Route path="/recipe/" render={()=><Recipe /> }   />
*/}


</div>

    </Router>);

   }
}


export default App;
