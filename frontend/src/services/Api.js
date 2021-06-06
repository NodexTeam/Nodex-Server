import baseConfig from "../config";
import Promise from "promise";
import Axios from "axios";
import transform from "./Transform";
import _ from "lodash";
import MockAdapter from "axios-mock-adapter"; // eslint-disable-line

const apiConfig = baseConfig.api;
const methods = ["get", "delete", "head", "options", "post", "put", "patch"];

export default class Api {
  constructor() {
    this.axios = Axios.create({
      baseURL: apiConfig.baseURL,

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      params: {},

      transformRequest: [
        data => {
          return JSON.stringify(transform.camelToSnake(data));
        }
      ],

      validateStatus: status => status >= 200 && status < 300,

      transformResponse: [
        data => {
          if (_.isEmpty(data)) {
            return data;
          }

          try {
            return transform.snakeToCamel(JSON.parse(data));
          } catch (err) {
            return data;
          }
        }
      ]
    });

    if (apiConfig.hasMock) {

      this.mock = new MockAdapter(this.axios, {
        delayResponse: apiConfig.mockDelay
      });
    } else {
      this.mock = new MockAdapter();
    }

    methods.map(method => (this[method] = this._fetch(method)));
  }

  _fetch(method) {
    return (url, { data, params, ...options } = {}) => {
      let _params = this.axios.defaults.params;
      if (params) {
        _params = Object.assign({}, _params, params);
      }

      return this.axios({
        method,
        url,
        data,
        params: _params,
        ...options
      })
        .then(res => res.data)
        .catch(err => Promise.reject(err));
    };
  }
}
