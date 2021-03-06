import axios from "axios";

export const Login = (username, password) => {
  return async dispatch => {
    dispatch({
      type: "LOGIN_SPINNER",
      payload: {
        showLoginSpinner: true
      }
    });
    try {
      const response = await axios.post(
        "http://192.168.43.118:3000/api/users/login",
        {
          username,
          password
        }
      );
      dispatch({
        type: "LOGIN",
        payload: {
          token: response.headers.token,
          username: response.data.username
        }
      });
      dispatch({
        type: "LOGIN_SPINNER",
        payload: {
          showLoginSpinner: false
        }
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_SPINNER",
        payload: {
          showLoginSpinner: false
        }
      });
    }
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const Skipped = () => {
  return async dispatch => {
    console.log("SKIPPED");
    dispatch({
      type: "SKIPPED"
    });
  };
};

export const deviceAdded = username => {
  return dispatch => {
    axios
      .get(`http://192.168.43.118:3000/api/gadget/${username}`)
      .then(res => {
        dispatch({ type: "DEVICE_ADDED", payload: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };
};

export const onSwitchValueChange = (gadget_id, rpi_id, value) => {
  return dispatch => {
    axios
      .post(`http://192.168.43.118:3000/api/gadget/${value ? "on" : "off"}`, {
        gadget_id,
        rpi_id
      })
      .then(() => {
        dispatch({ type: "SWITCH_CHANGED", payload: { value, gadget_id } });
      })
      .catch(err => console.log(err));
  };
};
