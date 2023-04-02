import axios from 'axios';
axios.defaults.baseURL = "https://localhost:7080/api/";



 export async  function getHmos(){
  const result = await axios.get(`Hmo`)
    return result.data;
}

 export async function postPerson(user){
  const result = await axios.post(`Person`, user)
  return result.data;
}
 export async function postFatherAndChild(family){
  const result = await axios.post(`FatherAndChild`,family)
  return result.data;
 };

 
