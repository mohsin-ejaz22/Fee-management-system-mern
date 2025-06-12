import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { UserContextProvider } from './components/ContextApi/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>,
   </UserContextProvider>
 
)