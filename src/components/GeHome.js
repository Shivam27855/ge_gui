
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeLayout from "./GeLayout";
import GeEstimation from "./GeEstimation";
import GeAdd from "./GeAdd";

function GeHome() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeLayout />}>
          <Route index element={<GeEstimation />} />
          <Route path="add" element={<GeAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default GeHome;