import { Link, Outlet } from "react-router";
import clsx from "clsx";
import s from "./App.module.css";

function App() {
    return (
        <>
            <nav className={clsx(s.nav)}>
                <div className={s.navItem}>
                    <Link to="/products"> Products </Link>
                </div>
                <div className={s.navItem}>
                    <Link to="/cart"> Cart </Link>
                </div>
            </nav>
            {/* {!onlineStatus ? (
                <div>
                    You are currently offline. Connect to the Internet in order
                    to synchronize your cart.
                </div>
            ) : null} */}
            <div className={clsx(s.main)}>
                <Outlet />
            </div>
        </>
    );
}

export default App;
