import './App.css';
import CustomerList from './CustomerList';
import TrainingList from './TrainingList';
import TrainingCalendar from './TrainingCalendar';
import TrainingStatistics from './TrainingStatistics';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Customer List</Link>{' '}
        <Link to="/TrainingList">Training List</Link>{' '}
        <Link to="/TrainingCalendar">Training Calendar</Link>{' '}
        <Link to="/TrainingStatistics">Training Statistics</Link>{' '}
        <Routes>
          <Route path="/" element={<CustomerList/>} />
          <Route path="/TrainingList" element={<TrainingList />} />
          <Route path="/TrainingCalendar" element={<TrainingCalendar />} />
          <Route path="/TrainingStatistics" element={<TrainingStatistics />} />
        </Routes>
    </BrowserRouter >
    </div>
  );
}

export default App;
