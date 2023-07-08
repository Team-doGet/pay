import 'normalize.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ComponentsTest from './components/ComponentsTest';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ComponentsTest />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
