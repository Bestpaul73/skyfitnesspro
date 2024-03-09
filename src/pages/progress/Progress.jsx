import React, { useState, useEffect } from 'react';
import { Button } from '../../UI/Button/Button';
import styles from './Progress.module.scss';
import { useSelector } from 'react-redux';
// import { getCurrentUsers } from '../api';
import { hidePopupFlag } from '../../components/hidePopup/hidePopupFlag';
import { useNavigate } from 'react-router-dom';
import Hand from './Hand.png';
import { ProgressCheck } from './ProgressCheck'

export const Progress = () => {
  const navigate = useNavigate();


  // const workouts = useSelector((state) => state.coursesApp.allWorkouts);
  const currentWorkout = useSelector((state) => state.coursesApp.currentWorkout);
  // const workout = workouts?.filter((data) => data._id.includes(currentWorkout));

  // console.log(workouts);
  // console.log(currentWorkout);
  // console.log(workout);
  // console.log(workout[0].exercises);
  // console.log(currentWorkout.exercises);

  // const currentUser = useSelector((state) => state.coursesApp.currentUser);

  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e, elKey) => {
    const newValue = { ...inputValues, [elKey]: e.target.value };
    setInputValues(newValue);
  };

  // useEffect(() => {
  //   console.log(currentWorkout);
  //   // console.log(currentUser);
  //   // console.log(inputValues);
  // }, [currentWorkout, inputValues]);

  const hidePopup = (e, type) => {
    if (hidePopupFlag(e, type)) navigate(-1);
  };

  const onFocusFirstInput = () => {
    const firstInputEl = document.getElementsByTagName('input');
    firstInputEl[0]?.focus();
  };

  useEffect(() => onFocusFirstInput(), []);

  let progressCheckFlag = true;
  console.log(progressCheckFlag);
  
  const handleSubmit = () => {
    progressCheckFlag = !progressCheckFlag;
    console.log(progressCheckFlag);
  };

  // useEffect(() => handleSubmit(), [handleSubmit()])

  return (
    <>
      {progressCheckFlag ? (
        // <div className={styles.page}>
        //   <div className={styles.progressCheckForm}>
        //     <div className={styles.headerProgress}>Ваш прогресс засчитан!</div>
        //     <div className={styles.imgBox}>
        //       <img className={styles.Hand} src={Hand} alt='Hand' />
        //     </div>
        //   </div>
        // </div>

        // <div
        //   className={styles.popup_wrapper}
        //   onMouseUp={(e) => hidePopup(e, 'mouse')}
        //   onKeyDown={(e) => hidePopup(e, 'kbd')}
        // >
        //   <div className={styles.progressForm} id='#popup'>
        //     <div className={styles.headerForm}>ААААААААААААААА</div>
        //     <div className={styles.buttonBox}>
        //       <Button className={'button_blue'} children={'Отправить'} onClick={handleSubmit} />
        //     </div>
        //   </div>
        // </div>

        <Progress/>
      ) : (
        <div
          className={styles.popup_wrapper}
          onMouseUp={(e) => hidePopup(e, 'mouse')}
          onKeyDown={(e) => hidePopup(e, 'kbd')}
        >
          <div className={styles.progressForm} id='#popup'>
            <div className={styles.headerForm}>Мой прогресс</div>
            {currentWorkout?.exercises.map((el, index) => {
              return (
                <div key={index}>
                  <div className={styles.textForm}>
                    Сколько раз вы сделали: <br />"{el.name}"?
                  </div>
                  <div className={styles.inputBox}>
                    <input
                      className={styles.inputForm}
                      type='number'
                      name='quantity'
                      placeholder='Введите значение'
                      onChange={(e) => handleInputChange(e, el.name)}
                    ></input>
                  </div>
                </div>
              );
            })}
            <div className={styles.buttonBox}>
              <Button className={'button_blue'} children={'Отправить'} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
