import Headroom from 'react-headroom'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CiLogout} from 'react-icons/ci'
import {ImCogs} from 'react-icons/im'

import css from './Header.module.css';
import img from '../img/img.png'

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/')

    }

    const navigat = () =>{
        if (location.pathname === "/adminPanel"){
            navigate('/orders')

        }
    }

    return (
        <div className={css.headBox}>

            <Headroom className={css.headroom}>
                <header className={css.header}>

                    {/*<NavLink to={"/orders"}>*/}
                        <img onClick={()=>navigat()} className={css.logo} src={img} alt="Logo"/>
                    {/*</NavLink>*/}
                    <div>
                        <NavLink to={'/adminPanel'}>
                            <ImCogs className={css.cogs}/>
                        </NavLink>

                        <CiLogout onClick={logOut} className={css.logout}/>

                    </div>

                </header>
            </Headroom>

        </div>


    );
};

export {Header};