import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
import "../styles/Login.css";
import API from '../API/api'; // Import API from the path

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await API.post("/users/login", { email, password }); 
      const data = response.data;
      console.log("Response Data:", data);
  
      if (response.status === 200) {
        if (email === "admin@gmail.com" && password === "admin12345") {
          navigate("/Admin-Dashboard");
        } else if (data.token) {
          // Store user details in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("userName", data.username);
  
          setShowDialog(true);
  
          // Automatically navigate after 3 seconds
          setTimeout(() => {
            setShowDialog(false);
            navigate("/");
          }, 2000);
        } else {
          alert("Login failed: No token received.");
        }
      } else {
        alert(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="background-container">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to your account to continue</p>
          </div>

          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="input-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="flex-between">
                  <label htmlFor="password" className="input-label">Password</label>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="checkbox-container">
                <input id="remember-me" name="remember-me" type="checkbox" className="checkbox" />
                <label htmlFor="remember-me" className="checkbox-label">Remember me</label>
              </div>

              <button type="submit" disabled={isLoading} className={`submit-button ${isLoading ? "button-loading" : ""}`}>
                {isLoading ? (
                  <span className="spinner-container">
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="button-content">
                    <LogIn size={18} className="icon-margin-right" />
                    Sign In
                  </span>
                )}
              </button>
            </form>

            <div className="register-container">
              <p className="register-text">
                Don't have an account?{" "}
                <a href="/signup" className="register-link">
                  Sign up now
                  <ArrowRight size={16} className="icon-margin-left" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showDialog && (
        <div className="dialog-box">
          <div className="success-icon">✅</div>
          <p>Login Successful!</p>
          <button onClick={() => setShowDialog(false)}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Login;
