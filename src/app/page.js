"use client"

import { useState, useEffect } from "react";
import { loginAdmin } from "../../components/apiConnectors/loginAdmin";
import { getTotalUsers, getTotalWorkers, getUsers,getWorkers } from "../../components/apiConnectors/getAdminData";

import Header from "../../components/header/header";

const Page = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [phoneNumber,setPhoneNumber]=useState(" ");
  const [password,setPassword]=useState(" ");
  const [totalUsers,setTotalUsers]=useState(0);
  const [totalWorkers,setTotalWorkers]=useState(0);
  const [users,setUsers]=useState([]);
  const [workers,setWorkers]=useState([]);

  useEffect(()=>{
    const getData=async ()=>{
      const totalUsers=await getTotalUsers();
      const totalWorkers=await getTotalWorkers();
      const userData=await getUsers();
      const workerData=await getWorkers();
      

      setUsers(userData.users);
      setWorkers(workerData.workers);

      setTotalUsers(totalUsers.totalUsers);
      setTotalWorkers(totalWorkers.totalWorkers);
    }
    getData();
  },[])

  const sendAdminLoginRequest=async (e)=>{
    e.preventDefault();
    const body={
      phoneNumber:phoneNumber,
      password:password
    }
    const response=await loginAdmin(body);
    if(response.loginStatus) setLoggedIn(true);
  }

  if (loggedIn) {
    return (
      <>
        <Header />

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="totalUsers--container">
                <h5> Total Users : </h5>
                <h1> {totalUsers} </h1>

                <div className="usersContainer">
                  {users.map(usr => (
                    <div className="indvUserContainer">
                      <h5> {`${usr.firstName} ${usr.lastName}`} </h5>
                      <p> {usr.address} </p>
                      <p> {usr.phoneNumber} </p>
                      <a href={`tel:${usr.phoneNumber}`}><button className="btn btn-success"> Contact </button></a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="totalWorkers--container">
                <h5> Total Workers : </h5>
                <h1> {totalWorkers} </h1>
                <div className="workersContainer">
                  {workers.map(wkr=>(
                    <div className="indvUserContainer">
                      <h5> {`${wkr.firstName} ${wkr.lastName}`}  </h5>
                      <p> {wkr.address} </p>
                      <p> {wkr.phoneNumber} </p>
                      <a href={`tel:${wkr.phoneNumber}`}><button className="btn btn-success"> Contact </button></a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="totalSettlements--container">
                <h5> Total settlements to be done : </h5>
              </div>
            </div>
          </div>
        </div>
      </>

    )
  }
  else {
    return (
      <div className="flex loginForm--container">
        <img src="https://media.discordapp.net/attachments/1041386818907672659/1056948735747297331/image.png?ex=651399f7&is=65124877&hm=12b7bcef53c42d0fea88cc5b1a72cd86fd67f8d9a97aa9e0253cce776eabf3d0&=" className="logo"/>
        <h1> LOGIN AS ADMIN </h1>
        <form className="loginForm" onSubmit={sendAdminLoginRequest}>
          <input type="text" placeholder="Phone number" onChange={(e)=>setPhoneNumber(e.target.value)}/> <br />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/> <br />
          <button className="btn btn-success"> Login </button>
        </form>
      </div>
    )
  }
}
export default Page;