import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    allCourses: null,
    allWorkouts: null,

    usersCourses: null,
    //Это шаблон, он мне будет пока нужен, потом естественно уберу
    currentWorkout: {
      _id: "mrhuag",
      exercises: [
        {
          name: "Округляем грудную клетку при выдохе (10 повторений)",
          quantity: 10,
        },
        {
          name: "Тянем левую руку в правую сторону (20 повторений)",
          quantity: 20,
        },
        {
          name: "Тянем правую руку в левую сторону (20 повторений)",
          quantity: 20,
        },
      ],

      name: "Гибкость спины / Йога на каждый день / 5 день / Алексей Казубский",
      video: "https://www.youtube.com/embed/MIvcMapie_A",
    },
  },
  reducers: {
    setAllCourses(state, action) {
      state.allCourses = action.payload;
    },
    setAllWorkouts(state, action) {
      state.allWorkouts = action.payload;
    },

    setUsersCourses(state, action) {
      state.usersCourses = action.payload;
    },
    setCurrentWorkout(state, action) {
      console.log(action.payload);
      state.currentWorkout = action.payload;
    },
  },
});

export const { setAllCourses, setAllWorkouts, setUsersCourses, setCurrentWorkout } =
  //     setCurrentWorkout(state, action) {
  //       console.log(action.payload);
  //       state.currentWorkout = action.payload;
  //     },
  //   },
  // });

  // export const { setAllCourses, setAllWorkouts, setCurrentWorkout } =

  coursesSlice.actions;

export default coursesSlice.reducer;
