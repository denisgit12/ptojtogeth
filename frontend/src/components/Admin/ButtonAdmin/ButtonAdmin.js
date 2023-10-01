import css from './ButtonAdmin.module.css'

const ButtonAdmin = ({active, setActive, word}) => {
    const log = () => {
        active?
            setActive(false)
            :
            setActive(true)
    }

    return (
        <div>
            <button className={css.button} onClick={() => log()}>
                <span></span>
                <span></span>
                <span></span>
                <span></span> {word}
            </button>
        </div>
    );
};

export {ButtonAdmin};