import { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css'
import { getHmos, postPerson, postFatherAndChild } from './service';
import {
    setFirstName, setLastName, setHmoid, setIdNumber, setDateOfBirth, setMaleOrFemale,
    setChildName, setChildIdNumber, setChildDateOfBirth, addChildren, setChildMaleOrFemale
} from "./store/userAction";
import './DetailsForm.css'

export default function Home() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const [fatherId, setFatherId] = useState(0);
    const [motherId, setMotherId] = useState(0);
    const [childId, setChildId] = useState(0);
    const [hmos, setHmos] = useState([]);
    const mOf = [
        { kind: "male", val: true },
        { kind: "female", val: false }
    ]
    //store
    const firstName = useSelector(state => state.FirstName);
    const lastName = useSelector(state => state.LastName);
    const hmo = useSelector(state => state.Hmo)
    const idNumber = useSelector(state => state.IdNumber);
    const dateOfBirth = useSelector(state => state.DateOfBirth);
    const maleOrFemale = useSelector(state => state.MaleOrFemale)

    //עדכון מערך הילדים כדי שיתרנדר
    const childrenFromStore = useSelector(state => state.Children);
    const [children, setChildren] = useState(childrenFromStore ? childrenFromStore : []);
    useEffect(() => {
        setChildren(childrenFromStore ? childrenFromStore : []);
    }, [childrenFromStore]);

    //הבאת קופות החולים מהשרת
    async function getHmosList() {
        const hmosFromServer = await getHmos();
        setHmos(hmosFromServer);
        console.log(hmos);
    }
    useEffect(() => {
        getHmosList();
    }, []);

    //עדכון  הטופס
    function handleFirstName(e) {
        dispatch(setFirstName(e.target.value))
    }
    function handleLastName(e) {
        dispatch(setLastName(e.target.value))
    }
    function handleIdNumber(e) {
        dispatch(setIdNumber(e.target.value))
    }
    function handleDateOfBirth(e) {
        dispatch(setDateOfBirth((e.target.value)))
    }
    function handleHmo(e) {
        dispatch(setHmoid(e.value))
    }
    function handleMaleOrFemale(e) {
        dispatch(setMaleOrFemale(e.value))
    }
    //עדכון טופס הילדים
    const addChild = () => {
        dispatch(addChildren({ FirstName: "", IdNumber: "", DateOfBirth: null, MaleOrFemale: {} }));
    }
    const handleChildName = (index, event) => {

        dispatch(setChildName({ FirstName: event.target.value, Index: index }))
    }
    const handleChildIdNumber = (index, event) => {

        dispatch(setChildIdNumber({ IdNumber: event.target.value, Index: index }))
    }
    const handleChildDateOfBirth = (index, event) => {
        dispatch(setChildDateOfBirth({ DateOfBirth: event.target.value, Index: index }))
    }
    const handleChildMaleOrFemale = (index, event) => {
        dispatch(setChildMaleOrFemale({ MaleOrFemale: event.value, Index: index }))
    }


    //עדכון מול השרת
    async function postFather() {
        const result = await postPerson({
            FirstName: firstName, LastName: lastName, Hmoid: hmo.hmoid,
            IdNumber: idNumber, DateOfBirth: dateOfBirth, MaleOrFemale: maleOrFemale.val
        });

        if (maleOrFemale.val)
            setFatherId(result.personId);
        else setMotherId(result.personId);
    }
    async function postChild(i) {
        const result = await postPerson({
            FirstName: childrenFromStore[i].FirstName, LastName: lastName, Hmoid: hmo.hmoid,
            IdNumber: childrenFromStore[i].IdNumber, DateOfBirth: childrenFromStore[i].DateOfBirth, MaleOrFemale: childrenFromStore[i].MaleOrFemale.val
        });
        setChildId(result.personId)
    }
    async function login(e) {
        e.preventDefault()
        await postFather()
        for (let i = 0; i < children.length; i++) {
            await postChild(i);
            await postFatherAndChild({ FatherId: fatherId, MotherId: motherId, ChildId: childId });
        }
    }

    return (
        <>
            {(!formState.isValid && formState.isSubmitted) ?
                <Alert variant="danger"   >
                    {Object.values(formState.errors).map((e, idx) => {
                        return (<p key={idx}>{e.message}</p>)
                    })}
                </Alert>
                :
                <Alert variant="success"   >Please fill in the form</Alert>
            }
            <form onSubmit={handleSubmit(login)}>
                {/* שם פרטי */}
                <div className="p-inputgroup flex-1 input">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="First name"
                        {...register("firstName", {
                            required: {
                                value: true,
                                message: "You must enter your first name"
                            },
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "That's not a valid name"
                            }
                        })}
                        onChange={handleFirstName} value={firstName ? firstName : ''}
                    />
                </div>
                <br />
                {/* שם משפחה */}
                <div className="p-inputgroup flex-1 input">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-users"></i>
                    </span>
                    <InputText placeholder="Lastname" onChange={handleLastName} value={lastName} {...register("lastname")} />
                </div>
                <br />
                {/* תעודת זהות */}
                <div className="p-inputgroup flex-1 input">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-id-card"></i>
                    </span>
                    <InputText placeholder="IdNumber" onChange={handleIdNumber} value={idNumber} />
                </div>
                <br />
                {/* תאריך לידה */}
                <div className="p-inputgroup flex-1 input">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-calendar"></i>
                    </span>
                    <Calendar placeholder="date of birth" value={dateOfBirth} onChange={handleDateOfBirth} />
                </div>
                <br />
                {/* קופ"ח */}
                <div className="p-inputgroup flex-1 input">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-thumbs-up"></i>
                    </span>
                    <Dropdown value={hmo} onChange={handleHmo}
                        options={hmos}
                        optionLabel="hmoname"
                        placeholder="Select a hmo" className="w-full md:w-14rem" />
                </div>
                <br />
                {/* בן או בת */}
                <div className="p-inputgroup flex-1 input">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-reddit"></i>
                    </span>
                    <Dropdown value={maleOrFemale} onChange={handleMaleOrFemale}
                        options={mOf}
                        optionLabel="kind"
                        placeholder="male/female" className="w-full md:w-14rem" />
                </div>
                <br />
                <Button type={"button"} label={" add child"} icon="pi pi-user-plus" severity="danger" aria-label="Cancel" className="button" onClick={addChild} />

                {/* פרטי ילדים */}
                <div className="childrenForm">

                    {children.map((input, index) => {
                        return (
                            <div key={index}>
                                <p className="childTitle">child {index + 1}</p>
                                {/* שם משפחה */}
                                <div className="p-inputgroup flex-1 input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText placeholder="Firstname" onChange={event => handleChildName(index, event)} value={childrenFromStore[index].FirstName} />
                                </div>
                                <br />
                                {/* תעודת זהות */}
                                <div className="p-inputgroup flex-1 input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-id-card"></i>
                                    </span>
                                    <InputText placeholder="IdNumber" onChange={event => handleChildIdNumber(index, event)} value={childrenFromStore[index].IdNumber} />
                                </div>
                                <br />
                                {/* תאריך לידה */}
                                <div className="p-inputgroup flex-1 input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-calendar"></i>
                                    </span>
                                    <Calendar placeholder="date of birth" value={childrenFromStore[index].DateOfBirth} onChange={event => handleChildDateOfBirth(index, event)} />
                                </div>
                                <br />

                                {/* בן או בת */}
                                <div className="p-inputgroup flex-1 input">
                                    <span className="p-inputgroup-addon">
                                        <i className="pi pi-reddit"></i>
                                    </span>
                                    <Dropdown value={childrenFromStore[index].MaleOrFemale} onChange={event => handleChildMaleOrFemale(index, event)}
                                        options={mOf}
                                        optionLabel="kind"
                                        placeholder="male/female" className="w-full md:w-14rem" />
                                </div>
                            </div>
                        )
                    })}
                    <br />
                    <Button type={"submit"} label="Login" severity="danger" className="button" outlined />
                </div>
            </form>
        </>
    )
}