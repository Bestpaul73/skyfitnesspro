import style from "./Button.module.scss";


/**
 * Компонент фиолетовой кнопки,
 * принимает
 * @param children - текст кнопки
 * @param onClick - событие при клике
 */

export const Button = ({children, onClick }) => {
  return (
      <button onClick={onClick} className={style.button} >
        {children}
      </button>
  );
};