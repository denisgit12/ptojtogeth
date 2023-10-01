import {useEffect, useState} from "react";
import {useLocation, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {BiReset} from 'react-icons/bi'

import css from './Users.module.css'
import {ordersAction} from "../../redux/slices/orders.slice";
import {User} from "../User/User";
import {BlogFilter} from "../BlogFilter/BlogFilter";
import {groupAction} from "../../redux/slices/group.slice";
import {Loader} from "../Loader/Loader";

const UsersManager = () => {

    const location = useLocation();


    const [page, setPage] = useState(parseInt(location.search?.split('=')[1]?.split('&')[0] || 1));
    const [name, setName] = useState( location.search?.split('=')[2]?.split('+') || null)

    const [order, setOrder] = useState(null);
    const [orderPage, setOrderPage] = useState(null);


    const [pageQty, setPageQty] = useState(0);

    const [resetForm, setResetForm] = useState(false);

    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.orders);

    const [searchByName, setSearchByName] = useState(true );
    const [loader, setLoader] = useState(true );


    const [search, setSearch] = useState('');
    const [excel, setExcel] = useState(null );

    const [searchParams, setSearchParams] = useSearchParams();

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

    useEffect(() => {
        setLoader(true);

        dispatch(groupAction.getGroups());
        setPageQty(orders.totalPages);

        setTimeout(()=>setLoader(false), 1000);

        if (order === null){

            dispatch(ordersAction.getAll({page}));

        }

    }, [dispatch, orders.limit, orders.totalPages, page])

    const reset = async () => {
        setPage(1)
        setOrder(null);
        setSearchParams({page:1});
        setSearch('');
        setName(null)
        setOrderPage(null);

        await dispatch(ordersAction.getAll({page:1}));
        setSearchByName(true);

        setResetForm(true);
    }

    return (
        <div className={css.box}>

            <div className={css.usersBox}>
                <div className={css.pagin}>
                    <div>

                    </div>
                    <div className={css.boxBiReset} onClick={()=>reset()}><BiReset className={css.BiReset}/></div>
                    <div className={order === null? css.headBoxSearch : css.headBoxSearchOrder}>
                        <BlogFilter
                            setExcel={setExcel}
                            excel={excel}

                            searchByName={searchByName}
                            start_dateQuery={start_dateQuery}
                            end_dateQuery={end_dateQuery}
                            setResetForm={setResetForm}
                            resetForm={resetForm}
                            setPage={setPage}
                            orderPage={orderPage}
                            loader={loader}
                            order={order}
                            setOrderPage={setOrderPage}
                            pageQty={pageQty}
                            page={page}
                            setOrder={setOrder}
                            nameQuery={nameQuery}
                            setSearchParams={setSearchParams}
                            surnameQuery={surnameQuery}
                            emailQuery={emailQuery}
                            phoneQuery={phoneQuery}
                            ageQuery={ageQuery}
                            courseQuery={courseQuery}
                            course_formatQuery={course_formatQuery}
                            course_typeQuery={course_typeQuery}
                            statusQuery={statusQuery}
                            groupsQuery={groupsQuery}

                        />

                    </div>
                    <div >
                        { loader
                            ?<div className={css.boxLoader}><Loader/></div>
                            :order === null
                                ? orders.data && orders.data.map(order => <User orders={orders}  setOrderPage={setOrderPage} setPage={setPage}                            setOrder={setOrder}
                                                                                page={page} search={search} nameQur={name} key={order.id} order={order}/>)

                                :order && order.map(orde => <User setOrderPage={setOrderPage} setPage={setPage}
                                                                                               ord={order} setOrder={setOrder} page={page} search={search} nameQur={name} key={orde.id} order={orde}/>)}
                    </div>

                </div>

            </div>
        </div>
    );
};

export {UsersManager};