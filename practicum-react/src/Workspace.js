import { Routes ,Route } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home'
import DetailsForm from './DetailsForm'

export default function Workspace() {



    return (
        <>
        <Routes>
            <Route path='/home' element={<Home/>} exact ></Route>
            <Route path='/form/' element={<DetailsForm/>} exact ></Route>
            <Route path='/' element={<Home/>}></Route>
        </Routes>
        </>
    )


}
