import * as React from "react";
import {
   Link,
   NavLink
 } from "react-router-dom";
export default function Header() {
   return (
      <header className="header border-bottom border-secondary py-2">
         <div className="d-flex justify-content-between align-items-center">
            <div className="logo"><h2 className=".h2"><Link to="/" >Upscribe Reorders</Link></h2></div>
            <div className="nav-links">
               <ul className="d-flex align-items-center justify-content-between">
                  <li className="px-3">
                     <NavLink
                        to="/">
                        Analytics
                     </NavLink>
                  </li>
                  <li className="px-3">
                     <NavLink
                        to="/custom-apps"
                     >
                        Custom Apps
                     </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </header>
   );
};