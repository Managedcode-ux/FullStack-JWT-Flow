import React from "react"
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import {Provider} from 'react-redux'
import { store,persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AnonymousQuotes from './components/Anonymous'
import ProtectedPage from "./components/ProtectedPage"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/anon" element={<AnonymousQuotes/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/protected" element={<ProtectedPage/>}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
