import { useState } from "react";
import "./SignUpSignIn.css";
import { addUser } from "../apiService/user/apiUser";

export const SignUpSignIn = () => {
  const [isActive, setIsActive] = useState(false);
  const [newFormUser, setNewFormUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: newFormUser.name,
      email: newFormUser.email,
      password: newFormUser.password,
    };

    //brakuje jeszcze dostosowania na logowanie/rejestrację
    try {
      addUser(userData);

      setNewFormUser({
        name: "",
        email: "",
        password: "",
      });
      setIsActive(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  };

  return (
    <div className={`container${isActive ? " active" : ""}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            value={newFormUser.name}
            name="name"
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={newFormUser.email}
            name="email"
            placeholder="Email"
            required
          />
          <input 
          type="password" 
          value={newFormUser.password}
            name="password"
          placeholder="Password" 
          required
          />
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button onClick={handleSubmit}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button
              className="hidden"
              id="register"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
