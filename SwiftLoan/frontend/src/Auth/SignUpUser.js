import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import axios from "axios";
const SignUpUser = () => {
    const [name , setName] = useState();
    const[email ,setEmail] = useState();
    const[password ,setPassword] = useState();
    const[confirmPassword , setCnfPassword] = useState();
    const[phNumber , setphNumber] = useState();
    const[address , setAddress] = useState();
    const[sex ,setSex] = useState();
    const[pic , setPic] = useState();
     
    const history = useHistory();

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
                // console.log(data.url.toString());
               
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
     
    
      if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all the fields");
        return;
      }
    
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    
      try {
        const config = {
          headers: {
            "Content-Type": "application/json", // Correct header key should be "headers", not "header"
          },
        };
    
        const { data } = await axios.post(
          "/api/user",
          { name, email, phNumber, sex, password, pic, address },
          config
        );

        
        alert("Registration successful");
       
        
        localStorage.setItem("userId", data._id);  
        localStorage.setItem("token", data.token); 
    
      

        
        history.push("/MainUserPage"); 
      } catch (error) {
        alert("Error occurred during registration");
        console.log(error);
      }
    };
  return (

     
    <>
     
      <div
  className=" fixed h-screen w-screen"
  style={{
    backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
    backgroundSize: "cover", // Ensures the background covers the entire div
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
            <p className="text-white font-['Roboto'] m-2 p-2 text-center font-bold text-2xl"> Sign Up Form </p>
            <form >
              <div className="relative mb-6">
                <input
                  type="text"
                  name="name"
              
                onChange={(e)=>setName(e.target.value)}
                  className="peer block w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none focus:placeholder:opacity-100"
                  placeholder="Name"
                  required
                />
              </div>

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
                  type="tel"
                  name="phone"
                
                  onChange={(e)=>setphNumber(e.target.value)}
                  className="peer block w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none focus:placeholder:opacity-100"
                  placeholder="Phone Number"
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

              <div className="relative mb-6">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={(e)=>setCnfPassword(e.target.value)}
                  className="peer block w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none focus:placeholder:opacity-100"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="relative mb-6">
                <textarea
                  name="address"
                  onChange={(e)=>setAddress(e.target.value)}
                  className="peer block w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none focus:placeholder:opacity-100"
                  placeholder="Address"
                  required
                />
              </div>

              <div className="relative mb-6 text-white">
                <label className="block mb-2 text-white">Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                   onChange={(e)=>postDetails(e.target.files[0])}
                  className="block w-full"
                />
              </div>

              <div className="relative mb-6">
                <label className="block mb-2 text-white">Sex</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                    
                      onChange={(e)=>setSex(e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2 text-white">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                    onChange={(e)=>setSex(e.target.value)}
                      className="form-radio"
                    />
                    <span className="ml-2 text-white">Female</span>
                  </label>
                </div>
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

export default SignUpUser;
