import './App.css';
import PageWrapper from './pages/pageWrapper';
import Login from './pages/login';
import SignUp from './pages/signup';
import IndexPage from './pages/index';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<PageWrapper />}
      >
        <Route
          index
          element={<IndexPage/>}
        >

        </Route>
        <Route
          path='login'
          element={<Login />}
        >
        </Route>
        <Route
          path='signup'
          element={<SignUp />}
        >
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
