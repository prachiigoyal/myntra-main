import React, { useEffect, useState } from "react";
import "./style.css";
import myntraLogo from "../../images/logo/myntra.png";
import profileIcon from "../../images/profile.png";
import wishlistIcon from "../../images/wishlist.png";
import qrIcon from "../../images/qr-code.png";
import inStores from "../../images/instores.png";
import { IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";

import MenuHeader from '../MenuHeader';

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // state cart value
  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
        <div><a href=""><img src={profileIcon} className="iconImage" alt="" /></a>
        <p className="iconTexts">Profile</p>
        </div>
        }
        menus={[
          { label: `Hello ${auth.user.firstName}`, href: "", icon: null },
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Contact Us", href: "", icon: null },
          { label: "Myntra Insider", href: "", icon: null },
          { label: "Myntra Credit", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Saved Cards", href: "", icon: null },
          { label: "Saved Addresses", href: "", icon: null },
          { label: "Edit Profile", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <div><a href=""><img src={profileIcon} className="iconImage" alt="" onClick={() => {
            setSignup(false);
            setLoginModal(true);
          }}/></a>
          <p className="iconTexts">Login</p>
        </div>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}

        firstMenu={
          <div className="firstmenu">
            <span>New Customer? </span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#FF527B", border:"1px solid #212121", padding:"5px 5px", width:"50px" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="">
            <img src={myntraLogo} className="logoimage" alt="" />
          </a>
        </div>
        {/* logo ends here */}
        
        <MenuHeader style={{margin:"0px"}} />

        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#333",
                }}
              />
            </div>
            <input
              className="searchInput"
              placeholder={"Search for products, brands and more"}
            />
          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <div>
            <a href=""><img src={wishlistIcon} className="iconImage" alt="" /></a>
            <p className="iconTexts">Wishlist</p>
          </div>
          <div>
            <a href="https://qrcodescan.in/"><img src={qrIcon} className="iconImage" alt="" /></a>
            <p className="iconTexts">Scan a QR</p>
          </div>
          <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
          </a>
          <div>
            <a href="https://hackerramp-myntra-locator.herokuapp.com/"><img src={inStores} className="iconImage" alt="" /></a>
            <p className="iconTexts">Find Nearby Stores</p>
          </div>
        </div>
        {/* right side menu ends here */}
      </div>
    </div>
  );
};

export default Header;
