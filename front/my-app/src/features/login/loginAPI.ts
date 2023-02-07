import { MY_SERVER } from "../../env";
import axios from 'axios';



export function login(cred : any) {
  // console.log(cred)
  // resolve - indicate that asynchronous has completed successfully
  return new Promise<{data: any}>((resolve) =>
    axios.post(MY_SERVER + 'login/', cred).then(res => resolve({ data: res.data })) 
  );
}

// export function getAllStudents(access : string) {
//   // console.log(cred)
//   // resolve - indicate that asynchronous has completed successfully
//   return new Promise<{data: []}>((resolve) =>
//     axios.post(MY_SERVER + 'student/', access).then(res => resolve({ data: res.data })) 
//   );
// }

// כותרות משמשות למידע נוסף על הבקשה או התגובה. הם משמשים להעברת מידע כגון אימות,
//  סוג תוכן ופרמטרים רבים אחרים.
// export function getAllStudents(access : string) {
//   return new Promise<{data: []}>((resolve) => {
//     axios.get(MY_SERVER + 'student/', {
//       headers: {
//         'Authorization': `Bearer ${access}`
//       }
//     })
//     .then(res => resolve({ data: res.data }))
//   });
// }