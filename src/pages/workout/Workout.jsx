import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Workout.module.scss";
import { Logo } from "../../UI/Logo/Logo";
import { Button } from "../../UI/Button/Button";
import phone from "./phone.png";
import { WorkoutCardImg } from "./WorkoutCardImg/WorkoutCardImg";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

export const Workout = () => {
  const currentId = localStorage.getItem("userId");
  const params = useParams();
  const [course, setCourse] = useState();
  const [courseTemplate, setСourseTemplate] = useState(); //Шаблон текущего курса
  const [coursePurchased, setCoursePurchased] = useState(false); //Флаг куплен ли текущий курс
  const courses = useSelector((state) => state.coursesApp.allCourses); //Все курсы
  const courseTemplates = useSelector((state) => state.coursesApp.usersCourses); //Шаблоны всех курсов
  const currentUser = useSelector((state) => state.userApp.fullCurrentUser); //Текущий пользователь с базы
  const courseName = params.id;

  //Проверяю наличие текущего курса среди курсов пользователя
  useEffect(() => {
    if (currentUser) {
      const userCourses = Object.keys(currentUser[0]);
      // console.log(userCourses);
      if (userCourses.includes(courseName)) {
        setCoursePurchased(true);
      }
    }
  }, [currentUser, courseName]);

  useEffect(() => {
    if (courses) {
      setCourse(courses?.find((course) => course.nameEN === params.id)); //Находит текущий курс в базе курсов
      setСourseTemplate(
        courseTemplates?.find((template) => template.name === params.id) //Находит заготовку к текущему курсу в базе курсов
      );
    }
  }, [courses, params.id, courseTemplates]);

  const signUpForTraining = (courseName) => {
    //Отправляет шаблон купленного курса в пользователя
    setCoursePurchased(true);
    const db = getDatabase();
    set(ref(db, `users/${currentId}/courses/` + courseName), {
      name: courseTemplate.name,
      workouts: courseTemplate.workouts,
    });
  };

  return (
    <>
      {course && (
        <div className={style.container}>
          <header>
            <Logo className={style.logo} />
          </header>
          <main>
            <section className={style.workoutCard}>
              <h1 className={style.workoutCard_title}>{course.nameRU}</h1>
              <WorkoutCardImg worcout={course.nameEN} />
            </section>
            <section className={style.fitting}>
              <h2 className={style.section_title}>Подойдет для вас, если:</h2>
              <div className={style.fitting_textBox}>
                {course.fitting.map((el) => {
                  return (
                    <div
                      className={style.criterion}
                      key={course.fitting.indexOf(el) + 1}
                    >
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
                    <p className={style.basicText} key={el}>
                      &nbsp; &nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{el}
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
              {coursePurchased ? (
                <Link to={`/profile`}>
                  <Button
                    children={"Перейти к курсу"}
                    className={"button_blue"}
                  />
                </Link>
              ) : (
                <Button
                  children={"Записаться на тренировку"}
                  onClick={() => {
                    signUpForTraining(courseName);
                  }}
                  className={"button_blue"}
                />
              )}
              <img src={phone} alt="" className={style.feedback_img} />
            </section>
          </main>
        </div>
      )}
    </>
  );
};
