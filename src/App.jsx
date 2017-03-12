import React from 'react'
import { render } from 'react-dom'
import SearchInput from './components/search-input'

const App = React.createClass({
   render(){
       return (
           <div>
               <SearchInput/>
           </div>
       )
   }
});

export default App;