import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Layout from './pages/layout/layout'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
 
  return (
    <Provider store={store}>
      <BrowserRouter>

     <Layout/>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App
