import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthSuccess() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      const userData = { token: accessToken };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, setUser]);

  return <div>Logging you in...</div>;
}

export default AuthSuccess;
