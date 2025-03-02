import React, { useState, useEffect } from 'react';
import '../styles/Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Animate form appearance after component mounts
    setTimeout(() => {
      setFormVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    // Calculate password strength
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Signup failed");
      }
      
      await response.json();
      
      showNotification("Signup Successful! Redirecting to login...", "success");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message || "Something went wrong!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  return (
    <div className="signup-container">
      <div className={`signup-card ${formVisible ? 'visible' : ''}`}>
        <div className="card-header">
          <h1>Create Account</h1>
          <div className="pulse-animation"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${activeField === 'username' ? 'active' : ''}`}>
            <label className="label-float">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setActiveField('username')}
                onBlur={() => setActiveField(null)}
                required
              />
              <span>Username</span>
            </label>
          </div>
          
          <div className={`form-group ${activeField === 'email' ? 'active' : ''}`}>
            <label className="label-float">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
                required
              />
              <span>Email</span>
            </label>
          </div>
          
          <div className={`form-group ${activeField === 'password' ? 'active' : ''}`}>
            <label className="label-float">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setActiveField('password')}
                onBlur={() => setActiveField(null)}
                required
              />
              <span>Password</span>
            </label>
            
            {password && (
              <div className="password-strength">
                <div className="strength-bars">
                  <div className={`bar ${passwordStrength >= 1 ? 'active' : ''}`}></div>
                  <div className={`bar ${passwordStrength >= 2 ? 'active' : ''}`}></div>
                  <div className={`bar ${passwordStrength >= 3 ? 'active' : ''}`}></div>
                  <div className={`bar ${passwordStrength >= 4 ? 'active' : ''}`}></div>
                </div>
                <span>
                  {passwordStrength === 0 && "Very Weak"}
                  {passwordStrength === 1 && "Weak"}
                  {passwordStrength === 2 && "Medium"}
                  {passwordStrength === 3 && "Strong"}
                  {passwordStrength === 4 && "Very Strong"}
                </span>
              </div>
            )}
          </div>
          
          <div className={`form-group ${activeField === 'confirmPassword' ? 'active' : ''}`}>
            <label className="label-float">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setActiveField('confirmPassword')}
                onBlur={() => setActiveField(null)}
                required
              />
              <span>Confirm Password</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        <div className="login-redirect">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;