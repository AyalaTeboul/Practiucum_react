
import { useSelector } from "react-redux";
import './Home.css'
export default function Home() {
    const firstName = useSelector(state => state.FirstName);
    const lastName = useSelector(state => state.LastName);


    return (
        <>
            <h2>Hello {firstName} {lastName}</h2>
            <p className="wellcome">
                To make the service more efficient, we would appreciate it if you entered your details on our website.
                <br/>
                <br/>
               <span className="sign"> at your service-
                <br/>
                www.teboul.org.il</span>
            </p>

        </>
    )
}