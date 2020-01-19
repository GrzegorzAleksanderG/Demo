import React, { useState, useEffect }  from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UsersTable = ()=>{
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const abortController = new AbortController();
        const signal = abortController.signal;
        try{
            fetch(url, {signal : signal}).then(
                response => response.json()).then(
                result => {
                    setData(result);
                }
            );            
        }catch(error){
            console.log(error);            
        }

        return function cleanup() {
            abortController.abort();
        };
        
    }, []);

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr><th className="th-sm">ID</th><th>TITLE</th><th>BODY</th><th></th></tr>
                </thead>
                <tbody>
                {data.map((item)=>{
                    return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                        <td><Link className="btn btn-secondary" to={`/editform/${item.id}`}>EDIT USER</Link></td>
                    </tr>)
                })}
                </tbody>
            </table>        
        </>
    );
}
export default UsersTable;
