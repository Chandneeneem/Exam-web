import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './component/signinpages/Register';
import Login from './component/signinpages/Login';
import Home from './layout/Home';
import PrivateRoute from './routing/PrivateRoute';
import Admindash from './component/admin/Admindash';
import Verbal from './component/question/Verbal';
import Appti from './component/question/Appti';
import Current from './component/question/CurrentAf';
import Puzzel from './component/question/Puzzel';
import Aptiadd from './component/admin/pages/Aptiadd';
import InsertQuestion from './component/admin/insertQues/InsertQuestions';
import UserManagement from './component/admin/UserManagement';
import Verbadd from './component/admin/pages/Verbadd';
import VerbQue from './component/admin/insertQues/VerbQue';
import Currgkadd from './component/admin/pages/Currgkadd';
import CurrgkQue from './component/admin/insertQues/CurrgkQue';
import Notfound from './component/let/404notfound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute isAdmin={false} element={<Home />} />} />
        <Route path='/verb' element={<PrivateRoute isAdmin={false} element={<Verbal />}></PrivateRoute>}></Route>
        <Route path='/apti' element={<PrivateRoute isAdmin={false} element={<Appti />}></PrivateRoute>}></Route>
        <Route path='/currenta' element={<PrivateRoute isAdmin={false} element={<Current />}></PrivateRoute>}></Route>
        <Route path='/puzzel' element={<PrivateRoute isAdmin={false} element={<Puzzel />}></PrivateRoute>}></Route>

        {/* admin access all pages user acess which page only  isadmin  false  */}
        <Route path="/admindash" element={<PrivateRoute isAdmin={true} element={<Admindash />} />} />
        <Route path='/aptiadd' element={<PrivateRoute isAdmin={true} element={<Aptiadd />}></PrivateRoute>}></Route>
        <Route path='/verbadd' element={<PrivateRoute isAdmin={true} element={<Verbadd />}></PrivateRoute>}></Route>
        <Route path='/insert' element={<PrivateRoute isAdmin={true} element={<InsertQuestion />}></PrivateRoute>}></Route>
        <Route path='/um' element={<PrivateRoute isAdmin={true} element={<UserManagement />}></PrivateRoute>}></Route>
        <Route path='/iverbal' element={<PrivateRoute isAdmin={true} element={<VerbQue />}></PrivateRoute>}></Route>
        <Route path='/insertcgk' element={<PrivateRoute isAdmin={true} element={<Currgkadd />}></PrivateRoute>}></Route>
        <Route path='/icgk' element={<PrivateRoute isAdmin={true} element={<CurrgkQue />}></PrivateRoute>}></Route>
        <Route path='/notfound' element={<Notfound></Notfound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

