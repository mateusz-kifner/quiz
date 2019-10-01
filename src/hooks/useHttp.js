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

    const sendRequest = async (relativeUrl, data) => {
        console.log("req to " + relativeUrl);
        let resHandle;
        if (data)
            resHandle = await Axios.post(
                auth.host + relativeUrl,
                data,
                auth.axiosConfig
            );
        else
            resHandle = await Axios.get(
                auth.host + relativeUrl,
                auth.axiosConfig
            );
        Promise.all([resHandle])
            .then(res => {
                console.log("Axios res:", res[0]);
                setResData(res[0]);
                setLoading(false);
            })
            .catch(err => {
                console.log("Axios err:", err);
                if (err.response.data.error.message === "Auth failed") {
                    auth.goSingin();
                } else {
                    setResData({});
                }
                setLoading(false);
            });
    };
    return [sendRequest, loading, resData];
};

export default useHttp;
