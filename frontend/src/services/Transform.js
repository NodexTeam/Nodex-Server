import _ from "lodash";

const digits = {
  "۰": "0",
  "۱": "1",
  "۲": "2",
  "۳": "3",
  "۴": "4",
  "۵": "5",
  "۶": "6",
  "۷": "7",
  "۸": "8",
  "۹": "9"
};

const characters = {
  ي: "ی",
  ك: "ک",
  دِ: "د",
  بِ: "ب",
  زِ: "ز",
  ذِ: "ذ",
  "ِشِ": "ش",
  "ِسِ": "س",
  ى: "ی"
};

export default class Transform {
  static digit(digit) {
    return digit.replace(/([۰-۹])/g, match => digits[match]);
  }

  static string(string) {
    return string
      ? string.replace(
          new RegExp(`(${_.keys(characters).join("|")})`, "g"),
          match => characters[match]
        )
      : string;
  }

  static array(array) {
    return array.map(item => Transform.any(item));
  }

  static object(object) {
    let _result = {};

    for (let key in object) {
      _result[key] = Transform.any(object[key]);
    }

    return _result;
  }

  static any(value) {
    if (_.isPlainObject(value)) {
      value = Transform.object(value);
    } else if (_.isArray(value)) {
      value = Transform.array(value);
    } else if (_.isString(value)) {
      value = Transform.string(value);
    }

    return value;
  }

  static objectToCamel(object) {
    let _result = {};

    for (let key in object) {
      _result[_.camelCase(key)] = Transform.snakeToCamel(object[key]);
    }

    return _result;
  }

  static arrayToCamel(array) {
    let _array = [];

    array.map(value => _array.push(Transform.snakeToCamel(value)));

    return _array;
  }

  static snakeToCamel(value) {
    if (_.isPlainObject(value)) {
      value = Transform.objectToCamel(value);
    } else if (_.isArray(value)) {
      value = Transform.arrayToCamel(value);
    } else if (_.isString(value)) {
      value = Transform.string(value);
    }

    return value;
  }

  /**
   *
   * @param {Object} object
   * @return {Object}
   * @static
   */
  static objectToSnake(object) {
    let result = {};

    for (let key in object) {
      result[_.snakeCase(key)] = Transform.camelToSnake(object[key]);
    }

    return result;
  }

  static arrayToSnake(array) {
    let _array = [];

    array.map(value => _array.push(Transform.camelToSnake(value)));

    return _array;
  }

  static camelToSnake(value) {
    if (_.isPlainObject(value)) {
      value = Transform.objectToSnake(value);
    } else if (_.isArray(value)) {
      value = Transform.arrayToSnake(value);
    } else if (_.isString(value)) {
      value = Transform.string(value);
    }

    return value;
  }
}
