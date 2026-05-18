import axios from "axios";
import _ from "lodash";
import ls from "localstorage-slim";
export const APP_API_URL = window.location.host.includes("localhost")
? "http://localhost:8000/api/v1"
: "https://api.workason.site/api/v1";
export const validatePasswordRegex =
  // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const httpPostWithoutToken = async (url, data) => {
  return await axios
    .post(`${APP_API_URL}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then((resp) => {
      return resp.data;
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        return { error: "An error occurred, please try again later" };
      }
      const msg = error?.response?.data?.message || "An error occurred";
      return {
        error: msg,
        message: msg,
        status: error?.response?.status,
      };
    });
};

export const httpPostWithToken = async (url, data) => {
  // const token = sessionStorage.getItem("wwph_token");
  const token = ls.get("wwph_token", { decrypt: true });
  return await axios
    .post(`${APP_API_URL}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        return { error: "An error occurred, please try again later" };
      }
      const msg =
        _.get(error, "response?.data?.message") ||
        error?.response?.data?.message;

        if (msg === "Unauthenticated.") {
  const publicPaths = ["/", "/login", "/register", "/about", "/career-tips", "/hire-talent", "/faq"];
  if (!publicPaths.includes(window.location.pathname)) {
    window.location.href = "/login";
  }
}
      return { error: msg };
    });
};

export const httpGetWithToken = async (url) => {
  // const token = sessionStorage.getItem("wwph_token");
  const token = ls.get("wwph_token", { decrypt: true });
  return await axios
    .get(`${APP_API_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        return { error: "An error occurred, please try again later" };
      }
      const msg = _.get(error, "response?.data?.message") || error?.response?.data?.message;
      if (msg === "Unauthenticated.") {
        window.location.href = "/login"
      }
      return { error: msg };
    });
};
export const httpGetWithoutToken = async (url, data) => {
  return await axios
    .get(`${APP_API_URL}/${url}`, { params: data })
    .then((resp) => {
      return resp.data;
    })
    .catch(function (error) {
      if (error.code === "ERR_NETWORK") {
        return { error: "An error occurred, please try again later" };
      }
      const msg =
        _.get(error, "response?.data?.message") ||
        error?.response?.data?.message;
      return { error: msg };
    });
};
//test 
export const sendSms = async (number, message) => {
  var axios = require("axios");
  var data = new FormData();
  data.append("api_key", "Eqk02cYyyDty9EOxk98j");
  data.append("from", "Livevend");
  data.append("to", number);
  data.append("message", message);

  var config = {
    method: "post",
    url: "https://mail.tribearc.com/api/sms/send_now.php",
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const isValidUrl = (str) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
};
 

export const generateToken = (length ) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const validateEmail = (e) => {
  return String(e)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};