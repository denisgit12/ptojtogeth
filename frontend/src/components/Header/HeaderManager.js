import {NavLink, useNavigate} from "react-router-dom";
import {CiLogout} from "react-icons/ci";
import Headroom from "react-headroom";

import css from "./Header.module.css";
import img from "../img/img.png";

const HeaderManager = () => {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/')

    }
    return (
        <div className={css.headBox}>

            <Headroom className={css.headroom}>
                <header className={css.header}>

                    <NavLink to={"/manager"}>
                        <img className={css.logo} src={img} alt="Logo"/>
                    </NavLink>
                    <div>


                        <CiLogout onClick={logOut} className={css.logout}/>

                    </div>

                </header>
            </Headroom>

        </div>
    );
};

export {HeaderManager};