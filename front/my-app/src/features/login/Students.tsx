import React, { useState } from 'react';
import {loginAsync, selectLogged, logout  , selectAccsess} from './loginSlice';

import {useAppDispatch, useAppSelector} from '../../app/hooks'
import { getAllStudentsAsync, selectstudents  } from './studentsSlice';


const Students = () => {
    const logged = useAppSelector(selectLogged);
    const access = useAppSelector(selectAccsess);
    const my_students = useAppSelector(selectstudents);
    const dispatch = useAppDispatch();
  return (
    <div style={{backgroundColor : "blue"}}>
        Students
        <br></br>
        {logged ?
        <div>
             <button onClick={()=> dispatch(getAllStudentsAsync(access))}>Get students</button>
             {my_students.length > 0 && my_students.map(stu => 
            <div>
                name : {stu.sName}, 
                age:{stu.age}
            </div>)}
       
        </div>
       
        : "please log in"}
        
    </div>
  )
}

export default Students