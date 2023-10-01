import {Outlet, useNavigate} from "react-router-dom";
import {Header} from "../../components";

const HeaderLayots = () => {

    const accessToken =  localStorage.getItem('access')
    const navigate = useNavigate();

    const manager = localStorage.getItem('manager');

    if (!accessToken && manager === null){
       setTimeout(() => navigate('/login'),10);
    }

    return (
        manager === "admin" ?
            accessToken
                ? <div>
                    <Header/>
                    <Outlet/>
                </div>
                :
                setTimeout(()=>navigate('/login'), 10)
        : manager === "manager" && setTimeout(()=>navigate('*'), 10)

    );
};

export {HeaderLayots};