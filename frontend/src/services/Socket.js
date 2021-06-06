import UIkit from "uikit";
import config from "../config";

export const CONNECTION = "CONNECTION";
export const UPDATED_DOWNLOADING = "UPDATED_DOWNLOADING";
export const UPDATED_DOWNLOADED = "UPDATED_DOWNLOADED";
export const UPDATED_WAIT = "UPDATED_WAIT";
export const UPDATED_GLOBAL_STAT = "UPDATED_GLOBAL_STAT";
export const UPDATED_STOP = "UPDATED_STOP";
export const START_DOWNLOAD = "START_DOWNLOAD";
export const PAUSE_DOWNLOAD = "PAUSE_DOWNLOAD";
export const RESUME_DOWNLOAD = "RESUME_DOWNLOAD";
export const REMOVE_DOWNLOAD = "REMOVE_DOWNLOAD";
export const STORAGE_INFO = "STORAGE_INFO";
export const CHANGE_DL_DIR = "CHANGE_DL_DIR";
export const UPDATED_STATUS = "UPDATED_STATUS";
export const START_TRANSFER_FILE = "START_TRANSFER_FILE";
export const END_TRANSFER_FILE = "END_TRANSFER_FILE";

const connection = (callback = () => { }) => {
  return dispatch => {
    let room = "6666";
    window.socket.on("connect", function () {
      window.socket.emit("ROOM", room);
      dispatch({
        type: CONNECTION,
        payload: true
      });
      callback();
    });
  };
};

const checkConnectivity = () => {
  return dispatch => {
    window.socket.emit('connectivity')
  }
}

const presentService = callback => {
  return dispatch => {
    window.socket.on("connectivity", payload => {
      dispatch({ type: 'connectivity', payload: payload.data });
    })
    window.socket.on("SERVICE", payload => {
      const data = payload.data;
      const channel = payload.channel;

      switch (channel) {
        case "GLOBAL_STAT":
          dispatch({ type: UPDATED_GLOBAL_STAT, payload: JSON.parse(data) });
          break;

        case "ACTIVE":
          dispatch({ type: UPDATED_DOWNLOADING, payload: JSON.parse(data) });
          break;

        case "WAIT":
          dispatch({ type: UPDATED_WAIT, payload: JSON.parse(data) });
          break;

        case "STOPPED":
          dispatch({ type: UPDATED_STOP, payload: JSON.parse(data) });
          break;

        case "STATUS":
          if (!data.ip) {
            UIkit.notification({
              status: "danger",
              pos: "top-center",
              message: window.tr("app.error.connection")
            });
          }
          dispatch({ type: UPDATED_STATUS, payload: data });
          break;

        case "STORAGE_INFO":
          dispatch({ type: STORAGE_INFO, payload: data });
          break;

        case "END_TRANSFER_FILE":
          dispatch({ type: END_TRANSFER_FILE, payload: data });
          break;

        case "ERROR":
          UIkit.notification({
            status: "danger",
            pos: "top-center",
            message: data.text ? data.text : String(data)
          });
          break;

        default:
          break;
      }
    });
  };
};

const startDownload = url => {
  return dispatch => {
    console.log(url)
    window.socket.emit("SERVICE", {
      channel: "ADD_DOWNLOAD",
      data: { url, dir: "" }
    });
    dispatch({ type: START_DOWNLOAD });
  };
};

const pauseDownload = gid => {
  return dispatch => {
    window.socket.emit("SERVICE", {
      channel: "PAUSE_DOWNLOAD",
      data: { gid }
    });
    dispatch({ type: PAUSE_DOWNLOAD });
  };
};

const resumeDownload = gid => {
  return dispatch => {
    window.socket.emit("SERVICE", {
      channel: "RESUME_DOWNLOAD",
      data: { gid }
    });
    dispatch({ type: RESUME_DOWNLOAD });
  };
};

const removeDownload = (gid, name) => {
  return dispatch => {
    window.socket.emit("SERVICE", {
      channel: "REMOVE_DOWNLOAD",
      data: { gid, name }
    });
    dispatch({ type: REMOVE_DOWNLOAD });
  };
};

const transferFile = (name, path) => {
  return dispatch => {
    window.socket.emit("SERVICE", {
      channel: "TRANSFER_FILE",
      data: { name, path }
    });
    dispatch({ type: START_TRANSFER_FILE });
  };
};

// const changeDlDir = path => {
//   return dispatch => {
//     window.socket.emit("SERVICE", {
//       channel: "CHANGE_DOWNLOAD_DIR",
//       data: path
//     });
//     dispatch({ type: CHANGE_DL_DIR });
//   };
// };

// reducer
export default function (
  state = {
    status: {},
    connected: false,
    spinning: false,
    connectivity: false,
    downloading: [],
    downloaded: [],
    wait: [],
    globalStat: {},
    storages: []
  },
  action
) {
  switch (action.type) {
    case CONNECTION:
      return Object.assign({}, state, {
        connected: action.payload
      });
    case UPDATED_GLOBAL_STAT:
      return Object.assign({}, state, {
        globalStat: action.payload
      });
    case UPDATED_DOWNLOADING:
      return Object.assign({}, state, {
        downloading: action.payload
      });
    case UPDATED_WAIT:
      return Object.assign({}, state, {
        wait: action.payload
      });
    case UPDATED_STOP:
      return Object.assign({}, state, {
        downloaded: action.payload
      });

    case STORAGE_INFO:
      return Object.assign({}, state, {
        storages: action.payload
      });
    case UPDATED_STATUS:
      return Object.assign({}, state, {
        status: action.payload
      });
    case START_TRANSFER_FILE:
      return Object.assign({}, state, {
        spinning: true
      });

    case END_TRANSFER_FILE:
      return Object.assign({}, state, {
        spinning: false
      });

    case 'connectivity':
      return Object.assign({}, state, {
        connectivity: action.payload
      });

    default:
      return state;
  }
}

export {
  connection,
  startDownload,
  resumeDownload,
  pauseDownload,
  removeDownload,
  presentService,
  transferFile,
  checkConnectivity
  // changeDlDir
};
