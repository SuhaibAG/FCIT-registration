import { useEffect, useState } from "react";
import './Choice.css'

import courseCSV from './courses.csv'
import Papa from 'papaparse'

const Choice = () =>{
    const [courses, setCourses] = useState([]);
    //code to fetch the csv
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



      const [courseOptions, setCourseOptions] = useState([]);
      const [courseName, setCourseName] = useState("");


      const SearchCourse = () =>{
        const updatedCourseOptions = [...courseOptions]
        courses.forEach(element => {
            if (element.Course_Name.includes(courseName) ){
                updatedCourseOptions.push(element)
            } 
        });
        setCourseOptions(updatedCourseOptions)
        console.log(courseOptions)
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
                            <p>{c.Course_Name}</p>
                            <input
                            type="radio">
                            </input>
                        </div>
                    ))}
                </div>



            </div>
    )
}

export default Choice;