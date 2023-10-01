import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import css from './Login.module.css'
import {loginValidator} from "../../validators";
import {useState} from "react";
import {authService} from "../../services";
import {authAction} from "../../redux/slices/auth.slice";

const LoginPage = () => {
    const {handleSubmit, register, reset, formState:{errors, isValid} } = useForm(
        {mode:"onTouched", resolver: joiResolver(loginValidator)}
    )

    const location = useLocation();

    const navigate = useNavigate();
    const access = authService.getAccessToken();

    const dispatch = useDispatch();

        if (location.pathname !== "/login" ){
            navigate("/login")
        }
    const [error, setError] = useState(null);


    if (access){

        if (localStorage.getItem('manager') === "manager"){
            setTimeout(()=> navigate('/manager'), 10 )

        }else if (localStorage.getItem('manager') === "admin"){
           setTimeout(()=> navigate('/orders'), 10 )

        }
       }

    const login = async (cred) => {

        try {
            setTimeout(()=>setError("Email or password is incorrect"),700)

            await dispatch(authAction.login(cred));

            if (cred.email === "admin@gmail.com"){
                navigate("/orders")
                localStorage.setItem('manager', "admin")
            } else {
                navigate("/manager");
                localStorage.setItem('manager', "manager")

            }

        }catch (e) {
            if (e.response.status === 401){
                setError(e.response.data.message);

            }
        }

        reset()

    }
    return (
        <div className={css.box}>
            <div className={css.loginBox}>

                {error
                    ? <h2>{error}</h2>
                    :<h2>Login Form</h2>
                }


                <form onSubmit={handleSubmit(login)}>
                    <div className={css.userBox}>
                        <input type="text" {...register("email")}/>

                        {error ?
                            <label>Invalid email </label>
                            : errors.email ? <span>{errors.email.message}</span> : <label>email</label>
                        }
                    </div>
                    <div className={css.userBox}>
                        <input type="password" {...register("password")}/>

                        {error ?
                            <label>Invalid password </label>
                            : errors.password ? <span>{errors.password.message}</span> : <label>password</label>
                        }

                    </div>

                    {isValid ? <button className={css.a}>Login</button> :
                        <button className={css.button}>
                            <p>is not valid!</p>
                        </button>}

                </form>

            </div>
        </div>

    );
};

export {LoginPage};