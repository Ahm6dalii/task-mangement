import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './pages/layout/Layout';

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
