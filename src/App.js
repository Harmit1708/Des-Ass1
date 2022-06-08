import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home'
import React, {  useState } from 'react';

export const newContext = React.createContext();
function App() {

  let [otherData,setOtherData] = useState();
  const [otherModalShow, setOtherModalShow] = React.useState(false);
  let [boolTrue,setBoolTrue] = React.useState();

  return (
    <BrowserRouter>
    <newContext.Provider value={{otherData,setOtherData,otherModalShow,setOtherModalShow,boolTrue,setBoolTrue}}>
      <Routes>
        <Route path="/" element={<Signin/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </newContext.Provider>
    </BrowserRouter>
  );
}

export default App;
