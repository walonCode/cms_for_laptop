import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getMe = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users/me", {
        withCredentials: true, // Important to send cookies
      });
      console.log(response.data);
      console.log(response.headers)
      setIsAuthenticated(true); // Set authentication state after successful response
    } catch (error) {
      console.log("Not authenticated", error);
      setIsAuthenticated(false); // Handle when the user is not authenticated
    }
  };

  // Call getMe after the user is logged in (assuming Login component handles authentication)
  useEffect(() => {
    if (isAuthenticated) {
      getMe(); // Trigger after login
    }
  }, [isAuthenticated]);

  return (
    <div className="flex">
      <Register />
      <Login setIsAuthenticated={setIsAuthenticated} />
    </div>
  );
}
