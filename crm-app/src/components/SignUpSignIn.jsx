import { useState } from "react";
import "./SignUpSignIn.css";
import { addUser, logInUser } from "../apiService/user/apiUser";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../helpers/helpers";

export const SignUpSignIn = ({setUser}) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [newFormUser, setNewFormUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewFormUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: newFormUser.name,
      email: newFormUser.email,
      password: newFormUser.password,
    };

    if (isActive) {
      addUser(userData)
        .then(() => {
          setNewFormUser({
            name: "",
            email: "",
            password: "",
          });
          setIsActive(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      logInUser({ email: newFormUser.email, password: newFormUser.password })
        .then((user) => {
          setCookie(user)
          setUser(user)
          navigate("/");
          
        })
        .catch((err) => {
          console.error(err);
        });
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
        <form onSubmit={handleSubmit}>
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
            name="name"
            value={newFormUser.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <span className="text-danger">Użytkownik istnieje</span>
          <input
            type="email"
            name="email"
            value={newFormUser.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={newFormUser.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {/* <input
            type="password"
            value={newFormUser.password}
            name="password"
            placeholder="Repeat password"
            required
          /> */}
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
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
          <input
            type="email"
            name="email"
            value={newFormUser.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={newFormUser.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <a href="#">Forget Your Password?</a>
          <button>Sign In</button>
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
