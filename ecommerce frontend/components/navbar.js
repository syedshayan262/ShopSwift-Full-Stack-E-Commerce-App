import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "15px", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link> |<Link to="/products">Products</Link> |
      <Link to="/cart">Cart</Link> |
      {user ? (
        <>
          <span style={{ marginLeft: 10 }}>Hi, {user.name}</span>
          <button onClick={logout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |<Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}
