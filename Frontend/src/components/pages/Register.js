// SignIn.js
import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { devApiLink } from './config';
import { useAuth } from '../auth/AuthContext';

function SignIn() {
  const [isActive, setIsActive] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [useremail1, setUseremail1] = useState("");
  const [password1, setPassword1] = useState("");

  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [forgotphone, setForgotphone] = useState("");

  const [domainName, setDomainName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [officialId, setOfficialId] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login from useAuth

  const handleLogin = () => {
    if (!useremail1 || !password1) {
      toast.error('Please fill all the fields.');
      return;
    }

    if (!captchaVerified) {
      toast.error('Please complete the CAPTCHA.');
      return;
    }

    axios
      .post(`${devApiLink}/user/login`, {
        email: useremail1,
        password: password1,
      })
      .then((res) => {
        if (res.data.status) {
          login(); // Set authentication state to true
          navigate("/dashboard");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) =>
        console.error("There was an error logging in: ", error)
      );
  };

  const handleRegister = () => {
    if (!email || !password || !passwordConfirm || !domainName || 
        !userName || !officialId || !phone || !birthday) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('Please confirm your password.');
      return;
    }

    axios
      .post(`${devApiLink}/user/register`, {
        email,
        password,
        phone,
        name: userName,
        domain: domainName,
        official: officialId,
        birthday: birthday
      })
      .then((res) => {
        if (res.data.status) {
          login(); // Set authentication state to true
          navigate("/dashboard");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((error) =>
        console.error("There was an error registering: ", error)
      );
  };

  const handleForgotPassword = () => {
    axios
      .post(`${devApiLink}/user/forgotpassword`, { phone: forgotphone })
      .then((res) => {
        if (res.data.status) toast.success(res.data.msg);
        else toast.error(res.data.msg);
      })
      .catch((error) => {
        console.error("There was an error with the forgot password request: ", error);
      });
  };

  const onCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  return (
    <div className="signinbody">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
      <div className={`container ${isActive ? 'active' : ''}`}>
        <div className="form-box login">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                id="login-email"
                type="email"
                placeholder="User Email"
                value={useremail1}
                onChange={(e) => setUseremail1(e.target.value)}
                required
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                pattern=".{8,}"
                required
                title="Password must be at least 8 characters long"
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <ReCAPTCHA
              sitekey="6LeJbHsqAAAAANoo0kteyXPVm8ttEjhb0ctUP0e6"
              onChange={onCaptchaChange}
            />
            <div className="forgot-link" style={{marginTop: '30px'}}>
              <a href="#" onClick={() => setForgotPasswordVisible(!forgotPasswordVisible)}>Forgot Password?</a>
            </div>
            {forgotPasswordVisible && (
              <div className="forgot-password-box" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
                <div className="input-box">
                  <input
                    id="forgot-email"
                    type="text"
                    placeholder="Phone number"
                    value={forgotphone}
                    onChange={(e) => setForgotphone(e.target.value)}
                    required
                  />
                  <i className='bx bxs-phone'></i>
                </div>
                <button type="button" className="btn1" onClick={handleForgotPassword}>Submit</button>
              </div>
            )}
            <button type="button" className="btn" onClick={handleLogin}>Login</button>
          </form>
        </div>

        <div className="form-box register">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Registration</h1>
            <div className="input-box">
              <input
                id="register-domain-name"
                type="text"
                placeholder="Official Domain Name"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                required
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                id="register-email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                id="register-user-name"
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <i className='bx bxs-user-circle'></i>
            </div>
            <div className="input-box">
              <input
                id="register-official-id"
                type="text"
                placeholder="Official ID"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                required
              />
              <i className='bx bxs-id-card'></i>
            </div>
            <div className="input-box">
              <input
                id="register-phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <i className='bx bxs-phone'></i>
            </div>
            <div className="input-box">
              <input
                id="register-birthday"
                type="text"
                placeholder="Birthday(0000-00-00)"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
              <i className='bx bxs-calendar'></i>
            </div>
            <div className="input-box">
              <input
                id="register-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern=".{8,}"
                required
                title="Password must be at least 8 characters long"
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box">
              <input
                id="register-password-confirm"
                type="password"
                placeholder="Password Confirmation"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                pattern=".{8,}"
                required
                title="Password must be at least 8 characters long"
              />
              <i className='bx bxs-lock-alt'></i>
            </div>

            <button type="submit" className="btn" onClick={handleRegister}>Register</button>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={() => setIsActive(true)}>Register</button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={() => setIsActive(false)}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;