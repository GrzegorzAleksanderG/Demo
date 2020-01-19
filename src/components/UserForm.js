import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = (props)=>{

    const[params, setParams] = useState(null);

    useEffect(() => {
        const _id = "id" in props.match.params ? props.match.params.id : null;
        if(_id !== null){
            if(params === null){
                fetchUserData(_id);
            }
        }else{
            if(params !== null){
                setParams(null);
            }
        }  
    }, [params, props.match.params]);

    const fetchUserData = async (id)=>{
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        try{
            await fetch(url).then(
                response => response.json()).then(
                    result => {
                        setParams(result);
                    }
                );
        }catch(error){
            console.log(error);
        }
    }

    const onClickSubmit = ()=>{
        try{
            let _method = "";
            let _id = null;
            let _userId = null;
            let _sufix = "";
            if(params === null){
                _method = "POST";
            }else{
                _method = "PATCH";
                _id = params.id;
                _userId = params.userId;
                _sufix = `/${_id}`;
            }
            fetch(`https://jsonplaceholder.typicode.com/posts${_sufix}`, {
                    method: _method,
                    body: JSON.stringify({
                    title: document.getElementById("form_title").value,
                    body: document.getElementById("form_body").value,
                    id: _id,
                    userId: _userId
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json()).then(json => console.log(json));

        }catch(error){
            console.log(error);
        }
    } 

    return (
        <>
            <div className="form-group">
                <label htmlFor="form_title">TITLE</label>
                <input className="form-control" id="form_title" defaultValue={params === null ? "" : params.title}></input>                    
                <label htmlFor="form_body">BODY</label>
                <textarea className="form-control" id="form_body" defaultValue={params === null ? "" : params.body}></textarea>
            </div>
            <input type="button" className="btn btn-primary" onClick={onClickSubmit} value="Submit"></input>
        </>
    );
}
export default UserForm;