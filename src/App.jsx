import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import PrivateRoutes from './utils/PrivateRoutes'
import Karyawan from './views/Karyawan';

const App = () => {

  return <>
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/karyawan' element={<Karyawan />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>  </>

};

export default App;
