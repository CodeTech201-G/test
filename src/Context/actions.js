import { APICALL } from "../Services/ApiServices";
import { LoginUrl } from "../Services/ApiEndPoints";

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    await APICALL.service(LoginUrl, "POST", loginPayload)
      .then((data) => {
        if (data.code === "200") {
          let results = data.data;
          dispatch({ type: "LOGIN_SUCCESS", payload: results });
          localStorage.setItem("currentUser", JSON.stringify(results));
          localStorage.setItem("isAuthenticated",true)
          // console.log("resobse : ", results);
          return data;
        } else {
          data = { errors: [data.message] };
          localStorage.setItem("isAuthenticated",false)
        }
        dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}

export async function sessionTimeout(dispatch) {
  dispatch({ type: "SESSION_TIMEOUT" });
}