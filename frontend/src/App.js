import {Route, Routes, BrowserRouter} from "react-router-dom";

import CalculationApps from "./CalculationPages/CalculationApps";
import Login from "./AdminLoginPage/Login";
import Admin from "./AdminConfigurationPage/Admin";
import Home from "./Home"

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route  path="/"      element={<Home/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route  path="/admin" element={<Admin/>}/>
          <Route  path="/app"   element={<CalculationApps/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
