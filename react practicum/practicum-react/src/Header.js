
import React from 'react';
import './Header.css'
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';




export default function Header() {
    const startContent = (
        <React.Fragment>
            <Link to="/home" className='link'>Our Home</Link>
            <Link to="/form" className='link'>Login</Link>
        </React.Fragment>
    );

    return (
        <div className="card">
            <Toolbar
                start={startContent}
            />
        </div>
    )


}



