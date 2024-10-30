import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NavbarUser = ()=>{
   const history = useHistory();
   
   const AvailLoan = ()=>{
    history.push("/UserLoanPage");
}
const Updates = ()=>{
   history.push("/UserPayUpdates");
}
const LogOut =()=>{
 localStorage.removeItem("token");
 localStorage.removeItem("userId");
    history.push("/");
}
    return (
        <>
          <header class="text-gray-400  body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
    <img
      class="object-cover object-center rounded-full"
      alt="profile"
      src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/2d20b705-9dac-4f1d-9a01-54ea7557aa4f/6c413449-da83-4063-a7b8-b7bfbb902612.png"
      style={{width: "48px", height: "48px"}}
    />
      <span class="ml-3 text-xl">SwiftLoan</span>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a class="mr-5 hover:text-white cursor-pointer" onClick={AvailLoan}>Avail Loan</a>
      <a class="mr-5 hover:text-white cursor-pointer" onClick={Updates} >Payment Updates</a>
      <a class="mr-5 hover:text-white cursor-pointer" onClick={LogOut} >Log Out</a>
    </nav>
   
  </div>
</header>
        </>
    )
}
export default NavbarUser;