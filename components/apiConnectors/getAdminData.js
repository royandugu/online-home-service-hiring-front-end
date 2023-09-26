import { serverUrl } from "../globals/globals";

export const getTotalUsers=async()=>{
    const dataPromise=await fetch(`${serverUrl}/api/V1/system/usersNumber`);
    return dataPromise.json();
}
export const getTotalWorkers=async()=>{
    const dataPromise=await fetch(`${serverUrl}/api/V1/system/workersNumber`);
    return dataPromise.json();    
}
export const getUsers=async ()=>{
    const dataPromise=await fetch(`${serverUrl}/api/V1/system/users`);
    return dataPromise.json();    
}
export const getWorkers=async ()=>{
    const dataPromise=await fetch(`${serverUrl}/api/V1/worker`);
    return dataPromise.json();    
}
export const getHireRecords=async ()=>{
    const dataPromise=await fetch(`${serverUrl}/api/V1/hire`);
    return dataPromise.json();       
}
