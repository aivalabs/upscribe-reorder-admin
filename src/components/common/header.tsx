export default function Header() {
   return (
      <header className="header border-bottom border-secondary py-2">
         <div className="d-flex justify-content-between align-items-center">
            <div className="logo"><h2 className=".h2">Upscribe Reorders</h2></div>
            <div className="nav-links">
               <ul className="d-flex align-items-center justify-content-between">
                  <li className="px-3"><a href="/">Analytics</a></li>
                  <li className="px-3"><a href="/custom-apps">Custom Apps</a></li>
               </ul>
            </div>
         </div>
      </header>
   );
};