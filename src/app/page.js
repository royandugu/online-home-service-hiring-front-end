"use client"

import { useState } from "react";

import Header from "../../components/header/header";
import TotalUsers from "../../components/totalUsersContainer/totalUsers";
import TotalWorkers from "../../components/totalWorkersContainer/totalWorkers";

const Page = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <>
        <Header />

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="totalUsers--container">
                <h5> Total Users : </h5>
                <TotalUsers />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="totalWorkers--container">
                <h5> Total Workers : </h5>
                <TotalWorkers />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="totalSettlements--container">
                <h5> Total settlements to be done : </h5>
                <TotalWorkers />
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
        <h1> Login as admin </h1>
        <form className="loginForm">
          <input type="text" placeholder="Email" /> <br />
          <input type="password" placeholder="Password" /> <br />
          <button type="btn btn-success"> Login </button>
        </form>
      </div>
    )
  }
}
export default Page;