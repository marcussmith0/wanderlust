// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Parent Component
var Main = require("./components/children/Main.jsx");

// This code here allows us to render our main component (in this case Main)
// to the "app" div from our "index.html" file
ReactDOM.render(<Main />, document.getElementById("app"));