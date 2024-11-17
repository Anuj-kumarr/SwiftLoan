import React, { useState } from "react";
import NavbarUser from "./NavbarUser";
import Footer from "../../Footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const UserLoanPage = () => {

  const [check, setCheck] = useState(true);

  const history = useHistory();

  const[loan_amt , setLoan_amt] = useState(0);
  const[time , setTime] = useState(0);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const HandleSubmit = async() =>{
    try{

      if(!userId){
          alert("relogin please !");
          return ;
      }
      if(!token){
        alert("relogin please !");
        return ;
    }
       
       const config = {
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`, 
         },
       };
   
       const { data: userData } = await axios.post(
         `https://swiftloan-fzk4.onrender.com/api/loan/${userId}`, 
         {loan_amt,time}, 
         config
       );
       
       if(userData){
         alert("Your Loan Request is in process Wait for Approval ");
        history.push("/MainUserPage");
             
       }
     

    }catch(error){
     alert("error occured");
     console.log(error);
    }
  }

  return (
    <>

<div
  className="  h-screen w-screen"
  style={{
    backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
    backgroundSize: "cover", // Ensures the background covers the entire div
  }}
>
      <NavbarUser />
      {check ? (
        <>
          <section className="text-gray-400  body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                <h1 className="title-font font-medium text-3xl text-white">
                Empowering your financial journey with personalized loan solutions, one step at a time.
                </h1>
               
              </div>
              <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-white text-lg font-medium title-font mb-5">
                  Apply For Loan
                </h2>
                <div className="relative mb-4">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Loan Amount
                  </label>
                  <input
                    type="Loan-amt"
                    id="Loan-Amt"
                    name="Loan-Amt"
                    onChange={(e)=>setLoan_amt(e.target.value)}
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Loan Period(in Weeks)
                  </label>
                  <input
                    type="Loan-period"
                    id="Loan-period"
                    name="Loan-period"
                    onChange={(e)=>setTime(e.target.value)}
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={HandleSubmit}>
                  Submit
                </button>
                
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div>
            <h1> You Have Already Applied for the Loan </h1>
          </div>
        </>
      )}

      <Footer />
      </div>
    </>
  );
};

export default UserLoanPage;
