import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const [progress,setprogress]=useState(1)

 const apikey = "aa10192302064e39abb4b3e2145ce8c4"
  
  return (
<>
<Router>
<LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
<Navbar/>
<div className="container">
<Routes>
  <Route  exact index element={<News setProgress={(x)=>setprogress(x)} apikey={apikey}    key='general'  country="in" category="general" />}/> 
  <Route  exact path='/business' element={<News  setProgress={(x)=>setprogress(x)} apikey={apikey}  key='busines'  country="in" category="business" />}/>
  <Route  exact path='/entertainment' element={<News setProgress={(x)=>setprogress(x)} apikey={apikey}   key='entertainment' country="in" category="entertainment" />}/>
  <Route  exact path='/health' element={<News  setProgress={(x)=>setprogress(x)} apikey={apikey}  key='health'  country="in" category="health" />}/>
  <Route  exact path='/science' element={<News setProgress={(x)=>setprogress(x)} apikey={apikey}   key='science'  country="in" category="science" />}/>
  <Route  exact path='/sports' element={<News  setProgress={(x)=>setprogress(x)} apikey={apikey}  key='sports'  country="in" category="sports" />}/>
  <Route  exact path='/technology' element={<News setProgress={(x)=>setprogress(x)} apikey={apikey}   key='technology'  country="in" category="technology" />}/>
</Routes>
</div>
</Router>

</>
  )
}
