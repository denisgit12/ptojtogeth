import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Pagination, PaginationItem, Stack} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

import {managerAction} from "../../redux/slices/manager.slice";
import {Loader} from "../Loader/Loader";
import css from './AdminPanel.module.css'
import {AdminPanel} from "../AdminPanel/AdminPanel";
import {ModalCreate} from "../ModalCreate/ModalCreate";

const AdminsPanel = () => {

    const location = useLocation();

    const [length, setLength] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const [loader, setLoader] = useState(true);

    const [manager, setManager] = useState();

    const [pageQty, setPageQty] = useState(0);
    const [page, setPage] = useState(parseInt(location.search?.split('=')[1]?.split('&')[0] || 1));

    const [total, setTotal] = useState();
    const [inWork, setInWork] = useState();
    const [agree, setAgree] = useState();

    const dispatch = useDispatch();

    const {managers} = useSelector(state => state.managers);


    setTimeout(()=>{
        setManager(managers.data);

        setPageQty(managers.totalPages);
        setLength(managers.totalCount);
    },10)


    useEffect(() => {
        setLoader(true)
        dispatch(managerAction.getManagers({page}));


        setTimeout(()=>setLoader(false), 1000);

        setInWork(undefined);
        setTotal(undefined);
        setAgree(undefined);

    }, [dispatch, managers.totalCount, managers.totalPages, page ]);


    let banned = [];
    let unbanned = [];
    let is_activeFalse = [];
    let is_activeTrue = [];


    if (manager !== undefined){
            banned = manager.filter(manager => manager.status === "banned");
            unbanned = manager.filter(manager => manager.status === "unbanned");
            is_activeFalse = manager.filter(manager => manager.is_active === false);
            is_activeTrue =  manager.filter(manager => manager.is_active === true);

    }
    return (
        <div className={css.box}>

            <div className={css.adminPanelBox}>

                <div className={css.ordersBox}>
                    <h3 className={css.order}>Orders statistic</h3>
                </div>

                <div  className={css.totalBox}>
                    <div onClick={() => setModalActive(true)} className={css.create}>
                        <div>create</div>
                    </div>

                    <div className={css.totalBox}>
                        {
                           total >=1 && <div className={css.total}>total: {total}</div>
                        }
                        {
                            inWork >= 1 && <div className={css.total}>In work: { inWork}</div>
                        }
                        {
                            agree >= 1 && <div className={css.total}>Agree: {agree}</div>
                        }

                        <div className={css.total}>Banned: {banned.length}</div>
                        <div className={css.total}>Unbanned: {unbanned.length}</div>
                        <div className={css.total}>Is active: {is_activeFalse.length}False</div>
                        <div className={css.total}>Is active: {is_activeTrue.length}True</div>
                    </div>

                </div>

                <ModalCreate active={modalActive} setModalActive={setModalActive}/>

                <div>
                    {
                        loader
                            ?<div className={css.boxLoader}><Loader/></div>
                            : managers.data && managers.data.map((manager )=> <AdminPanel setAgree={setAgree} setInWork={setInWork} setTotal={setTotal} key={manager.id} length={length} manager={manager}/>)
                    }
                </div>
                <div className={css.conteiner}>
                    <Container>
                        <Stack spacing={2}>
                            {
                                !!pageQty && (<Pagination
                                    sx={{marginY:3, marginX: "auto"}}
                                    count={pageQty}
                                    page={page}
                                    showFirstButton
                                    showLastButton
                                    onChange={(_, num) => setPage(num)}
                                    renderItem={
                                        (item) =>(
                                            <PaginationItem
                                                component={Link}
                                                to={`/adminPanel?page=${item.page}`}
                                                {...item}
                                            />
                                        )
                                    }
                                />)
                            }

                        </Stack>
                    </Container>
                </div>

            </div>

        </div>

    );
};

export {AdminsPanel};