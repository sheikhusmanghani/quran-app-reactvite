import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SurahList from "./components/SurahList";
import SurahDetail from "./components/SurahDetail";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SurahList />} />
        <Route path="/surah/:number" element={<SurahDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
