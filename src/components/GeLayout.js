import { Outlet, Link } from "react-router-dom";

const GeLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li><button ><Link to="/">Home</Link></button>
            
          </li>
          <li>
            <Link to="/add">Add Items</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default GeLayout;