import React, { useEffect, useState } from "react";
import NavbarUser from "./NavbarUser";
import Footer from "../../Footer";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserPayment = ()=>{
    const history = useHistory();


 const[pic , setPic] = useState();
const[amt ,setAmt] = useState(0);
 const[refranceNumber, setRefranceNumber] = useState();
 const[name ,setName] = useState();
 const userId = localStorage.getItem("userId");
 const token = localStorage.getItem("token");




 
 
    const postDetails = (pics)=>{
        
        if(pics == undefined){
            alert("please select an image ");
            return;
        }
        if(pics.type ==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","Mini-loan-app");
            data.append("cloud_name","mahisingh");
            fetch("https://api.cloudinary.com/v1_1/mahisingh/image/upload",{
                method:"post",
                body:data,

            }).then((res)=>res.json())
              .then((data)=>{
                setPic(data.url.toString());
                
               
              })
              .catch((err)=>{
                console.log(err);
              
              });

        }
        else{
           
            return;
            
        }

    }

    const HandleSubmit = async () => {
     
    
        if (!refranceNumber) {
          alert("Please fill all the fields");
          return;
        }
      
       
      
        try {
          const config = {
            headers: {
              "Content-Type": "application/json", 
               Authorization: `Bearer ${token}`,
            },
          };
      
          const { data } = await axios.post(
            `https://swiftloan-fzk4.onrender.com/api/payment/${userId}`,
            {refranceNumber, pic },config
          );

          console.log(data);
  
          
          alert(" submit successful");
               
          history.push("/MainUserPage");
        } catch (error) {
          alert("Error occurred during registration");
          console.log(error);
        }
      };
  
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


 <section class="text-gray-600 body-font relative">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-12">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Hii ,{name}</h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">Pay your bills on time to keep peace of mind; financial freedom is a journey, not a destination</p>
    </div>
    <div class="lg:w-1/2 md:w-2/3 mx-auto">
      <div class="flex flex-wrap -m-2">
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="name" class="leading-7 text-sm text-white">Amount</label>
            <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e)=>setAmt(e.target.value)}/>
          </div>
        </div>
        <div class="p-2 w-1/2">
          <div class="relative">
            <label for="paymentNo." class="leading-7 text-sm text-white">Payment / Referance Number</label>
            <input type="paymentNo" id="paymentNo." name="paymentNo." class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e)=>setRefranceNumber(e.target.value)}/>
          </div>
        </div>
        <div class="p-2 w-full">
          <div class="relative">
            <label for="message" class="leading-7 text-sm text-gray-600">ScreenShot</label>
            <input
                  type="file"
                  name="profilePic"
                   onChange={(e)=>postDetails(e.target.files[0])}
                  className="block w-full"
                />
          </div>
        </div>
        <div class="p-2 w-full">
          <button class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={HandleSubmit}>Submit</button>
        </div>
        <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
          <a class="text-indigo-500">anujkumar48227@gmail.com</a>
          <p class="leading-normal my-5">MNNIT ALLAHABAD
          </p>
          
        </div>
      </div>
    </div>
  </div>
</section>
 <Footer/>

</div>
        </>
    )
}

export default UserPayment;
