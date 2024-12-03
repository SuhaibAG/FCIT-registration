import './Schedule.css'
const Schedule = () =>{
    const days = ['','Sun','Mon', 'Tue', 'Wed','Thr'];
    const number_rows = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
    return(
        <div className='con'>
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