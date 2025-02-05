import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeGenerator from "./pages/RecipeGenerator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<RecipeGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
