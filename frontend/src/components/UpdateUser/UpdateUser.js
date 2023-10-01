import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {ordersAction} from "../../redux/slices/orders.slice";
import {groupAction} from "../../redux/slices/group.slice";
import {useLocation, useSearchParams} from "react-router-dom";
import {ordersService} from "../../services";

const UpdateUser = ({active, setModalActive, order,page, search, setOrder, orders:orde, ord, setOrderPage, setPage}) => {

    const {reset, register, setValue, formState:{isValid}} = useForm(
        {mode:"all"}

    );
    const {groups} = useSelector(state => state.groups);

    const [activeGroup, setActiveGroup] = useState(true);
    const [groupValue, setGroupValue] = useState('');

    const [searchName, setSearchName] = useState(null);
    const [searchAge, setSearchAge] = useState(null);
    const [searchAlready_paid, setSearchAlready_paid] = useState(null);
    const [searchCourse, setSearchCourse] = useState(null);
    const [searchCourse_format, setSearchCourse_format] = useState(null)
    const [searchCourse_type, setSearchCourse_type] = useState(null);
    const [searchEmail, setSearchEmail] = useState(null);
    const [searchGroup, setSearchGroup] = useState(null);
    const [searchPhone, setSearchPhone] = useState(null);
    const [searchStatusm, setSearchStatus] = useState(null);
    const [searchSum, setSearchSum] = useState(null);
    const [searchSurname, setSearchSurname] = useState(null);


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

        useEffect(() => {
            if (order){
            setValue("email", order.email, {shouldValidate: true})
            setValue("name", order.name, {shouldValidate: true})
            setValue("surname", order.surname, {shouldValidate: true})
            setValue("already_paid", order.already_paid, {shouldValidate: true})
            setValue("phone", order.phone, {shouldValidate: true} )
            setValue("sum", order.sum, {shouldValidate: true} )
            setValue("course_format", order.course_format, {shouldValidate: true})
            setValue("course", order.course, {shouldValidate: true} )
            setValue("age", order.age, {shouldValidate: true})
            setValue("group", order.group, {shouldValidate: true} )
            setValue("status", order.status, {shouldValidate: true} )
            setValue("course_type", order.course_type, {shouldValidate: true})
        }
    },[order, setValue, ageQuery])

    const dispatch = useDispatch();
    const user = {};


    const create = (e) =>{
        e.preventDefault();

        const form = e.target;

        const queryName = form.name.value;
        const querySurname = form.surname.value;
        const queryEmail = form.email.value;
        const queryPhone = form.phone.value;
        const queryAge = form.age.value;
        const queryCourse = form.course.value;
        const queryCourse_format = form.course_format.value;
        const queryCourse_type = form.course_type.value;
        const queryStatus = form.status.value;
        const queryGroups = form.groups.value;
        const queryAlready_paid = form.already_paid.value;
        const querySum = form.sum.value;

        if (queryAge.length) user.age = +queryAge;
        if (queryAlready_paid.length) user.already_paid = +queryAlready_paid;
        if (queryCourse.length) user.course = queryCourse;
        if (queryCourse_format.length) user.course_format = queryCourse_format;
        if (queryCourse_type.length) user.course_type = queryCourse_type;
        if (queryEmail.length) user.email = queryEmail;
        if (queryGroups.length) user.group = queryGroups;
        if (queryName.length) user.name = queryName;
        if (queryPhone.length) user.phone = queryPhone;
        if (queryStatus.length) user.status = queryStatus;
        if (querySum.length) user.sum = +querySum;
        if (querySurname.length) user.surname = querySurname;
        console.log(params);
         if (search){

            dispatch(ordersAction.updateOrder({id: order.id, value: user, page, query:search}));

        }
        else if (search === '') {
            console.log(params)
            dispatch(ordersAction.updateOrder({id:order.id, value: user}));
             ordersService.getBySearch(page, params.name, params.surname, params.email, params.phone, params.age, params.course,
                 params.course_format, params.course_type, params.status, params.groups, params.startDate, params.endDate

             ).then(({data})=>{
                 setPage(data.page);
                 setOrderPage(data.totalPages)

                 setOrder(data.data);
             })
            if (orde === undefined && ord.length){

                ordersService.getBySearch(page, params.name, params.surname, params.email, params.phone, params.age, params.course,
                    params.course_format, params.course_type, params.status, params.groups, params.startDate, params.endDate

                ).then(({data})=>{
                    setPage(data.page);
                    setOrderPage(data.totalPages)

                    setOrder(data.data);
                })
                console.log(4)
}
            // console.log(parseInt(location.search?.split('=')[1]?.split('&')[0]));
            }
        setModalActive(false)
        // console.log(user);
    };
    const output = () => {
        setModalActive(false);
        reset();
    };

    const addGroup = () => {
        dispatch(groupAction.addGroups({name: groupValue}));
        setActiveGroup(true);

    };
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => output()}>
            <div className="modalContentUpd" onClick={e => e.stopPropagation()}>
                <form className={'formUpt'} onSubmit={create}>

                    <div className='boxInp'>
                        <span>Email</span>
                        <input className={ "inputUpd"} type="text" name={"email"} onChange={e => setSearchEmail(e.target.value)} placeholder={"Email"}
                               {...register("email",{
                                   required: false,
                               })}
                        />
                    </div>

                    <div className='boxInp'>
                        <span>Name</span>
                        <input className={ "inputUpd"} type="text"
                               name={"name"} onChange={e => setSearchName(e.target.value)} placeholder={"Name"}
                               {...register("name", {
                                 min:2,
                                 max:25,
                                required: false
                        })}
                        />
                    </div>

                    <div className='boxInp'>
                        <span>Already paid</span>

                        <input required={false}

                               className={ "inputUpd"}
                               type="text" placeholder={"Already paid"}
                               name={"already_paid"}
                                onChange={e => setSearchAlready_paid(e.target.value)}

                               {...register("already_paid",{
                                   valueAsNumber: true,
                                   max:100000,
                                   required:false
                               })}
                        />
                    </div>

                    <div className='boxInp'>
                        <span>Surname</span>
                        <input required={false}
                               className={ "inputUpd"}
                               name={'surname'} onChange={e => setSearchSurname(e.target.value)}
                               type="text" placeholder={"Surname"} {...register("surname",{
                                   min:2,
                                   max:25,
                                   required:false
                        })}
                        />
                    </div>

                    <div className='boxInp'>
                        <span>Sum</span>
                        <input required={false}
                               className={ "inputUpd"}
                               name={'sum'} onChange={e => setSearchSum(e.target.value)}
                               type="number" placeholder={"Sum"} {...register("sum", {
                                   valueAsNumber: true,
                                   max: 100000,
                                   required:false
                        })}
                        />
                    </div>
                    <div className='boxInp'>
                        <span>Phone</span>
                        <input required={false}
                               className={ "inputUpd"}
                               name={'phone'} onChange={e => setSearchPhone(e.target.value)}
                               type="text" placeholder={"Phone"} {...register("phone", {
                                   pattern:{
                                       value:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
                                   },
                                    required:false
                        })}
                        />
                    </div>

                    <div className='boxInp'>
                        <span>Age</span>
                        <input required={false}
                               className={ "inputUpd"}
                               name={'age'} onChange={e => setSearchAge(e.target.value)}
                               type="text" placeholder={"Age"} {...register("age", {
                                   valueAsNumber: true,
                                   min: 15,
                                   max:100,
                                   required: false,

                        })}
                        />
                    </div>

                    <div className='boxInp'>
                        <span>Course</span>

                        <select {...register("course", {
                            required: false
                        })}
                                name="course" onChange={e => setSearchCourse(e.target.value)}
                                className={'select'} >
                            <option value="">all courses</option>
                            <option value="FS">FS</option>
                            <option value="QACX">QACX</option>
                            <option value="JCX">JCX</option>
                            <option value="JSCX">JSCX</option>
                            <option value="FE">FE</option>
                            <option value="PCX">PCX</option>

                        </select>
                    </div>

                    <div className='boxInp'>
                        <span>Course format</span>

                        <select {...register("course_format", {
                            valueAsNumber: false,
                            required: false
                        })}
                                name="course_format" onChange={e => setSearchCourse_format(e.target.value)}
                                className={'select'} >
                            <option value="">all formats</option>
                            <option value="static">static</option>
                            <option value="online">online</option>
                        </select>
                    </div>

                    <div className='boxInp'>
                        <span>Course type</span>

                        <select {...register("course_type", {
                            required: false,
                            valueAsNumber: false
                        })}
                                name="course_type" onChange={e => setSearchCourse_type(e.target.value)}
                                className={'select'} >
                            <option value="">all course type</option>
                            <option value="pro">pro</option>
                            <option value="minimal">minimal</option>
                            <option value="premium">premium</option>
                            <option value="vip">vip</option>
                            <option value="incubator">incubator</option>
                        </select>
                    </div>

                    <div className='boxInp'>
                        <span>Status</span>

                        <select {...register("status", {
                            required: false
                        })}
                                name="status" onChange={e => setSearchStatus(e.target.value)}
                                className={'select'} >
                            <option value="">all status</option>
                            <option value="In work">In work</option>
                            <option value="New">new</option>
                            <option value="Agree">agree</option>
                            <option value="Disagree">disagree</option>
                            <option value="Dubbing">dubbing</option>
                        </select>

                    </div>

                    <div className='boxInp'>
                        <span>Groups</span>
                        {activeGroup ?
                            <div>
                                <select required={false} {...register("group", {
                                    required: false,
                                    max:25,
                                    min: 25
                                })}
                                        name="groups"  onChange={e => setSearchGroup(e.target.value)}
                                        className={'select'}  >
                                    <option  value="">all groups</option>
                                    {
                                        groups.map(group => <option  key={group.id}>{group.name}</option>)
                                    }
                                </select>
                                <div onClick={()=>setActiveGroup(false)} className='group'>Add group</div>
                            </div>

                            :<div>

                                <input name={'group'}
                                       onChange={(e)=> setGroupValue(e.target.value)}
                                       className={ "inputUpd"}
                                       type="text" placeholder={"Group"}
                                />
                                <div className='boxGroupAdd'>
                                    <div onClick={()=>addGroup()} className='addGroup'>Add</div>
                                    <div className='addGroup' onClick={()=>setActiveGroup(true)}>Select</div>

                                </div>

                            </div>
                        }

                    </div>


                    {isValid ?
                        <center>
                            <button className={'buttManOk'}>
                                Update
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

export {UpdateUser};