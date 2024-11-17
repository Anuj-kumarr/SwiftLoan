import React, { useEffect, useState } from "react";
import NavbarUser from "./NavbarUser";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Footer from "../../Footer";
const UserPayUpdates = ()=>{
     const history = useHistory();
     const [chart , setChart] = useState([]);
     const[check ,setCheck] = useState(false);
     
     const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log(userId);

     useEffect(() => {
     
      getDetails();
    }, []);


    const getDetails = async()=>{
      try{

        if(!userId){
            alert("relogin please ! ");
            return ;
        }
  
         
         const config = {
           headers: {
             "Content-Type": "application/json", 
             Authorization: `Bearer ${token}`, 
           },
         };
     
         const {data: userData } = await axios.post(
           `https://swiftloan-fzk4.onrender.com/api/user/get/${userId}`, 
           {userId},
           config
         );
         
         const loanId = userData.loanId;
         console.log(loanId);

         const { data } = await axios.post(`https://swiftloan-fzk4.onrender.com/api/loan/getDetails/${loanId}`,{}, config);
         console.log(data.loan.Amt_chart);
         setChart(data.loan.Amt_chart);
         
         setCheck(()=>setCheck(true));
         
  
      }catch(error){
       alert("Error Occured");
       console.log(error);
      }
    }

    const PayAmt = ()=>{
       history.push("/UserPayment");
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
          <NavbarUser/>
           
           <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
    <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Congrats Your Loan Request  Have Been Accepted</h1>
      <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Payment Recieve Chart</h1>
    
    </div>
    <div class="lg:w-2/3 w-full mx-auto overflow-auto">
    <table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100 text-gray-700">
      <th className="px-4 py-2 text-left font-semibold">Amount Received</th>
      <th className="px-4 py-2 text-left font-semibold">Due Date</th>
      <th className="px-4 py-2 text-left font-semibold">Status</th>
    </tr>
  </thead>
  <tbody> 
     {check === true ? (
           <>
           {chart.map((item, index) => (
      <tr key={index} className="hover:bg-gray-50">
        <td className="px-4 py-3 border border-gray-300 font-roboto">{item.Amt_recived}</td>
        <td className="px-4 py-3 border border-gray-300 font-roboto">{new Date(item.Due_date).toLocaleString()}</td>
        <td className="px-4 py-3 border border-gray-300 font-roboto text-white">
  {item.Status}
</td>
      </tr>
    ))}
           </>
     ):(
        
        <>
           <h2>no Data</h2>
        </>
     )}
    
  </tbody>
  
</table>

    </div>
    <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
     
      <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded" onClick={PayAmt}>Pay Amount</button>
    </div>
  </div>
</section>
<Footer/>
</div>

 
        </>
    )
}

export default UserPayUpdates;
