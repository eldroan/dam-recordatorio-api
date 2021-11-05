import axios from "axios";

const sysacad_api = {
  base: "https://sysacad-api.herokuapp.com/",
  login: "alumno",
};

export const login = async (token) => {
  try {
    // const token = Base64.encode(`${legajo}:${password}`);
    // `Basic ${token}`

    const res = (
      await axios.get(`${sysacad_api.base}${sysacad_api.login}`, {
        headers: { Authorization: token },
      })
    ).data;

    return {
      status: res.status,
      message: "",
      alumno: res.alumno ?? "",
      token,
    };
  } catch (error) {
    if (error?.response?.data ?? false) {
      //Error conocido
      return {
        status: error.response.data.status,
        message: error.response.data.message,
      };
    } else {
      return { status: 500, message: "Algo salio mal" };
    }
  }
};
