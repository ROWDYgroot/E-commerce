// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../../firebase";
// import SearchBar from "../Search/SearchBar";
// import "./Navbar.css";
// import blank from "./blank.png";

// const Navbar = (props) => {
//   const location = useLocation();
//   const { pathname } = location;

//   const isLoginPage = pathname === "/";
//   const isSignupPage = pathname === "/signup";

//   const isLoggedIn = !!props.name;

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.log("Error while logging out:", error);
//     }
//   };

//   const history = useNavigate();
//   const handleDeleteAccount = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
//     if (confirmed) {
//       try {
//         // Call the Firebase API to delete the user account
//         await auth.currentUser.delete();
        
//         // After deleting the account, you can redirect the user to the login page or perform any other necessary actions.
//         // For example, you can redirect the user to the login page after account deletion:
//         history("/");
//       } catch (error) {
//         console.log("Error while deleting account:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid mx-3 px-0">
//           <Link className="navbar-brand" to="/home">
//             Navbar
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse justify-content-between"
//             id="navbarSupportedContent"
//           >
//             <ul className="navbar-nav mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active"
//                   aria-current="page"
//                   to="/home"
//                 >
//                   Home
//                 </Link>
//               </li>
//             </ul>
//             {!isLoginPage && !isSignupPage && <SearchBar />}
//             <ul className="navbar-nav">
//               <li className="nav-item dropdown">
//                 <Link
//                   to="none"
//                   className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   {isLoggedIn ? (
//                     <img
//                       src="https://avatars.githubusercontent.com/u/93363854?v=4"
//                       alt="mdo"
//                       width="32"
//                       height="32"
//                       className="rounded-circle"
//                       style={{ marginTop: "5px" }}
//                     />
//                   ) : (
//                     <img
//                       src={blank}
//                       alt="mdo"
//                       width="32"
//                       height="32"
//                       className="rounded-circle"
//                       style={{ marginTop: "5px" }}
//                     />
//                   )}
//                 </Link>
//                 <ul className="dropdown-menu text-small">
//                   <li>
//                     <Link className="dropdown-item">
//                       <span>
//                         {isLoggedIn && `Hello ${props.name}`}
//                       </span>
//                     </Link>
//                   </li>
//                   {!isLoggedIn && (
//                     <li>
//                       <Link className="dropdown-item" to="/">
//                         Login Please
//                       </Link>
//                     </li>
//                   )}
//                   {isLoggedIn && (
//                     <React.Fragment>
//                       <li>
//                         <Link className="dropdown-item" to="/setting" onClick={handleDeleteAccount}>
//                           Delete
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" to="/profile">
//                           Profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" to="/profile">
//                           Upload image
//                         </Link>
//                       </li>
//                       <li>
//                         <hr className="dropdown-divider" />
//                       </li>
//                       <li>
//                         <Link className="dropdown-item" onClick={handleLogout}>
//                           Logout
//                         </Link>
//                       </li>
//                     </React.Fragment>
//                   )}
//                 </ul>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/cart">
//                   <i className="bi bi-cart3"></i>
//                   <span className="cart-count">{props.cartItems.length}</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, firestore, storage } from "../../firebase";
import SearchBar from "../Search/SearchBar";
import "./Navbar.css";
import blank from "./blank.png";

const Navbar = (props) => {
  const location = useLocation();
  const { pathname } = location;

  const isLoginPage = pathname === "/";
  const isSignupPage = pathname === "/signup";

  const isLoggedIn = !!props.name;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error while logging out:", error);
    }
  };

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Upload the image file to Firebase Storage and get the download URL
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`profile_images/${file.name}`);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();

      // Update the user's profile image in Firestore (assuming you have a 'users' collection)
      const currentUser = auth.currentUser;
      if (currentUser) {
        await firestore.collection("users").doc(currentUser.uid).update({
          profileImage: downloadURL,
        });
      }

      // Update the profileImage state to reflect the new profile picture
      setProfileImage(downloadURL);
    } catch (error) {
      console.log("Error while uploading image:", error);
    }
  };

  const history = useNavigate();
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        // Call the Firebase API to delete the user account
        await auth.currentUser.delete();

        // After deleting the account, you can redirect the user to the login page or perform any other necessary actions.
        // For example, you can redirect the user to the login page after account deletion:
        history("/");
      } catch (error) {
        console.log("Error while deleting account:", error);
      }
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mx-3 px-0">
          <Link className="navbar-brand" to="/home">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
            </ul>
            {!isLoginPage && !isSignupPage && <SearchBar />}
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  to="none"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {isLoggedIn ? (
                    <img
                      src={profileImage || "URL_TO_DEFAULT_IMAGE"}
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                      style={{ marginTop: "5px" }}
                      onClick={() => fileInputRef.current.click()}
                    />
                  ) : (
                    <img
                      src={blank}
                      alt="mdo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                      style={{ marginTop: "5px" }}
                    />
                  )}
                </Link>
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link className="dropdown-item">
                      <span>{isLoggedIn && `Hello ${props.name}`}</span>
                    </Link>
                  </li>
                  {!isLoggedIn && (
                    <li>
                      <Link className="dropdown-item" to="/">
                        Login Please
                      </Link>
                    </li>
                  )}
                  {isLoggedIn && (
                    <React.Fragment>
                      <li>
                        <Link className="dropdown-item" to="/setting" onClick={handleDeleteAccount}>
                          Delete
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Upload image
                        </Link>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </React.Fragment>
                  )}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className="bi bi-cart3"></i>
                  <span className="cart-count">{props.cartItems.length}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
