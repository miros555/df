import React, { Component } from 'react';
import '../App.css';
import {Input, TextArea, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
//import Article from './Article';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class AddArticle extends Component {
constructor(props){
super(props);
this.state={
  data:[],
  error: null,
  isLoaded: false,
  categoryId:this.props.categoryId,
  articleId:'',
  title:'',
  text:'',
  openConfirm:false,
  visible:false
}

}

fetchListItem = () => {
fetch('https://test-task-server.herokuapp.com/api/v1/article/byCategory/'+this.props.categoryId)
            .then((res) => { return res.json() })
            .then((data) => {
                console.log(data);
                this.setState({ data: data });
                });

}

addListItem = (value) => {
  this.setState({data: [...this.state.data, value]});
  this.fetchListItem ();
}

componentDidMount(){
  this.fetchListItem ();
  }


sendItem = () => {

  const listPost = {
    title: this.state.title,
    text: this.state.text,
    categoryId: this.props.categoryId
  };
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/article/create';
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
           this.fetchListItem(),
           this.addListItem(listPost)
    //this.setState({onOpenEdit:false})
  );

  }

deleteItem = (value) => {
  //var ItemId = this.state.ItemId;
  var qUrl = 'https://test-task-server.herokuapp.com/api/v1/Item/'+value;
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
    //this.fetchListItem()

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
 <Router>
  <Grid style={{marginTop:-50,marginLeft:455}}>
  <Grid.Row>
  <Grid.Column width={5}>
  {this.state.articleId}
  <Input onChange={this.onChangeInput} style={{width:350}} name='title' placeholder='Title' value={this.state.title}/>
  <TextArea onChange={this.onChangeInput} style={{width:350}} name='text' placeholder='Text of your article' value={this.state.text} />
  <Button onClick={this.sendItem} >Add</Button><br/>

List Articles of this Category:<br/>
  { this.state.data.map((el,i)=>{return <li key={i}>
  <a href={"/article"+el._id}>{el.title}</a>
  <Button style={{marginLeft:150}} onClick={()=>{this.setState({articleId:el._id});
          this.deleteArticle(el._id) }} >Delete</Button>{' '}


{/*
<Route path={"/article"+el._id} render={()=><Article articleId={el._id} />} />

{this.state.openConfirm?<Button onClick={this.deletearticle}>Yes</Button>:''}*/}
  </li> }) }

  </Grid.Column>
  </Grid.Row>
  </Grid>


  </Router>);

}
}


export default AddArticle;
