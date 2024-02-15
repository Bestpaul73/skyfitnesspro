import React from "react";
import { useParams } from "react-router-dom";
import { courses } from "./MocData";
import style from "./Workout.module.scss";
import { Logo } from "../../UI/Logo/Logo";
import { Button } from "../../UI/Button/Button";
import phone from "./phone.png";

export const Workout = () => {
  const params = useParams();
  const course = courses.find((course) => course.nameEN === params.id);
  return (
    <div className={style.container}>
      <header>
        <Logo className={style.logo} />
      </header>
      <main>
        <section className={style.workoutCard}>
          <h1 className={style.workoutCard_title}>{course.nameRU}</h1>
        </section>
        <section className={style.fitting}>
          <h2 className={style.section_title}>Подойдет для вас, если:</h2>
          <div className={style.fitting_textBox}>
            {course.fitting.map((el) => {
              return (
                <div className={style.criterion}>
                  <div className={style.criterion_counter}>
                    <p className={style.criterion_counterText}>
                      {" "}
                      {course.fitting.indexOf(el) + 1}
                    </p>
                  </div>
                  <div className={style.criterion_text}>
                    <p className={style.basicText}>{el}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className={style.directions}>
          <h2 className={style.section_title}>Направления:</h2>
          <div className={style.directions_textBox}>
            {course.directions.map((el) => {
              return (
                <p className={style.basicText}>
                  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{el}
                </p>
              );
            })}
          </div>
        </section>
        <p className={style.workoutDescription}>
          &nbsp;&nbsp;&nbsp;{course.description}
        </p>
        <section className={style.feedback}>
          <p className={style.feedback_text}>
            Оставьте заявку на пробное занятие, мы свяжемся <br /> с вами,
            поможем с выбором направления и тренера, с которым тренировки
            принесут здоровье и радость!
          </p>
          <Button children={"Записаться на тренировку"} />
          <img src={phone} alt="" className={style.feedback_img} />
        </section>
      </main>
    </div>
  );
};
