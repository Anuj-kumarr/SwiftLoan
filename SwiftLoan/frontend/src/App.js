import React from "react";
import { Route} from "react-router-dom"; 
import FrontPage from "./FrontPage";
import SignUpUser from "./Auth/SignUpUser";
import LoginUser from "./Auth/LoginUser";
import LoginAdmin from "./Auth/LoginAdmin";
import MainUserPage from "./Pages/UserPages/MainUserPage";
import MainAdminPage from "./Pages/AdminPages/MainAdminPage";
import UserLoanPage from "./Pages/UserPages/UserLoanPage";
import UserPayUpdates from "./Pages/UserPages/UserPayUpdates";
import PayLoanAmt from "./Pages/UserPages/PayLoanAmt";
import LoanApprove from "./Pages/AdminPages/LoanApprove";
import PayementReceive from "./Pages/AdminPages/PaymentRecieve";
import UserPayment from "./Pages/UserPages/UserPayment";
import SignUpAdmin from "./Auth/SignUpAdmin";

const App = () => {
  return (
    <div className="App">
      
        <Route path="/" component={FrontPage} exact />
        <Route path="/UserSignUp" component = {SignUpUser} />
        <Route path="/AdminSignUp" component = {SignUpAdmin} />
        <Route path="/LoginUser" component = {LoginUser} />
        <Route path="/LoginAdmin" component = {LoginAdmin} />
        <Route path="/MainUserPage" component = {MainUserPage} />
        <Route path="/MainAdminPage" component = {MainAdminPage} />
        <Route path="/UserLoanPage" component = {UserLoanPage} />
        <Route path="/UserPayUpdates" component = {UserPayUpdates} />
        <Route path="/PayLoanAmt" component = {PayLoanAmt} />
        <Route path="/LoanApprove" component = {LoanApprove} />
        <Route path="/PaymentReceive" component = {PayementReceive} />
        <Route path="/UserPayment" component = {UserPayment} />

        
      
    </div>
  );
};

export default App;
