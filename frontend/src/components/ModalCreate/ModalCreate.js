import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch} from "react-redux";

import {managerAction} from "../../redux/slices/manager.slice";
import {managerValidator} from "../../validators";
import './ModalCreate.css'

const ModalCreate = ({active,setModalActive}) => {

    const {reset, register, handleSubmit, formState:{errors, isValid}} = useForm(
        {mode:"all", resolver: joiResolver(managerValidator)}
    );

    const dispatch = useDispatch();

    const create = (manager) =>{
        console.log(manager);
        dispatch(managerAction.createManager({manager, page:1}))
        setModalActive(false)
        reset()
    }
    const output = () => {
        setModalActive(false)
        reset()
    }

    return (
        <div className={active ? "modal active" : "modal"} onClick={() => output()}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <form className={'form'} onSubmit={handleSubmit(create)}>
                    <input
                        className={ errors.email? "erInp input" :"input okInp"}
                        type="text" placeholder={'Email'} {...register("email")}
                    />
                    <input
                        className={ errors.name? "erInp input" :"input okInp"}
                        type="text" placeholder={"Name"} {...register("name")}
                    />
                    <input
                        className={ errors.surName? "erInp input" :"input okInp"}
                        type="text" placeholder={'Surname'} {...register("surname")}
                    />

                    {isValid ?
                        <center>
                            <button className={'buttManOk'}>
                                Create
                                <span></span>
                            </button>
                        </center>
                        :
                        <center>
                            <button className={"buttManEr"}>
                                Invalid
                                <span></span>
                            </button>
                        </center>
                    }

                </form>
            </div>
        </div>

    );
};

export {
    ModalCreate
};