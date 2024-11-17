import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const LoginAdmin = () => {

    const history = useHistory();
    
    
    const[email ,setEmail] = useState();
    const[password ,setPassword] = useState();
     

    
    const HandleSubmit = async()=>{
        if( !email|| !password ){
            alert("please fill all the fields")
            return; 
         }
        
         try{
          const config = {
            headers:{
                "Content-type":"application/json",
            },
          };
        
          const {data} = await axios.post(
            "https://swiftloan-fzk4.onrender.com/api/admin/login",
            {email,password },
             config
            ); 
            alert("Login successful ");
            localStorage.setItem("token",data.token);
            localStorage.setItem("AdminId",data._id);

    
            
            history.push("/MainAdminPage");
    
         }
         catch(error){
            alert("error occured")
            console.log(error);
         }
       
    }
  return (

     
    <>
     
      <div
  className=" fixed h-screen w-screen"
  style={{
    backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
    backgroundSize: "cover", 
  }}
  >
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            <div className="md:w-8/12 lg:ms-6 lg:w-3/12 lg:mr-20  overflow-y-scroll h-96  border border-gray-300 rounded-md p-4">
            <p className="text-white font-['Roboto'] m-2 p-2 text-center font-bold text-2xl"> Admin</p>
            <form >
              

              <div className="relative mb-6">
                <input
                  type="email"
                  name="email"
                  
                   onChange={(e)=>setEmail(e.target.value)}
                  className="peer block w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none focus:placeholder:opacity-100"
                  placeholder="Email"
                  required
                />
              </div>


              <div className="relative mb-6">
                <input
                  type="password"
                  name="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="peer block w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none focus:placeholder:opacity-100"
                  placeholder="Password"
                  required
                />
              </div>

              </form>

              <button class=" inline-flex  text-white  border-0 py-2 px-6  focus:outline-none hover:bg-indigo-600 rounded text-lg item-center" onClick={HandleSubmit}>Submit</button>
 
            </div>
          </div>
        </div>
      </section>

      </div>
    </>
  );
};

export default LoginAdmin;
