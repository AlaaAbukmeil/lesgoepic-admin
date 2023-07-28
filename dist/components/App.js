"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../routers/router"));
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<div className="App">
      <react_router_dom_1.RouterProvider router={router_1.default}/>
    </div>);
}
exports.default = App;
