import React from "react";
import NavbarUser from "./NavbarUser";
import Footer from "../../Footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const MainUserPage = ()=>{

  const history = useHistory();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  console.log(userId);

  

  const ApplyLoan = async()=>{
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
      
          const { data: userData } = await axios.post(
            `https://swiftloan-fzk4.onrender.com/api/user/get/${userId}`, 
            {userId}, 
            config
          );
          
          if (userData.loanTaken) {
            alert("You already have a loan assigned.");
            return;
          }

          history.push("/UserLoanPage");
        

       }catch(error){
        alert("Already Have a loan ");
        console.log(error);
       }
      
      
  }

  const CheckUpdates = async()=>{

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
       
       
       console.log(userData);
       if(userData.loanTaken){
        alert("your loan is accpeted");
        history.push("/UserPayUpdates")
       }else{
         alert(" Your Request is Not approved Yet");
       }

    }catch(error){
     alert("Error Occured");
     console.log(error);
    }
    
}
    return (
        <>
              <div
  className="  h-screen w-screen"
  style={{
    backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
    backgroundSize: "cover",
  }}
>

<NavbarUser/>

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
      <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg" onClick={ApplyLoan}>Apply Loan</button>
        <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg" onClick={CheckUpdates}>Updates</button>
      </div>
    </div>
  </div>
</section>


<Footer/>

</div>

        </>
    )
}
export default MainUserPage;
