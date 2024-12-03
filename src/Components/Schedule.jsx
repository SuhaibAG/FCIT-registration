import './Schedule.css'
const Schedule = () =>{
    const days = ['','Sun','Mon', 'Tue', 'Wed','Thr'];
    const number_rows = [8 + " AM", 9 + " AM", 10 + " AM", 11 + " AM", 12 + " PM", 1 + " PM", 2 + " PM", 3 + " PM", 4 + " PM", 5 + " PM", 6 + " PM", 7 + " PM", 8 + " PM", 9 + " PM", 10 + " PM"];
    return(
        <div>
            <table>
                <thead>
                <tr>
                {days.map((_, index) => (
                    <th>{_}</th>
                ))} 
            </tr>
            </thead>
            <tbody>
                {number_rows.map((_, index) => (
                    <tr>
                        <td>{_}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                ))} 
            </tbody>
            </table>
            
            
        </div>
        
    )
}


export default Schedule;