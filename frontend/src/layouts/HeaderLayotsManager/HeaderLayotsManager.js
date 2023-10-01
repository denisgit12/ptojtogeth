import {Outlet, useLocation, useNavigate} from "react-router-dom";

import {HeaderManager} from "../../components";

const HeaderLayotsManager = () => {
    const accessToken =  localStorage.getItem('access')
    const navigate = useNavigate();

    const location = useLocation();
    const manager = localStorage.getItem('manager');

    if (!accessToken && manager === null){
        setTimeout(() => navigate('/login'),10);
    }

    return (
        manager === "manager" && location.pathname === "/manager" ?
                accessToken
                    ? <div>
                        <HeaderManager/>
                        <Outlet/>
                    </div>
                    :
                    setTimeout(()=>navigate('/login'), 10)
        : manager === "admin" && setTimeout(()=>navigate('*'), 10)

    );
};

export {HeaderLayotsManager};