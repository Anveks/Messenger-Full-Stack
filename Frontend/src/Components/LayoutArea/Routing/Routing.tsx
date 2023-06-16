import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import MessagesField from "../../HomeArea/MessagesField/MessagesField";
import Home from "../../HomeArea/Home/Home";

function Routing(): JSX.Element {


  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* auth routes */}
      <Route path="/messenger/login" element={<Login />} />
      <Route path="/messenger/register" element={<Register />} />
    </Routes>
  );
}

export default Routing;
