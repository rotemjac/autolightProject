// // import React from "react";
// // import logo from './logo.svg';
// // import './App.css';
// //
// // function App() {
// //   const [data, setData] = React.useState(null);
// //
// //   React.useEffect(() => {
// //     fetch("/api")
// //         .then((res) => res.json())
// //         .then((data) => setData(data.message));
// //   }, []);
// //
// //   return (
// //       <div className="App">
// //         <header className="App-header">
// //           <img src={logo} className="App-logo" alt="logo" />
// //           <p>{!data ? "Loading..." : data}</p>
// //         </header>
// //       </div>
// //   );
// // }
// //
// // export default App;
//
//
//
// import React from "react";
// // import logo from './logo.svg';
// import { useSelector } from 'react-redux';
// import './App.css';
// import { BrowserRouter, Route, Link } from 'react-router-dom'
// import WarningLightsScreen from './screens/HomeScreen';
// import './screens/HomeScreen.css';
// import SigninScreen from './screens/SigninScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import IdentifyWarningLightsInDashboardScreen from './screens/IdentifyWarningLightsInDashboardScreen';
// import IdentificationResultsScreen from "./screens/IdentificationResultsScreen";
//
//
// function App() {
//   // const [data, setData] = React.useState(null);
//
//   // React.useEffect(() => {
//   //   fetch("/api")
//   //       .then((res) => res.json())
//   //       .then((data) => setData(data.message));
//   // }, []);
//
//
//     const userSignin = useSelector(state => state.userSignin);
//     const { userInfo } = userSignin;
//
// /*    const openMenu = () => {
//         document.querySelector(".sidebar").classList.add("open");
//     }
//     const closeMenu = () => {
//         document.querySelector(".sidebar").classList.remove("open")
//     }*/
//
//   return (
//       <BrowserRouter>
//
//           {/*//Todo navbar as diffrernt component ?*/}
//
//           {/*<div className="grid-container">*/}
//           {/*    <header className="header">*/}
//           {/*        <div className="brand">*/}
//           {/*            <button onClick={openMenu}>*/}
//           {/*                &#9776;*/}
//           {/*            </button>*/}
//           {/*            /!*<Link to="/" >amazona</Link>*!/*/}
//           {/*        </div>*/}
//           {/*        <div className="header-links">*/}
//           {/*            <a href="cart.html">Cart</a>*/}
//           {/*            <a href="signin.html">Sign In</a>*/}
//           {/*        </div>*/}
//           {/*    </header>*/}
//           {/*    <aside className="sidebar">*/}
//           {/*        <h3>Shopping Categories</h3>*/}
//           {/*        <button className="sidebar-close-button" onClick={closeMenu}>x</button>*/}
//           {/*        <ul>*/}
//           {/*            <li>*/}
//           {/*                <a href="index.html">Pants</a>*/}
//           {/*            </li>*/}
//
//           {/*            <li>*/}
//           {/*                <a href="index.html">Shirts</a>*/}
//           {/*            </li>*/}
//
//           {/*        </ul>*/}
//           {/*    </aside>*/}
//               <main className="main">
//                   <div className="content">
//                       <Route path="/signin" component={SigninScreen} />
//                       <Route path="/" exact={true} component={WarningLightsScreen} />
//                       <Route path="/register" component={RegisterScreen} />
//                       <Route path="/identifyWarningLightsInDashboard" component={IdentifyWarningLightsInDashboardScreen} />
//                       <Route path="/identificationResults" component={IdentificationResultsScreen} />
//                   </div>
//
//               </main>
//               {/*<footer className="footer">*/}
//               {/*    All right reserved.*/}
//               {/*</footer>*/}
//           {/*</div>*/}
//       </BrowserRouter>
//   );
// }
//
// export default App;
//
//
//


import React from "react";
// import logo from './logo.svg';
import {useSelector} from 'react-redux';
import './App.css';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import WarningLights from './screens/WarningLights';
import SigninScreen from './screens/SigninScreen';
import MenuScreen from './screens/MenuScreen';
import HomeScreen from './screens/HomeScreen';
import Favorites from './screens/Favorites';

function App() {


    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open")
    }

    return (
        <BrowserRouter>
            <main className="main">

                <MenuScreen/>

            </main>
        </BrowserRouter>
    );
}

export default App;



