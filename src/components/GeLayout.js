import { Outlet, Link } from "react-router-dom";

const GeLayout = () => {
  return (
    <>
    <button><Link to="/">Home</Link></button>
          <button><Link to="/add">Add Items</Link></button>
    

      <Outlet />
    </>
  )
};

export default GeLayout;