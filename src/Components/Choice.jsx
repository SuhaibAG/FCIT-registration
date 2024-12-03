import { useEffect, useState } from "react";
import './Choice.css'
import Schedule from "./Schedule";
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

      const addToSchedule = (Code, isChecked) => {
        const updatedSchedule = [...mySchedule];
    
        if (isChecked) {
            // Add the course if checked
            courses.forEach(element => {
                if (element.Code === Code && !mySchedule.includes(element)) {
                    let conflict = false;
    
                    mySchedule.forEach(elem => {
                        if (elem.Days.includes(element.Days) || 
                            element.Days.includes(elem.Days) || 
                            elem.Lab_Days === element.Lab_Days || 
                            element.Days.includes(elem.Lab_Days) || 
                            elem.Days.includes(element.Lab_Days)) {
                            
                            if (elem.StartTime.split(" ")[0].replace(":", "") <= element.EndTime.split(" ")[0].replace(":", "") &&
                                elem.EndTime.split(" ")[0].replace(":", "") >= element.StartTime.split(" ")[0].replace(":", "") &&
                                elem.StartTime.split(" ")[1] === element.StartTime.split(" ")[1] &&
                                elem.EndTime.split(" ")[1] === element.EndTime.split(" ")[1]) {
                                conflict = true;
                                console.log("Lecture time conflict detected with" + elem.Course_Name);
                            }
                            
                            if (elem.LabStart.split(" ")[0].replace(":", "") <= element.LabEnd.split(" ")[0].replace(":", "") &&
                                elem.LabEnd.split(" ")[0].replace(":", "") >= elem.LabStart.split(" ")[0].replace(":", "") &&
                                elem.LabStart.split(" ")[1] === element.LabStart.split(" ")[1] &&
                                elem.LabEnd.split(" ")[1] === element.LabEnd.split(" ")[1]) {
                                conflict = true;
                                console.log("Lab time conflict detected with" + elem.Course_Name);
                            }
                            
                            if (elem.LabStart.split(" ")[0].replace(":", "") <= element.EndTime.split(" ")[0].replace(":", "") &&
                                elem.LabEnd.split(" ")[0].replace(":", "") >= element.StartTime.split(" ")[0].replace(":", "") &&
                                elem.LabStart.split(" ")[1] === element.StartTime.split(" ")[1] &&
                                elem.LabEnd.split(" ")[1] === element.EndTime.split(" ")[1]) {
                                conflict = true;
                                console.log("Lecture time conflict detected with" + elem.Course_Name);
                            }
                            
                            if (element.LabStart.split(" ")[0].replace(":", "") <= elem.EndTime.split(" ")[0].replace(":", "") &&
                                element.LabEnd.split(" ")[0].replace(":", "") >= elem.StartTime.split(" ")[0].replace(":", "") &&
                                element.LabStart.split(" ")[1] === elem.StartTime.split(" ")[1] &&
                                element.LabEnd.split(" ")[1] === elem.EndTime.split(" ")[1]) {
                                conflict = true;
                                console.log("Lab time conflict detected with" + elem.Course_Name);
                            }
                        }
                    });
                    if(conflict) {
                        
                    }
                    if (!conflict) {
                        updatedSchedule.push(element);
                    }
                }
            });
        } else {
            // Remove the course if unchecked
            for (let i = 0; i < updatedSchedule.length; i++) {
                if (updatedSchedule[i].Code === Code) {
                    updatedSchedule.splice(i, 1);
                    break;
                }
            }
        }
    
        setmySchedule(updatedSchedule);
        console.log(mySchedule);
    };
    
    const [classDays, setclassDays] = useState([]);

    const makeClass = () => {
        const classes = [...mySchedule];

        classes.forEach(elem => {
            console.log(elem.Days + elem.Lab_Days)
        })
    }


    return(
            <div>
                <Schedule/>
                {mySchedule.map((clasOBJ, index) =>(
                    <div className="course-input">
                    cpit345
                    </div>


                ))}
                



                








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
                                onChange={(e) => addToSchedule(e.target.value, e.target.checked)}>
                                </input>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
    )
}

export default Choice;