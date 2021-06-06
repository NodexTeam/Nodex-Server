export default {
  theme: {
    mode: "ltr",
    lang: "en"
    // color: (i = 1) => `rgba(255, 76, 104, ${i})`
  },
  api: {
    httpApiPrefix: "http://127.0.0.1:8585",
    socketApiPrefix: "http://192.168.1.7:8585"
  },
  routes: {
    dashboard: "/dashboard",
    downloading: "/downloading",
    downloaded: "/downloaded",
    wait: "/wait",
    all: "/all",
    login: "/login"
  }
};
