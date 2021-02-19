import React from 'react'
import { logout } from '../../Context'

function index(props) {
    const logout=()=>{
        localStorage.clear();
        props.history.push('/login')
    }
    return (
        <div>
            welcome to home page
            <button className="text-right" onClick={()=>logout()}>logout</button>
        </div>
    )
}

export default index
