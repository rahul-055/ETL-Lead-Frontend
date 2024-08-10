import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Index from './componentes/pages/dashboard/index';
import Signup from './componentes/auth/signup';
import Signin from './componentes/auth/signin';
import Sidebar from './componentes/pages/layouts/sidebar';
import Header from './componentes/pages/layouts/header';
import Listlead from './componentes/pages/lead/listlead';
import Addlead from './componentes/pages/lead/addlead';
import Viewleads from './componentes/pages/lead/viewleads';
function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  // Sync with localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);


  return (
    <div className="App">
      <Router>
        <div id="wrapper" style={{ paddingLeft: authToken ? '250px' : '0px' }}>
          {authToken &&
            <>
              <Sidebar />
              <Header />
            </>
          }
          <Routes>
            {authToken ?
              <>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/listlead" element={<Listlead />} />
                <Route path="/addlead/:id" element={<Addlead />} />
                <Route path="/viewlead/:id" element={<Viewleads />} />
                <Route path="/" element={<Index />} />
              </>
              :
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin setAuthToken={setAuthToken} />} />
                <Route path="*" element={<Navigate to="/signin" />} />
              </>
            }
          </Routes>
        </div >
      </Router >
    </div >
  );
}

export default App;
