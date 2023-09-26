"use client"

import { useState, useEffect } from "react";
import { loginAdmin } from "../../components/apiConnectors/loginAdmin";
import { getTotalUsers, getTotalWorkers, getUsers, getWorkers, getHireRecords } from "../../components/apiConnectors/getAdminData";
import { setSettled } from "../../components/apiConnectors/patchRequestors";

import Header from "../../components/header/header";

const Page = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [hires, setHires] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const totalUsers = await getTotalUsers();
      const totalWorkers = await getTotalWorkers();
      const userData = await getUsers();
      const workerData = await getWorkers();
      const hireData = await getHireRecords();


      setUsers(userData.users);
      setWorkers(workerData.workers);

      setTotalUsers(totalUsers.totalUsers);
      setTotalWorkers(totalWorkers.totalWorkers);
      setHires(hireData.hireRecords);
    }
    getData();
  }, [])

  const sendAdminLoginRequest = async (e) => {
    e.preventDefault();
    const body = {
      phoneNumber: phoneNumber,
      password: password
    }
    const response = await loginAdmin(body);
    if (response.loginStatus) setLoggedIn(true);
  }

  const sendSettlementRequest=async (id,i)=>{
    const settlementResponse=await setSettled(id);
    
    const hireDemo=[...hires];
    hireDemo[i]=settlementResponse.hireRecords;
    setHires(hireDemo);
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
                  {workers.map(wkr => (
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
            <div className="col-lg-6 col-md-6 col-12">
              <div className="totalSettlements--container">
                <h1> Total hires : </h1>
                <div className="totalSettlements--container--child">
                  {
                    hires.map(hr => (
                      <div className="hireFlex">
                        <h5 style={{ fontWeight: "bold" }}> {`${hr.userData.firstName} hired ${hr.workerData.firstName}`} </h5>
                        <h5 style={{ marginTop: 30 }}> {`${hr.userData.firstName} details : `} </h5>
                        <p> {`user_id: ${hr.userData._id}`} </p>
                        <p> {`Full name: ${hr.userData.firstName} ${hr.userData.lastName}`} </p>
                        <p style={{ color: "grey" }}> {`Phone number: ${hr.userData.phoneNumber}`} </p>
                        <h5 style={{ marginTop: 30 }}> {`${hr.workerData.firstName} details : `} </h5>
                        <p> {`user_id: ${hr.workerData._id}`} </p>
                        <p> {`Full name: ${hr.workerData.firstName} ${hr.workerData.lastName}`} </p>
                        <p style={{ color: "grey" }}> {`Phone number: ${hr.workerData.phoneNumber}`} </p>
                        <div className="hireFlex--child">
                          <h5 style={{ fontWeight: "bold" }}> Hire details :  </h5>
                          <p> {`date: ${hr.serviceDate.toString()}`} </p>
                          <p> {`Service cost: ${hr.serviceCost}`} </p>
                          <p className={hr.settled ? "text-success" : "text-danger"} style={{ fontWeight: "bold" }}> {`Settled: ${hr.settled ? 'True' : 'False'}`} </p>
                          <p className={hr.completed ? "text-success" : "text-danger"} style={{ fontWeight: "bold" }}> {`Completed: ${hr.completed ? 'True' : 'False'}`} </p>

                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="totalSettlements--container">
                <h5> Total settlements to be done : </h5>
                <div className="totalSettlements--container--child">
                  {
                    hires.map((hr,i) => (
                      !hr.settled && (<div className="hireFlex">
                        <h5 style={{ fontWeight: "bold" }}> {`${hr.userData.firstName} hired ${hr.workerData.firstName}`} </h5>
                        <h5 style={{ marginTop: 30 }}> {`${hr.userData.firstName} details : `} </h5>
                        <p> {`user_id: ${hr.userData._id}`} </p>
                        <p> {`Full name: ${hr.userData.firstName} ${hr.userData.lastName}`} </p>
                        <p style={{ color: "grey" }}> {`Phone number: ${hr.userData.phoneNumber}`} </p>
                        <h5 style={{ marginTop: 30 }}> {`${hr.workerData.firstName} details : `} </h5>
                        <p> {`user_id: ${hr.workerData._id}`} </p>
                        <p> {`Full name: ${hr.workerData.firstName} ${hr.workerData.lastName}`} </p>
                        <p style={{ color: "grey" }}> {`Phone number: ${hr.workerData.phoneNumber}`} </p>
                        <div className="hireFlex--child">
                          <h5 style={{ fontWeight: "bold" }}> Hire details :  </h5>
                          <p> {`date: ${hr.serviceDate.toString()}`} </p>
                          <p className={hr.settled ? "text-success" : "text-danger"} style={{ fontWeight: "bold" }}> {`Settled: ${hr.settled ? 'True' : 'False'}`} </p>
                          <p className={hr.completed ? "text-success" : "text-danger"} style={{ fontWeight: "bold" }}> {`Completed: ${hr.completed ? 'True' : 'False'}`} </p>
                          <button className="btn btn-success" onClick={()=>{
                            console.log(hr);
                            sendSettlementRequest(hr._id,i)
                          }}> Set settled </button>
                        </div>
                      </div>)
                    ))
                  }
                </div>
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
        <img src="https://media.discordapp.net/attachments/1041386818907672659/1056948735747297331/image.png?ex=651399f7&is=65124877&hm=12b7bcef53c42d0fea88cc5b1a72cd86fd67f8d9a97aa9e0253cce776eabf3d0&=" className="logo" />
        <h1> LOGIN AS ADMIN </h1>
        <form className="loginForm" onSubmit={sendAdminLoginRequest}>
          <input type="text" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} /> <br />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> <br />
          <button className="btn btn-success"> Login </button>
        </form>
      </div>
    )
  }
}
export default Page;