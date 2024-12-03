import { useEffect, useState } from "react";
import './Choice.css'
import Schedule from "./Schedule";
import courseCSV from './courses.csv'
import Papa from 'papaparse'


const Choice = () => {

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
      
      const ClearCourses = () => {
        setCourseOptions([]);
        setmySchedule([])
        setCourseName("");
      };

      const [conflictMessages, setConflictMessages] = useState([]);
      
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
      }
    
      const [mySchedule, setmySchedule] = useState([]);
      const addToSchedule = (Code, isChecked) => {
        const updatedSchedule = [...mySchedule];
        let updatedConflicts = [...conflictMessages];
    
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
                                const conflictMessage = "Lecture time conflict detected with" + elem.Course_Name + '|' + elem.Code + '|' +element.Code;
                                if (!updatedConflicts.includes(conflictMessage)) {
                                updatedConflicts.push(conflictMessage);
                            }
                            }
                            
                            if (elem.LabStart.split(" ")[0].replace(":", "") <= element.LabEnd.split(" ")[0].replace(":", "") &&
                                elem.LabEnd.split(" ")[0].replace(":", "") >= elem.LabStart.split(" ")[0].replace(":", "") &&
                                elem.LabStart.split(" ")[1] === element.LabStart.split(" ")[1] &&
                                elem.LabEnd.split(" ")[1] === element.LabEnd.split(" ")[1]) {
                                conflict = true;
                                const conflictMessage = "Lab time conflict detected with" + elem.Course_Name + '|' + elem.Code + '|' +element.Code;
                                if (!updatedConflicts.includes(conflictMessage)) {
                                updatedConflicts.push(conflictMessage);
                            }
                            }
                            
                            if (elem.LabStart.split(" ")[0].replace(":", "") <= element.EndTime.split(" ")[0].replace(":", "") &&
                                elem.LabEnd.split(" ")[0].replace(":", "") >= element.StartTime.split(" ")[0].replace(":", "") &&
                                elem.LabStart.split(" ")[1] === element.StartTime.split(" ")[1] &&
                                elem.LabEnd.split(" ")[1] === element.EndTime.split(" ")[1]) {
                                conflict = true;
                                const conflictMessage = "Lecture time conflict detected with" + elem.Course_Name + '|' + elem.Code + '|' +element.Code;
                                if (!updatedConflicts.includes(conflictMessage)) {
                                updatedConflicts.push(conflictMessage);
                            }
                            }
                            
                            if (element.LabStart.split(" ")[0].replace(":", "") <= elem.EndTime.split(" ")[0].replace(":", "") &&
                                element.LabEnd.split(" ")[0].replace(":", "") >= elem.StartTime.split(" ")[0].replace(":", "") &&
                                element.LabStart.split(" ")[1] === elem.StartTime.split(" ")[1] &&
                                element.LabEnd.split(" ")[1] === elem.EndTime.split(" ")[1]) {
                                conflict = true;
                                const conflictMessage = "Lab time conflict detected with" + elem.Course_Name + '|' + elem.Code + '|' +element.Code;
                                if (!updatedConflicts.includes(conflictMessage)) {
                                updatedConflicts.push(conflictMessage);
                            }
                            }
                        }
                    });
                    if (!conflict) {
                        updatedSchedule.push(element);

                    }
                }
            }); 
        } else {
            for (let i = 0; i < updatedSchedule.length; i++) {
                if (updatedSchedule[i].Code === Code) {
                  const removedCourse = updatedSchedule[i];
                  updatedSchedule.splice(i, 1);
        
                  if (removedCourse) {
                    updatedConflicts = updatedConflicts.filter(
                      (msg) => !msg.includes(removedCourse.Code)
                    );
                  }
        
                  break;
                }
            }

        }

        conflictMessages.forEach(msg => { 
            if(msg.includes(Code)){
                updatedConflicts = updatedConflicts.filter(
                    (msg) => !msg.includes(Code)
                  );
            }

        })
            
        


        setConflictMessages(updatedConflicts);
        setmySchedule(updatedSchedule);

 

    };
    


    const getDay = (day) =>{
        switch(day) {
            case 'U':
              return 16.66;
            case 'M':
              return 33.2;
            case 'T':
              return 50;
            case 'W':
              return 66.66;
            case 'R':
              return 83.22;
            default:
              return null;
          }
    }
    
    const getLength = (start, end) =>{
            const length =  end.split(" ")[0].replace(":", "") - start.split(" ")[0].replace(":", "") 
            if(length == 50){
                return 3;
            }
            else if(length == 120){
                return 5
            }
        }
    const getStart = (start) =>{
            const time =  start.split(" ")[0].replace(":", "")
            const hours = Math.floor(time / 100)
            const minutes = time % 100           
            const decimalMinutes = minutes / 60
            if (start.includes('PM') &&!start.includes('12')){
                return (hours + decimalMinutes + 5)
            }
            return (hours + decimalMinutes - 7)
    }
    const isLab = (clasOBJ) => {
        const lab = clasOBJ.Lab_Days
        if(lab){
            return <div className="course-input"
                            style={{
                            height:`${getLength(clasOBJ.LabStart, clasOBJ.LabEnd)}%`,
                            top: `${getStart(clasOBJ.LabStart) * 6.29}%`, 
                            left: `${getDay(clasOBJ.Lab_Days)}%`, 
                            }}>
                            {clasOBJ.Course_Name}
                    </div>
                    
        }
    }   
    return(
            <div className="parent">
                <div className="schedule-container">
                    <Schedule/>
                    {mySchedule.map((clasOBJ, index) =>(
                        <div>
                        {clasOBJ.Days.split("").map((day, ind) =>(
                            <div className="course-input"
                            style={{
                                height:`${getLength(clasOBJ.StartTime, clasOBJ.EndTime)}%`,
                                top: `${getStart(clasOBJ.StartTime) * 6.23}%`, 
                                left: `${getDay(day)}%`, 
                              }}>
                                {clasOBJ.Course_Name}
                            </div>
                        ))}
                        {isLab(clasOBJ)}
                        </div>
                    ))}
              </div>
                
              <div className="conflict-container">
                <h3>Conflict Messages</h3>
                    {conflictMessages.length > 0 ? (
                 <ul>
                    {conflictMessages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                    ))}
                </ul>
                ) : (
                <p>No conflicts detected.</p>
                )}
                </div>


                <div className="Choice-Container">
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    >
                    </input>
                    <button onClick={SearchCourse}>Search for Course</button>
                    <button onClick={ClearCourses}>Clear Courses</button>
                    <div>    
                        {courseOptions.map((c, Index) => (
                            <div className={c.Course_Name}>
                                <label>{c.Code} | {c.StartTime} | {c.Course_Name}</label>
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


