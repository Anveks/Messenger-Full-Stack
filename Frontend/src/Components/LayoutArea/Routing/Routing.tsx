import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import MessagesField from "../../HomeArea/MessagesField/MessagesField";

function Routing(): JSX.Element {


  return (
    <Routes>

      <Route path="/" element={<MessagesField />} />
      <Route path="/messages-field" element={<MessagesField />} />

      {/* auth routes */}
      <Route path="/messenger/login" element={<Login />} />
      <Route path="/messenger/register" element={<Register />} />
    </Routes>
  );
}

export default Routing;
