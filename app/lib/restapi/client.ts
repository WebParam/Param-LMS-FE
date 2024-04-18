import { Diagnostic } from "../logger/logger";


function resetSessions() {
  
  const user_session = localStorage.getItem("user-session") || null;

  if(user_session){
    const parseSession = JSON.parse(user_session)
    const date = new Date();
    const loginData = {
      sessionStart : parseSession.sessionStart,
      sessionEnd : new Date(date.getTime() + 2 * 60000),
      lastActitive: new Date().toISOString()
    }


    localStorage.setItem("user-session",     JSON.stringify(loginData))
  }
}


const axios = require("axios").default;

const token = "";
console.log(token);
let header: any;
// if (!token) {
//   header = {

//     Authorization: `Anonymous`,
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "X-Requested-With",
//   };
// } else {
  header = {
    // Authorization: `Bearer ${token}`,
    Authorization:"Basic YWRtaW46cmpPdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
    "ngrok-skip-browser-warning":"any"
  // };
}

   
export async function GET(endPoint: string) {
  try {
    // const result = await axios.get(`${endPoint}`, {auth: {
    //   username: "admin",
    //   password: "rjOv2aSZ&=|nD6)%"
    // }} );
    const result =  fetch(endPoint, {
      method: 'get',
      headers: header,
      // body: JSON.stringify(opts)
    }).then(function(response) {
      resetSessions()
      return response.json();
    })

    return result;
  } catch (error:any) {
    console.log(
      `[API ERROR  : Method: GET; Endpoint: ${endPoint}]`,
      error.toJSON()
    );
    return error.response;
  }
}

export async function POST(endPoint: string, payload: Object) {
  try {
  
    const result = await axios.post(`${endPoint}`, payload, {
      headers: header,
    });
    Diagnostic("SUCCESS ON POST, returning", result);
    resetSessions()
    return result.data;
  } catch (error:any) {
    
    console.log(`[API ERROR : Method: POST; Endpoint: ${endPoint}]`, error);
    Diagnostic("ERROR ON POST, returning", error);
    return error.response;
  }
}
export function DELETE(endPoint: string): Promise<any> {
  let HEADER = {
    "Authorization": "Basic YWRtaW46cmpOdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
  };

  // Return the axios promise directly
  return axios
    .delete(`${endPoint}`, { headers: HEADER })
    .then((result: any) => {
      // Assuming result.data is the actual data returned from the API
      resetSessions()
      return result.data;
    })
    .catch((error: any) => {
      // Returning an error object or throwing an error, based on your preference
      return error;
    });
}
export function PUT(endPoint: string, payload: Object): Promise<any> {
  let HEADER = {
    "Authorization": "Basic YWRtaW46cmpOdjJhU1omPXxuRDYpJQ==",
    "Access-Control-Allow-Origin": "*",
  };

  // Return the axios promise directly
  return axios
    .put(`${endPoint}`, payload, { headers: HEADER })
    .then((result: any) => {
      // Assuming result.data is the actual data returned from the API
      resetSessions()
      return result.data;
    })
    .catch((error: any) => {
      // Returning an error object or throwing an error, based on your preference
      return error;
    });
}