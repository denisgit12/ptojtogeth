import css from '../Comments/Comment.module.css'

const Comment = ({comment}) => {

    const {text, author, created_at} = comment;

    let strings = '';
    let creatCar = '';
    let creatCarDay = '';

    if (comment.created_at){
        strings = created_at.split('-').slice(0,2);

        creatCar = created_at.split('-').slice(0,3);
        const arr = creatCar.splice(2,1);
        creatCarDay = arr[0].split('').splice(0,2)

    }

    return (
        <div >
            <div className={css.comment}>
                <h3 className={css.boxText} >{text}</h3>
                <h3 className={css.author}>{author} {created_at ?
                    `${strings[0]}-${strings[1]}-${creatCarDay[1]}${creatCarDay[0]}`
                    : 'null'}</h3>
            </div>

            <div className={css.hr}>

            </div>
        </div>
    );
};

export {Comment};