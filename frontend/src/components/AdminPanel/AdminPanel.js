import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import css from './AdminPanel.module.css';
import {ManagerDescription} from "../Admin/ManagerDescription/ManagerDescription";
import {ButtonAdmin} from "../Admin/ButtonAdmin/ButtonAdmin";
import {managerAction} from "../../redux/slices/manager.slice";
import {authAction} from "../../redux/slices/auth.slice";
import {managerService} from "../../services";

const AdminPanel = ({manager, setTotal,setInWork, setAgree}) => {

    const [active, setActive] = useState(true);
    const [cop, setCoty] = useState(false);

    const dispatch = useDispatch();

    const [statistic, setStatistic] = useState();

    useEffect(() => {

        managerService.getStatistic(manager.id).then(({data})=> {

            if (data?.total>=1){
                setTotal(prev=> prev === undefined ? data.total : prev + data.total)
            }
            if (data?.inWork>=1){
                setInWork(prev=> prev === undefined ? data.inWork : prev + data.inWork)
            }
            if (data?.agree>=1){
                setAgree(prev=> prev === undefined ? data.agree : prev + data.agree)
            }
            setStatistic(data)
        })
    },[manager]);

    const addPassword = () => {

        if (manager.is_active === false) {
            dispatch(authAction.addPassword({email: manager.email}))
            alert('We have send you a confirmation email');
        } else {
            setCoty(true)

            setTimeout(() => {
                setCoty(false)
            }, 3000)
        }
    }
    const ban = () => {

        setAgree(undefined);
        setTotal(undefined);
        setInWork(undefined);

        if (manager.status === "unbanned"){

            dispatch(managerAction.updateManager({id: manager.id, manager: {status: "banned", is_active: true}, page:1}))
        }

    };

    const unban = () => {

        setAgree(undefined);
        setTotal(undefined);
        setInWork(undefined);

        if (manager.status === "banned"){

            dispatch(managerAction.updateManager({id: manager.id, manager: {status: "unbanned", is_active: false}, page:1}))
        }

    };
    const forgotPass = () => {

        dispatch(authAction.forgotPassword({email: manager.email}))
        alert('We have send you a confirmation email');
    }
    return (
        <div className={css.headBox}>

            {active
                ?
                <div className={css.box }>
                    <ManagerDescription managerStatistic={statistic} manager={manager}/>
                    <div className={css.lie}></div>
                    <ButtonAdmin active={active} setActive={setActive} word={'Learn more...'}/>

                </div>
                :
                <div className={css.boxFalse}>

                    <ManagerDescription managerStatistic={statistic} manager={manager}/>
                    <div className={css.lieFalse}></div>

                    <div className={css.boxButton}>

                        <button onClick={() => addPassword()} className={css.button}>ADD PASSWORD</button>

                        {cop
                            ? <div className={css.copied}>
                                <div >This manager has a password </div>,
                                <div onClick={()=>forgotPass()} className={css.forgotPass}>Forgot password</div>
                            </div>
                            : <></>}

                        <button onClick={()=>ban()} className={css.button}>BAN</button>
                        <button onClick={()=>unban()} className={css.button}>ANBUN</button>

                    </div>

                    <div className={css.lie && css.lieFalse2}></div>
                    <ButtonAdmin active={active} setActive={setActive} word={'skip'}/>

                </div>
            }
        </div>

    );
};

export {AdminPanel};