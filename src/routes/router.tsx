import PasswordID from '@/components/forms/password';
import Home from '@/pages/home/home';
import Register from '@/pages/register/register';
import Sucess from '@/pages/sucess/sucess';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
           <Route path='/register' element={<Register />} />
           <Route path='/sucess' element={<Sucess />} />
           <Route path='/password' element={<PasswordID />} />
        </Routes>
    </Router>
);
