import {
  WORK_INITIAL_VALUE,
  SHORT_BREAK_INITIAL_VALUE,
  BREAK2_INITIAL_VALUE,
} from "./constants";

const initialState = {
  work: WORK_INITIAL_VALUE,
  shortBreak: SHORT_BREAK_INITIAL_VALUE,
  break2: BREAK2_INITIAL_VALUE,
  done: false,
  startClicked: false,
  favorites: JSON.parse(window.localStorage.getItem("fav")) || [
    [WORK_INITIAL_VALUE, SHORT_BREAK_INITIAL_VALUE, BREAK2_INITIAL_VALUE],
  ],
};
// cycle: [25, 5, 25, 5, 25, 5, 25, 20],
//[2,1,2]
//[25,5,25,5,25,5,25,20]

export default initialState;
