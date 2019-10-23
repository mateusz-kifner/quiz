import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Axios from "axios";

/**
|--------------------------------------------------
| Axios based Http hook
|
| @returns [sendRequest, loading, resData]
| sendRequest function that sends request with @param relativeUrl and @param data
| loading var that return false when response is ready
| resData data from resopnse
|--------------------------------------------------
*/

const useHttp = () => {
  const [resData, setResData] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);

  const resultHandler = res => {
    console.log("Axios res:", res);
    if (res.headers["set-cookies"] !== undefined) console.log("cookies");
    setResData(res);
    setLoading(false);
  };
  const errorHandler = err => {
    console.log("Axios err:", err);
    if (
      err.response !== undefined &&
      err.response.data.error.message === "Auth failed"
    ) {
      auth.singOut();
    } else {
      setResData(undefined);
    }
    setLoading(false);
  };

  const sendRequest = async (relativeUrl, data) => {
    setLoading(true);
    console.log("req to " + relativeUrl);
    if (data)
      await Axios.post(auth.host + relativeUrl, data, auth.axiosConfig).then(
        resultHandler,
        errorHandler
      );
    else
      await Axios.get(auth.host + relativeUrl, auth.axiosConfig).then(
        resultHandler,
        errorHandler
      );
  };
  return [sendRequest, loading, resData];
};

export default useHttp;
