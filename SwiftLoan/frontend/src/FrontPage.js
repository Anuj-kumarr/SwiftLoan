import React from "react";
import Footer from "./Footer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const FrontPage = ()=>{
   const history  = useHistory();

   const LoginPage = ()=>{
       history.push("LoginUser");
   }
   const SignUpUser = ()=>{
       history.push("/UserSignUp");
   }
   const AdminLogin = ()=>{
       history.push("/LoginAdmin");
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
    <header class="text-gray-600 body-font">
  
  <div class="container mx-auto flex flex-wrap p-5 items-center justify-between">
 
  <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    <img
      class="object-cover object-center rounded-full"
      alt="profile"
      src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/2d20b705-9dac-4f1d-9a01-54ea7557aa4f/6c413449-da83-4063-a7b8-b7bfbb902612.png"
      style={{width: "48px", height: "48px"}}
    />
    <span class="ml-3 text-xl text-white">SwiftLoan</span>
  </a>

 
  <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base" onClick={AdminLogin}>
    Admin Login
  </button>
</div>

</header>


          <section class="text-gray-600 body-font h-35">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white ">SwiftLoan: Your Quick Financial Solution
        
      </h1>
      <p class="mb-8 leading-relaxed text-white text-2xl">Empowering your financial future, one loan at a time</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={LoginPage}>Login</button>
        <button class="inline-flex text-white  border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={SignUpUser}>Sign Up</button>
        
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src="https://media.zinnov.com/wp-content/uploads/2023/08/india-finance-centers-of-excellence-coes-landscape-featured.png"/>
    </div>
  </div>
</section>
         <Footer/>
</div>
        </>
    )
}

export default FrontPage;