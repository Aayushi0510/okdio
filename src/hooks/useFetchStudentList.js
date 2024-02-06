import { useState } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
// utils
import { postMethod } from "src/utils";
// redux
import { actionStudent } from "src/store/slices/student.slice";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";

export const useFetchStudentList = () => {
  const dispatch = useDispatch();
  const reduxData = useSelector(({ student }) => student?.data);
  const [data, setData] = useState(reduxData);
  const [loading, setLoading] = useState(false);

  /**
   *
   * @description fetch post api to fetch student list
   * @param {*} classId - class Id in body
   * @param {*} search - search String in body
   * @param {*} perPage - rows per page || '10' in body
   * @param {*} pageNumber - pageNumber || '1' in param
   * @memberof useFetchStudentList
   */
  const fetchData = async (req) => {
    console.log("fetch-student", req);
    try {
      setLoading(true);

      const paylaod = {
        class_id: req?.classId || "3",
        search: req?.search || "",
        per_page: req?.perPage || "10",
      };

      const response = await postMethod(
        API_URL.GET_STUDENT_LIST + `?page=${req?.pageNumber || 1}`,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        // console.log("response?.data?.data", response?.data);

        const newData = response?.data;

        dispatch(actionStudent(newData));
        setData(newData);
        setLoading(false);
      } else {
        setLoading(false);
        return true;
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return {
    studentList: data,
    fetchStudent: fetchData,
    studentLoading: loading,
  };
};
