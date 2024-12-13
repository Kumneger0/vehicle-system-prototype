import "./App.css";
import { Routes, Route } from "react-router";
import ViewVehicles from "@/components/viewVehicles";
import { AddNewVehicle } from "@/components/addNewVehicle";

function App() {
  return (
    <Routes>
      <Route path="/" Component={ViewVehicles} />
      <Route path="/add" Component={AddNewVehicle} />
    </Routes>
  );
}

export default App;
