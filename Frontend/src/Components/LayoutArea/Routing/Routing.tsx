import { Route, Routes } from "react-router-dom";
import Auth from "../../AuthArea/Auth/Auth";
import Home from "../../HomeArea/Home/Home";

function Routing(): JSX.Element {


  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* auth routes */}
      <Route path="/messenger/login" element={<Auth />} />
    </Routes>
  );
}

export default Routing;
