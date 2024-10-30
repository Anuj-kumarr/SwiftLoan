import React from "react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../../Footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainAdminPage = ()=>{

  const history = useHistory();

   const LoanRequest = ()=>{
      history.push("/LoanApprove");
   }
   const PaymentUp = ()=>{
      history.push("/PaymentReceive");
   }
    return (
        <>
<div
  className=" fixed h-screen w-screen"
  style={{
    backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
    backgroundSize: "cover", // Ensures the background covers the entire div
  }}
>
   <NavbarAdmin/>
    
    <section class="text-gray-400  body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
      <img class="object-cover object-center rounded" alt="hero" src="https://media.licdn.com/dms/image/v2/D5612AQEfCp1kdjcGsg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1697451421663?e=2147483647&v=beta&t=w-3yG3XviSUk2cPTHjDyLw6PJHpCdWh9e0MLa8W4q1g"/>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Bridging your needs with swift financial support.
        <br/> 
      </h1> 
     
      <div class="flex justify-center">
      <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg" onClick={LoanRequest}>Check Loan</button>
        <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg" onClick={PaymentUp}>Payment Updates</button>
      </div>
    </div>
  </div>
</section>
 <Footer/>
</div>
 
        </>
    )
}
export default MainAdminPage;