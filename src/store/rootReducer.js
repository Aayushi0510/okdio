import { combineReducers } from "redux";
import user from "./slices/user.slice";
import student from "./slices/student.slice";
import book from "./slices/book.Slice";
import classes from "./slices/classes.slice";
import school from "./slices/school.slice";

const rootReducer = combineReducers({
  user,
  student,
  school,
  book,
  classes,
});

export default rootReducer;
