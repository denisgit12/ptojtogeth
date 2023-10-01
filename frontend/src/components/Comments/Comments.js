import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import css from './Comment.module.css'
import {Comment} from "../Comment/Comment";
import {ordersService} from "../../services";
import {ordersAction} from "../../redux/slices/orders.slice";
import {UpdateUser} from "../UpdateUser/UpdateUser";
import {useSearchParams} from "react-router-dom";

const Comments = ({page, id,search, nameQur, ord, setOrder, orders,setOrderPage, setPage}) => {

    const [comments, setComments] = useState('');
    const [modalActive, setModalActive] = useState(false);

    const [user, setUser] = useState('');

    const {reset, handleSubmit, register} = useForm();

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    const nameQuery = searchParams.get('name') || '';
    const surnameQuery = searchParams.get('surname') || '';
    const emailQuery = searchParams.get('email') || '';
    const phoneQuery = searchParams.get('phone') || '';
    const ageQuery = searchParams.get('age') || '';
    const courseQuery = searchParams.get('course') || '';
    const course_formatQuery = searchParams.get('course_format') || '';
    const course_typeQuery = searchParams.get('course_type') || '';
    const statusQuery = searchParams.get('status') || '';
    const groupsQuery = searchParams.get('groups') || '';

    const start_dateQuery = searchParams.get('start_date') || '';
    const end_dateQuery = searchParams.get('end_date') || '';

    const params= {};



    if (nameQuery.length) params.name = nameQuery;
    if (surnameQuery.length) params.surname = surnameQuery;
    if (emailQuery.length) params.email = emailQuery;
    if (phoneQuery.length) params.phone = phoneQuery;
    if (ageQuery.length) params.age = ageQuery;
    if (courseQuery.length) params.course = courseQuery;
    if (course_formatQuery.length) params.course_format = course_formatQuery;
    if (course_typeQuery.length) params.course_type = course_typeQuery;
    if (statusQuery.length) params.status = statusQuery;
    if (groupsQuery.length) params.groups = groupsQuery;
    //
    if (start_dateQuery?.length >= 2) params.startDate = start_dateQuery;
    if (end_dateQuery?.length >= 2) params.endDate = end_dateQuery;


    const submit = async (data) => {
        reset();
        await dispatch(ordersAction.postComments({id: id, comment: data, page}));

        ordersService.getAllComments(id).then(({data})=> setComments(data))
        ordersService.getBySearch(page, params.name, params.surname, params.email, params.phone, params.age, params.course,
            params.course_format, params.course_type, params.status, params.groups, params.startDate, params.endDate

        ).then(({data})=>{
            setPage(data.page);
            setOrderPage(data.totalPages)

            setOrder(data.data);
        })
    }

    useEffect(() => {
        ordersService.getAllComments(id).then(({data})=> setComments(data))
    },[ id])

    const update = async () => {
        setModalActive(true);
        await ordersService.getOneOrder(id).then(({data})=> setUser(data));
    }

    return (
        <div className={css.headBoxComment}>
            <div className={css.commentBox}>

                {Array.isArray(comments) && comments.map(comment=><Comment key={comment.id} comment={comment}/>)}


            </div>
            <div className={css.form}>
                <form onSubmit={handleSubmit(submit)}>
                    <input className={css.input} type="text" placeholder={'comment'} required={true} {...register('comment')}/>
                    <button
                        // disabled={order.manager !== null }
                        className={css.a}>Submit</button>
                </form>
            </div>
            <button
                onClick={() =>  update()} className={css.edit}>EDIT</button>
            <UpdateUser setOrderPage={setOrderPage} setPage={setPage} page={page} ord={ord} setOrder={setOrder} orders={orders} search={search} nameQur={nameQur} order={user} active={modalActive} setModalActive={setModalActive}/>

        </div>
    );
};

export {Comments};