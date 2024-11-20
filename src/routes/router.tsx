import Home from '@/pages/home/home';
import Register from '@/pages/register/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const AppRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<Home />} />
           <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
);
