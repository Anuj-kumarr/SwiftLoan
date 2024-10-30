import React, { useEffect, useState } from "react";
import NavbarUser from "../UserPages/NavbarUser";
import Footer from "../../Footer";
import NavbarAdmin from "./NavbarAdmin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

const LoanApprove = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [LoanData, setLoanData] = useState();
  const [userData, setUserData] = useState();
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
   
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      
      const { data } = await axios.get(
        "/api/loan/getDetails",
        config
      );
      setLoanData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const ApproveLoan = async (loan_id) => {
    if (!loan_id) {
      alert("unable to approve try again later !");
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
        `/api/loan/getDetails/${loan_id}`,
        {},
        config
      );
      if (data) {
        console.log(data);
        alert("Loan has Been Approved");
        getDetails();
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleDetails = async (userId) => {
    if (!userId) {
      alert("relogin please!");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data: userData } = await axios.post(
        `/api/user/get/${userId}`,
        { userId },
        config
      );
      setUserData(userData);
      setShowModal(true);
    } catch (error) {
      alert("Error Occurred");
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="fixed h-screen w-screen"
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
          backgroundSize: "cover",
        }}
      >
        <NavbarAdmin />
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
                Loan Approval Chart
              </h1>
            </div>
            <div className="lg:w-2/3 w-full mx-auto max-h-96 overflow-y-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                      UserDetails
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                      Amount
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                      Time Period
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                      Approve
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                      Reject
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!LoanData ? (
                    <></>
                  ) : (
                    <>
                      {LoanData.map((loan, index) => (
                        <tr key={loan._id}>
                          <td className="px-4 py-3">
                            <button
                              className="inline-flex text-black bg-white border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                              onClick={() => {
                                handleDetails(loan.UserId._id);
                              }}
                            >
                              User Details
                            </button>
                          </td>
                          <td className="px-4 py-3">{loan.loan_amt}</td>
                          <td className="px-4 py-3">
                            {new Date(loan.createdAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                              onClick={() => {
                                ApproveLoan(loan._id);
                              }}
                            >
                              Approve Loan
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                              Reject Loan
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {showModal && userData && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
              <h2 className="text-2xl font-semibold mb-4">User Details</h2>
              <img
                src={userData.profilePhoto}
                alt="Profile"
                className="w-20 h-20 rounded-full mb-4"
              />
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <div className="mt-6 flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default LoanApprove;
