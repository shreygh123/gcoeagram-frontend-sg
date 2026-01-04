import "./login.css";

import React, { useState, useContext, useEffect } from "react";
import TopBar from "../../components/topbar/TopBar";
import { Context } from "../../context/Context";
import bg1 from '../../Images/bg1.jpeg';
import bg2 from '../../Images/bg2.jpeg';
import bg3 from '../../Images/bg3.jpeg';
import bg4 from '../../Images/bg4.jpeg';
// import bg5 from '../../Images/bg5.jpeg';
import bg6 from '../../Images/bg6.jpeg';


import a1 from './a1.png';
import a2 from './a2.png';
import a4 from './a4.png';
import a3 from './a3.png';
import a5 from './a5.png';
import a6 from './a6.png';
import a7 from './a7.png';
import a8 from './a8.png';
import a9 from './a9.png';
import a10 from './a10.png';
import a11 from './a11.png';
import a12 from './a12.png';
import a13 from './a13.png';
import a14 from './a14.png';
import a15 from './a15.png';

import SnackBar from "../../components/Snackbar";
function Login({ axiosInstance }) {
  const bgImgs = [bg1, bg2, bg3, bg4, bg6];
  const [bgImg, setBgImg] = useState(bg1)
  let i = 1;
  useEffect(() => {
    setInterval(() => {
      setBgImg(bgImgs[i % 5]);
      ++i;
    }, 5000);
  }, [])


  const { dispatch, isFetching } = useContext(Context);
  const [userContact, setUserContact] = useState("");
  const [checkIP, setCheckIP] = useState("tel");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState({
    status: false,
    message: "",
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    repassword: "",
  });

  const registerChange = (e) => {
    const { name, value } = e.target;
    if (document.getElementById(name).className === "myInput red") {
      document.getElementById(name).className = "myInput";
      setErr({ status: false, message: "" });
    }
    setRegister((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handelRegister = async (e) => {
    e.preventDefault();
    if (register.password === register.repassword) {
      console.log(register);
      dispatch({ type: "Login_START" });
      try {
        const res = await axiosInstance.post("/api/newregister", register);
        if (res.data.status) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
          loadData();
          localStorage.setItem("token", res.data.token);
        } else {
          if (res.data.message === "err") {
            setErr({
              status: true,
              message:
                "Your " +
                Object.keys(res.data.err) +
                " " +
                res.data.err[Object.keys(res.data.err)[0]] +
                " is already taken",
            });
            document.getElementById(Object.keys(res.data.err)).className =
              "myInput red";
            document.getElementById(Object.keys(res.data.err)).focus();
          } else {
            alert("You are already registered");
          }
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } else {
      document.getElementById("repassword").className = "myInput red";
      document.getElementById("repassword").focus();
      setErr({ status: true, message: "Your password did'nt matches" });
    }
  };
  const [view, setView] = useState(true);
  const changeView = () => {
    setView(!view);
  };
  const loadData = async () => {
    if (localStorage.getItem("token")) {
      try {
        dispatch({ type: "Login_START" });
        const data = await axiosInstance.get("/api/auth/verifytoken", {
          headers: { token: localStorage.getItem("token") },
        });
        console.log(data);
        dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user });
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "Login_START" });
    let loginCred = {
      auth: userContact,
      password: password,
    };
    console.log(loginCred);
    try {
      const res = await axiosInstance.post("/api/login", loginCred);
      if (res.data.status) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });

        localStorage.setItem("token", res.data.token);
      } else {
        setErr({ status: true, message: res.data.message });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (<div style={
    {
      position: 'absolute',
      flexFlow: 'column',
      width: '100vw',
      left: '0',
      top: '0'
    }
  }>
    <TopBar />

    <div className="login" style={{
      backgroundImage: `url(${bgImg})`
    }}>


      <div className="Container">
        <div className="myCard" data-aos="zoom-in">
          <div className="Row">

            {view ? (
              <div className="Col-lg-100">
                <div className="myRightCtn">
                  <form onSubmit={handelSubmit} className="myForm text-center">
                    <header>LOGIN</header>
                    <div className="form-group">
                      <i className="fas fa-user"></i>

                      <input
                        className="myInput IP"
                        type="text"
                        name="userContact"
                        onChange={(e) => {
                          setUserContact(e.target.value);
                          setErr({ status: false, message: "" });
                        }}
                        value={userContact}
                        placeholder="Email or Username"
                      />
                    </div>

                    <div className="form-group">
                      <i className="fas fa-lock"></i>
                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setErr({ status: false, message: "" });
                        }}
                        className="myInput"
                        type="password"
                        placeholder="Password"
                        name=""
                      />
                    </div>
                    <input
                      type="submit"
                      className="butt"
                      name=""
                      value="Login"
                    />
                    <a className="forgot">Forgot password?</a>
                    <br />
                    <div >
                      OR
                    </div>
                    <br />
                    {/* <br /> */}
                    <input
                      onClick={changeView}
                      type="button"
                      className="butt"
                      name=""
                      value="Register"
                    />
                    <br />
                  </form>
                </div>
              </div>
            ) : (
              <div className="Col-lg-100">
                <div className="myRightCtn">
                  <form
                    onSubmit={handelRegister}
                    className="myForm text-center"
                  >
                    <header>Register</header>
                    <div className="Row">
                      <div className="Col-lg-33 Col-md-2 Col-sm-1">
                        <div className="form-group">
                          <i className="fas fa-user"></i>

                          <input
                            className="myInput"
                            type="text"
                            required
                            id="name"
                            name="name"
                            value={register.name}
                            onChange={registerChange}
                            placeholder="Name"
                          />
                        </div>
                      </div>
                      <div className="Col-lg-33 Col-md-2 Col-sm-1">
                        <div className="form-group">
                          <i className="far fa-envelope"></i>

                          <input
                            className="myInput IP"
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={register.email}
                            onChange={registerChange}
                            placeholder="Email"
                          />
                        </div>{" "}
                      </div>
                      <div className="Col-lg-33 Col-md-2 Col-sm-1">
                        <div className="form-group">
                          <i className="fas fa-phone"></i>

                          <input
                            className="myInput IP"
                            required
                            type="tel"
                            name="phone"
                            id="phone"
                            onChange={registerChange}
                            value={register.phone}
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                      <div className="Col-lg-33 Col-md-2 Col-sm-1">
                        <div className="form-group">
                          <i className="fas fa-user"></i>

                          <input
                            className="myInput IP"
                            required
                            id="username"
                            type="text"
                            name="username"
                            onChange={registerChange}
                            value={register.username}

                            placeholder="Username"
                          />
                        </div>
                      </div>
                      <div className="Col-lg-33 Col-md-2 Col-sm-1">
                        <div className="form-group">
                          <i className="fas fa-lock"></i>
                          <input
                            onChange={registerChange}
                            required
                            value={register.password}
                            className="myInput"
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                          />
                        </div>
                      </div>
                      <div className="Col-lg-33 Col-md-2 Col-sm-1">
                        <div className="form-group">
                          <i className="fas fa-lock"></i>
                          <input
                            required
                            value={register.repassword}
                            onChange={registerChange}
                            className="myInput"
                            type="password"
                            placeholder="Retype Password"
                            id="repassword"
                            name="repassword"
                          />
                        </div>
                      </div>

                    </div>
                    <input
                      type="submit"
                      className="butt"
                      name=""
                      value="Submit"
                    />

                    <br />

                    <button onClick={changeView} className="butt">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {err.status && <SnackBar text={err.message} />}
    </div>
    <br />
    <div className="vision">
      <h4 className="visionHead">

        Alumni Platform Vision
      </h4>
      A platform to bridge the gap of student – alumni interaction driven by the ideals and values that shall ensure the upliftment of both present and future alumnus.
    </div>
    <br />
    <h3 className="headAlumini">------- Our Notable Alumini -------</h3>
    <div className="aluminisection">
      <div className="card">
        <img src={a1} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a2} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a3} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a4} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a5} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a6} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a7} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a8} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a9} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a10} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a11} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a12} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a13} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a14} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>
      <div className="card">
        <img src={a15} class="card-img-top" alt="..." />
        <div className="card-body">
        </div>
      </div>



    </div>
    <footer>
      <div className="footer">
        <div className="row">
          <a href="#"><i class="fa fa-facebook"></i></a>
          <a href="#"><i class="fa fa-instagram"></i></a>
          <a href="#"><i class="fa fa-youtube"></i></a>
          <a href="#"><i class="fa fa-twitter"></i></a>
        </div>

        <div className="row">
          <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        <div className="row">
          GCOEA Copyright © 2023 GCOEA - All rights reserved
        </div>
      </div>
    </footer>
  </div>
  );
}

export default Login;
