

import { produce } from 'immer'


const initialState = {
    FirstName: '',
    LastName: "",
    Hmo: {},
    IdNumber: "",
    DateOfBirth: null,
    MaleOrFemale: {},
    Children: []
};

export const usersReducer = produce((state, action) => {
    switch (action.type) {
        case 'setFirstName': {
            state.FirstName = action.payload;
            break;
        }
        case 'setLastName': {
            state.LastName = action.payload;
            break;
        }
        case 'setIdNumber': {
            state.IdNumber = action.payload;
            break;
        } case 'setHmoid': {
            state.Hmo = action.payload;
            break;
        } case 'setDateOfBirth': {
            state.DateOfBirth = action.payload;
            break;
        } case 'setMaleOrFemale': {
            state.MaleOrFemale = action.payload;
            break;
        }
        case 'addChildren': {
            state.Children = [...state.Children, action.payload]
            break;
        }
        case 'setChildName': {
            state.Children [action.payload.Index].FirstName=action.payload.FirstName;
            break;
        }
        case 'setChildIdNumber': {
            state.Children [action.payload.Index].IdNumber=action.payload.IdNumber;
            break;
        }
        case 'setChildDateOfBirth': {
            state.Children [action.payload.Index].DateOfBirth=action.payload.DateOfBirth;
            break;
        }
        case 'setChildMaleOrFemale': {
            state.Children [action.payload.Index].MaleOrFemale=action.payload.MaleOrFemale;
            break;
        }
        
    }
},
    initialState)
