import { useEffect } from 'react';
import './App.css';
import { AppRoutes } from './routes';
import { getAllCourses, getAllWorkouts, getCurrentUser, getUsersCourses } from './pages/api';
import { useDispatch } from 'react-redux';
import { setAllCourses, setAllWorkouts, setUsersCourses } from './store/coursesSlice';
import { setFullCurrentUser } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const currentId = localStorage.getItem('userId');

  ///Получаем все курсы
  useEffect(() => {
    getAllCourses()
      .then((courses) => {
        dispatch(setAllCourses(Object.values(courses)));
      })
      .catch(() => {})
      .finally(() => {});
  }, [dispatch]);

  //Получаем все тренировки
  useEffect(() => {
    getAllWorkouts().then((workouts) => {
      // console.log(Object.values(workouts));

      dispatch(setAllWorkouts(Object.values(workouts)));
    });
  }, [dispatch]);

  //Получаем шаблоны всех курсов для пользователей
  useEffect(() => {
    getUsersCourses().then((usersCourses) => {
      dispatch(setUsersCourses(Object.values(usersCourses)));
    });
  }, [dispatch]);

  //Получаем текущего пользователя
  useEffect(() => {
    if (currentId) {
      getCurrentUser(currentId).then((currentUser) => {
        // dispatch(setFullCurrentUser(Object.values(currentUser)));

        dispatch(setFullCurrentUser(currentUser));
      });
    }
  }, [dispatch, currentId]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
