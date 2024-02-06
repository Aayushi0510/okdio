const ROUTES_GATEWAY = "/app";
export const ROUTES_URL = {
  HOME: "/",
  DASHBOARD: ROUTES_GATEWAY,

  CLASSES: `${ROUTES_GATEWAY}/classes`,

  TASKS: `${ROUTES_GATEWAY}/tasks`,

  EVALUATION: `${ROUTES_GATEWAY}/evaluation`,

  REPORTS: `${ROUTES_GATEWAY}/reports`,

  BOOKCASE: `${ROUTES_GATEWAY}/bookcase`,
  BOOK: `${ROUTES_GATEWAY}/book`,
  BOOK_CONTENT: `${ROUTES_GATEWAY}/bookcontent`,

  BOOKREAD: `${ROUTES_GATEWAY}/bookread`,
  BOOKINFO: `${ROUTES_GATEWAY}/bookinfo`,
  LOGOUT: `${ROUTES_GATEWAY}/logout`,
  BLOG: `${ROUTES_GATEWAY}/blog`,
  RESOURCES: `${ROUTES_GATEWAY}/resources`,
  ACADEMY: `${ROUTES_GATEWAY}/academy`,
  HELP: `${ROUTES_GATEWAY}/help`,

  PROFILE: `${ROUTES_GATEWAY}/profile`,

  LOGIN: "/login",
  ABOUT: "/about",
  NOT_FOUND: "/404",
};

// const API_GATEWAY = "http://ajay24jan-001-site1.etempurl.com";
const API_GATEWAY = "https://mshaadinfotech.in/okouio/api";

export const API_URL = {
  LOGIN: `${API_GATEWAY}/login`,
  LOGOUT: `${API_GATEWAY}/logout`,

  GET_PROFILE: `${API_GATEWAY}/getprofile`,
  UPDATE_PROFILE: `${API_GATEWAY}/updateProfile`,
  UPDATE_USER_PASSWORD: `${API_GATEWAY}/updateUserPassword`,

  GET_SCHOOL_LIST: `${API_GATEWAY}/schoolList`,
  GET_CLASS_LIST: `${API_GATEWAY}/getClassBySchool`, // /schoolId/classBranch eg:- /2/5
  GET_STUDENT_LIST: `${API_GATEWAY}/studentList`,
  GET_TEACHER_CLASS_LIST: `${API_GATEWAY}/getTeachersClassList`, //
  GET_TEACHER_STUDENT_LIST: `${API_GATEWAY}/studentteacherlist`, //

  GET_CLASS_REPORT: `${API_GATEWAY}/getClassReport`,

  GET_CONTENT: `${API_GATEWAY}/getAllContentFile`, //"type":"4", //1-Kaynaklar,2-Acadmic,3-Benim Dünyam,4-Blog

  GET_BOOK_LIST: `${API_GATEWAY}/bookList`,
  GET_BOOK_CATEGORY_LIST: `${API_GATEWAY}/getCategoryList`,
  GET_BOOK_FILTER_LIST: `${API_GATEWAY}/getfilterlist`,
  GET_BOOK_DETAILS: `${API_GATEWAY}/getBookDetails`,
  GET_BOOK_ASSIGNED: `${API_GATEWAY}/assignedBookUserList`,
  POST_BOOK_ASSIGNED: `${API_GATEWAY}/assignedBookToUser`,
  POST_BOOK_FEEDBACK: `${API_GATEWAY}/submitTask`,

  GET_VOICE_CONTENT: `${API_GATEWAY}/getVoiceTaskDetails`, // /book id
  GET_MCQ_CONTENT: `${API_GATEWAY}/getMcqTaskDetails`, // /book id
  GET_MATCH_CONTENT: `${API_GATEWAY}/getMatchingTaskDetails`, // /book id
  GET_DRAG_DROP_CONTENT: `${API_GATEWAY}/getDragDropTaskDetails`, // /book id
  GET_PUZZLE_CONTENT: `${API_GATEWAY}/getPuzzleTaskDetails`, // /book id

  GET_TICKET_LIST: `${API_GATEWAY}/userTicketlist`,
  CREATE_TICKET: `${API_GATEWAY}/createTicket`,

  GET_SRUDENT_CSV: `${API_GATEWAY}/getStudentCsv`,
  GET_CLASSES_CSV: `${API_GATEWAY}/getClassesCsv`,
  GET_GIVE_TASK_CSV: `${API_GATEWAY}/getGiveTaskCsv`,
  GET_TASK_HISTORY_CSV: `${API_GATEWAY}/getTaskHistoryCsv`,
  GET_CLASS_REPORT_CSV: `${API_GATEWAY}/getclassReportcsv`,
  GET_CLASS_REPORT_TASK_CSV: `${API_GATEWAY}/getClassReportTaskCsv`,

  GET_EVALUATION_LIST: `${API_GATEWAY}/getVoiceSumitList`, // /classid/type   type=1 for top-table type=2 for bottom table data
};
