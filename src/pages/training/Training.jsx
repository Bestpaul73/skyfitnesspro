import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import style from './Training.module.scss';
import { Button } from '../../UI/Button/Button';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import { Header } from '../../components/header/Header';

import { getDatabase, ref, child, push, update } from "firebase/database";

export const Training = () => {
  const navigate = useNavigate();
  const currentId = localStorage.getItem("userId");
  const { courseId, id } = useParams(); // Получение значения параметров `id` `courseId` из URL
  // console.log(params);
  const workouts = useSelector((state) => state.coursesApp.allWorkouts);
  // console.log(workouts);
  const workout = workouts?.filter((data) => data._id.includes(id));

  const workoutName = workout ? workout[0].name : 'название не получено';
  const workoutVideo = workout ? workout[0].video : 'видео не найдено';
  const workoutExercises = workout && workout[0].exercises ? workout[0].exercises : null;
  // console.log(!!workoutExercises);

  const courses = useSelector((state) => state.coursesApp.allCourses);
  const currentWorkoutt = useSelector((state) => state.coursesApp.currentWorkout)
  // console.log(currentWorkoutt)
  const [currentWorkout, setCurrentWorkout] = useState(currentWorkoutt)
  console.log(currentWorkout);
  const course = courses?.filter((data) => data.nameEN.includes(courseId));
  const courseName = course ? course[0].nameRU : 'название не получено';
  const courseNameEN = course[0]?.nameEN;
  // console.log(course);

  const navigateToProgress = () => {
    navigate(`/${courseId}/training/${id}/progress`);
    // console.log(workoutExercises);
  };

  const completeWorkout = (currentWorkout) => {
    const a = {...currentWorkout}
    a.done = true
    setCurrentWorkout(a)
    submitСhanges(a)
  }


function submitСhanges(a) {
  const db = getDatabase();
  const updates = {};
  updates[`users/${currentId}/courses/${courseNameEN}/workouts/${a._id}`] = a;
  return update(ref(db), updates);
}

  return (
    <div className={style.container}>
      <Header />
      <main>
        <h1 className={style.nameTraining}>{courseName}</h1>
        <h2 className={style.dateLink}>{workoutName}</h2>
        {/* <ReactPlayer url={workoutVideo} width='100%' height='720px' /> */}

        <section className={style.resultSection}>
          {workoutExercises ? (
            <>
              <div className={style.exerciseSection}>
                <span className={style.exerciseTitle}>Упражнения</span>
                <ul className={style.exerciseList}>
                  {workoutExercises?.map((exercise) => (
                    <li key={exercise.name}>{exercise.name}</li>
                  ))}
                </ul>
                <Button onClick={navigateToProgress} className={'button_blue'} children={'Заполнить свой прогресс'} />
              </div>
              <div className={style.progressSection}>
                <span className={style.nameSection}>Мой прогресс по тренировке</span>
                <div className={style.allProgress}>
                  {workoutExercises?.map((exercise) => (
                    <div className={style.rowProgressBar} key={exercise.name}>
                      <p>{exercise.name}</p>
                      <div>
                        <div className={style.progressBar1}>
                          <div className={style.progress1}>50%</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <div className={style.rowProgressBar}>
                    <div>
                      <p>Наклоны назад</p>
                    </div>
                    <div className={style.progressBar2}>
                      <div className={style.progress2}>50%</div>
                    </div>
                  </div>

                  <div className={style.rowProgressBar}>
                    <div>
                      <p>Поднятие ног,</p>
                      <p>согнутых в коленях</p>
                    </div>
                    <div className={style.progressBar3}>
                      <div className={style.progress3}>50%</div>
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          ) : (
            <Button onClick={()=>{completeWorkout(currentWorkout)}} className={'button_blue'} children={'Закончить тренировку'} />
          )}
        </section>
        <Outlet />
      </main>
    </div>
  );
};
