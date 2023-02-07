import { MY_SERVER } from "../../env";
import axios from 'axios';



// כותרות משמשות למידע נוסף על הבקשה או התגובה. הם משמשים להעברת מידע כגון אימות,
//  סוג תוכן ופרמטרים רבים אחרים.
export function getAllStudents(access : string) {
  return new Promise<{data: []}>((resolve) => {
    axios.get(MY_SERVER + 'student/', {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    })
    .then(res => resolve({ data: res.data }))
  });
}