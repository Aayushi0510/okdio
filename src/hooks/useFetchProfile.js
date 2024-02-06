import { useState } from "react";
// npm
import { useDispatch, useSelector } from "react-redux";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { postMethod } from "src/utils";
// redux
import { actionUser } from "src/store/slices/user.slice";

export const useFetchProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user?.data);

  const [data, setData] = useState(user);
  const [loading, setLoading] = useState(false);
  // console.log(reduxData, reduxData?.data);
  /**
   *
   * @description get api to fetch profile data
   * @param {*}  id - user_type in body optional
   * @memberof useFetchProfile
   */
  const fetchData = async (req) => {
    // console.log("fetch-profile", req);
    try {
      setLoading(true);

      const paylaod = {
        id: req?.id || user?.user_type,
      };

      const response = await postMethod(
        API_URL.GET_PROFILE,
        paylaod,
        false,
        true
      );
      // console.log(response);
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;
        dispatch(actionUser(newData));
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
    profileData: data,
    fetchProfile: fetchData,
    profileLoading: loading,
  };
};
