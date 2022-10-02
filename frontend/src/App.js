import { Routes, Route } from 'react-router-dom';
import PageWrapper from './pages/pageWrapper';
import Login from './pages/login';
import SignUp from './pages/signup';
import IndexPage from './pages/index';
import Account from './pages/account';
import NewEvent from './pages/newEvent';
import AllUserEvents from './pages/userEvents';
import UserOverview from './pages/userOverview';


function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<PageWrapper />}
      >
        <Route
          index
          element={<IndexPage />}
        />
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='signup'
          element={<SignUp />}
        />
        <Route
          path='account'
          element={<Account />}
        >
          <Route
            path='new-event'
            element={<NewEvent />}
          />
          <Route
            path='user-events'
            element={<AllUserEvents />}
          />
          <Route
            path='overview'
            element={<UserOverview />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
