(window.webpackJsonprecipes=window.webpackJsonprecipes||[]).push([[0],{129:function(e,t,a){e.exports=a(255)},134:function(e,t,a){},135:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},136:function(e,t,a){},255:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(25),s=a.n(i),r=(a(134),a(109)),c=a(110),l=a(111),h=a(120),u=a(112),d=a(36),p=a(121),m=(a(135),a(136),a(266)),g=a(264),v=a(256),f=a(26),y=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(h.a)(this,Object(u.a)(t).call(this,e))).toggle=function(){a.setState({visible:!a.state.visible})},a.state={posts:[],data:[],error:null,isLoaded:!1,categoryId:"",title:"",text:"",visible:!1},a.onChangeInput=a.onChangeInput.bind(Object(d.a)(a)),a.sendData=a.sendData.bind(Object(d.a)(a)),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://test-task-server.herokuapp.com/api/v1/category/all").then(function(e){return e.json()}).then(function(t){console.log(t),e.setState({data:t})})}},{key:"sendData",value:function(){var e=this,t={title:this.state.title,text:this.state.text,categoryId:this.state.categoryId},a={mode:"same-origin",method:"POST",body:JSON.stringify(t),headers:{Accept:"application/json","Content-Type":"application/json"}};fetch("https://test-task-server.herokuapp.com/api/v1/recipe/create",a).then(function(t){console.log("Successful"+t),e.setState({categoryId:"",title:"",text:""})})}},{key:"onChangeInput",value:function(e){var t=e.target.name,a=e.target.value;this.setState(Object(r.a)({},t,a))}},{key:"render",value:function(){var e,t=this.state.data;return this.state.visible&&(e=o.a.createElement(m.a,null,o.a.createElement("div",{style:{color:"red"},className:"panel panel-default"},o.a.createElement(g.a,{onChange:this.onChangeInput,name:"categoryId",placeholder:"Category",value:this.state.categoryId}),o.a.createElement(g.a,{onChange:this.onChangeInput,name:"title",placeholder:"Title",value:this.state.title}),o.a.createElement("textarea",{onChange:this.onChangeInput,name:"text",placeholder:"Recipe",value:this.state.text}),o.a.createElement(v.a,{positive:!0,onClick:this.sendData},o.a.createElement(f.a,{name:"plus"}),"Add")))),o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},this.state.categoryId,o.a.createElement("h2",null,"AdminPanel"),o.a.createElement(v.a,{style:{marginTop:-50,marginLeft:50},positive:!0,onClick:this.toggle},o.a.createElement(f.a,{name:"plus"}),"Add To List"),e),t.map(function(e,t){return o.a.createElement("li",{key:t},e.title,o.a.createElement("br",null),e.text)}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[129,1,2]]]);
//# sourceMappingURL=main.0419197f.chunk.js.map