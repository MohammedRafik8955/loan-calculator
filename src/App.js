import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoanCalculator from './components/LoanCalculator';
import ExchangeRates from './components/ExchangeRates';
import About from './components/About';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';

const Page = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page><LoanCalculator /></Page>} />
        <Route path="/exchange" element={<Page><ExchangeRates /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
