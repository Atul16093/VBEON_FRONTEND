import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReduxStore from "./Redux/Redux.jsx"
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={ReduxStore}>
    <App/>
    </Provider>
    </BrowserRouter>
)
