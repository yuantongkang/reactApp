import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './Welcome'
ReactDOM.render(
  <h1>Hi, world!</h1>,
  document.getElementById('root')
);
ReactDOM.render(
  <App/>, 
  document.querySelector('#root')

)

// setInterval(tick, 1000);

/*function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}*/

// setInterval(tick, 1000);


// class Welcome extends React.Component{
//   render(){
//     return <h1>hello, {this.props.name}</h1>;
//   }
// }
// ReactDOM.render(<Welcome name = "YuanTong"/>,
//   document.querySelector('#root')
// )





