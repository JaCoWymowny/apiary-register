import { Route, Routes } from "react-router-dom";
import First from "../../pages/First";
import Second from "../../pages/Second";

const AppLayout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={
            <First />
          }
        />

        <Route path="/second" element={
            <Second />
          }
        />
      </Routes>
    </div>
  )
};

export default AppLayout;
