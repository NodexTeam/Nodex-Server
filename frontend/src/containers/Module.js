const USER_AUTHORIZED = "USER_AUTHORIZED";
const USER_UNAUTHORIZED = "USER_UNAUTHORIZED";
const USER_AUTHENTICATED = "USER_AUTHENTICATED";
const USER_UNAUTHENTICATED = "USER_UNAUTHENTICATED";

export function authenticated(token = null) {
  return {
    type: USER_AUTHENTICATED,
    payload: token
  };
}

export function unauthenticated() {
  return {
    type: USER_UNAUTHENTICATED,
    payload: null
  };
}

export function authorized(user = null) {
  return {
    type: USER_AUTHORIZED,
    payload: user
  };
}

export function unauthorized() {
  return {
    type: USER_UNAUTHORIZED,
    payload: null
  };
}

export function authorize(callback = null) {
  return (dispatch, getState, api) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      // return api
      //   .get("/auth/authorize")
      //   .then(res => {

      dispatch(authorized(true));
      callback(true);
      // })
      // .catch(err => {
      // localStorage.removeItem("access-token");
      // callback(false);
      // dispatch(unauthorized());
      // });
    } else {
      localStorage.removeItem("access-token");
      dispatch(unauthorized());
      callback(false);
    }
  };
}

export function login(
  data = {
    username: "",
    password: ""
  },
  callback = () => {}
) {
  return (dispatch, getState, api) => {
    // api
    //   .post("/auth/login", {
    //     data: {
    //       username: data.username,
    //       password: data.password
    //     }
    //   })
    //   .then(res => {
    localStorage.setItem("access-token", true);
    dispatch(authenticated());
    callback();
    // })
    // .catch(err => {
    //   console.error(err);
    //   if (callback) callback(false);
    // });
  };
}

export function logout(callback = null) {
  return (dispatch, getState, api) => {
    // api
    //   .get("/auth/logout")
    //   .then(res => {
    localStorage.removeItem("access-token");
    dispatch(unauthorized());
    if (callback) callback(true);
    // })
    // .catch(err => {
    //   if (callback) callback(false);
    // });
  };
}

export default function reducer(
  state = {
    authorized: localStorage.getItem("access-token"),
    token: null,
    user: null
  },
  action
) {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return Object.assign({}, state, {
        authorized: true,
        token: action.payload
      });
    case USER_UNAUTHENTICATED:
      return Object.assign({}, state, {
        authorized: false,
        token: false
      });
    case USER_AUTHORIZED:
      return Object.assign({}, state, {
        authorized: true,
        user: action.payload
      });
    case USER_UNAUTHORIZED:
      return Object.assign({}, state, {
        authorized: false
      });
    default:
      return state;
  }
}
