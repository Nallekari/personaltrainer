import './App.css';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Customer List</Link>{' '}
        <Link to="/TrainingList">Training List</Link>{' '}
        <Routes>
          <Route path="/" element={<CustomerList/>} />
          <Route path="/TrainingList" element={<TrainingList />} />
        </Routes>
    </BrowserRouter >
    </div>
  );
}

export default App;
