// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL:
    "https://food-waste-management-system-2-hhdl.onrender.com/api",
});

export default api;