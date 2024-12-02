import { useEffect, useState } from "react";
import './Choice.css'

import courseCSV from './courses.csv'
import Papa from 'papaparse'


const Choice = () =>{

    //this function fetches the csv
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch(courseCSV)
          .then((response) => response.text())
          .then((csvText) => {
            Papa.parse(csvText, {
              header: true, 
              skipEmptyLines: true, 
              complete: (result) => {
                setCourses(result.data); 
              },
            });
          });
      }, []);


      //this function takes in the course name from the input
      const [courseOptions, setCourseOptions] = useState([]);
      const [courseName, setCourseName] = useState("");

      const SearchCourse = () =>{
      const updatedCourseOptions = [...courseOptions]

      courses.forEach(element => {
          const cleanCSVName = element.Course_Name.replace(/\s+/g, "").toLowerCase();
          const cleanCourseName = courseName.replace(/\s+/g, "").toLowerCase();

            if (cleanCSVName.includes(cleanCourseName) && !updatedCourseOptions.includes(element)) {
                updatedCourseOptions.push(element)
            } 
        });


        setCourseOptions(updatedCourseOptions)
        console.log(courseOptions)
      }
      

    
      const [mySchedule, setmySchedule] = useState([]);

      const addToSchedule = (Code) =>{
        const updatedSchedule = [...mySchedule]
        courses.forEach(element => {
          if(element.Code === Code && !mySchedule.includes(element)){
            mySchedule.forEach(elem =>{
              if(elem.Days.includes(element.Days) || element.Days.includes(elem.Days)){
                if(){
                  
                }
              }

            })
          
          }
          else if (element.Code === Code && updatedSchedule.includes(element)) {
            //remove element
           updatedSchedule.push(element)
          }
        });

        setmySchedule(updatedSchedule)
        console.log(mySchedule)
      }

    return(
            <div className="Choice-Container">
                <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                >
                </input>
                <button onClick={SearchCourse}>Search for Course</button>
                <div>    
                    {courseOptions.map((c, Index) => (
                        <div className={c.Course_Name}>
                            <label>{c.Code} | {c.Course_Name}  | {c.Teacher}</label>
                            <input
                            value={c.Code}
                            type="checkbox"
                            onChange={(e) => addToSchedule(e.target.value)}>
                            </input>

                        </div>
                    ))}
                </div>



            </div>
    )
}

export default Choice;