import css from './Loader.module.css'

const Loader = () => {
    return (
        <div className={css.boxLoader}>
            <div className={css.loader}>
                <div className={css.loaderCircle}></div>
                <div className={css.loaderCircle}></div>
                <div className={css.loaderCircle}></div>
                <div className={css.loaderCircle}></div>
                <div className={css.loaderCircle}></div>
            </div>
        </div>
    );
};

export {Loader};