import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "../../Footer";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PayementReceive = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [paymentData, setPaymentData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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

      const { data } = await axios.get("/api/payment/getDetails", config);
      setPaymentData(data.payments);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handledetails = async (userId) => {
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

      const { data: userData } = await axios.post(`/api/user/get/${userId}`, { userId }, config);
      setUserData(userData);
      setIsUserModalOpen(true);
    } catch (error) {
      alert("Error Occurred");
      console.log(error);
    }
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setUserData(null);
  };

  const handleImageClick = (pic) => {
    setImageUrl(pic);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setImageUrl("");
  };

  const handleApprove = async (userId) => {
    if (!userId) {
      alert("Please try again.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`/api/loan/updateLoan/${userId}`, {}, config);

      if (data) {
        alert("Update successful.");
      }
    } catch (error) {
      console.error("Error updating loan:", error);
      alert("An error occurred while updating the loan.");
    }
  };

  const HandleReject = async (refranceNumber) => {
    if (!refranceNumber) {
      alert("Please try again.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`/api/payment/deletePayment/${refranceNumber}`, config);

      if (data) {
        alert("Deletion successful.");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("An error occurred while deleting the payment.");
    }
  };

  return (
    <>
      <div
        className="fixed h-screen w-screen"
        style={{
          backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/543/485/169/abstract-blue-wallpaper-preview.jpg')",
          backgroundSize: "cover",
        }}
      >
        <NavbarAdmin />
        <section className="text-gray-400 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">Payment Receive Chart</h1>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-semibold text-gray-300 text-sm bg-gray-800">
                      Reference Number
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-semibold text-gray-300 text-sm bg-gray-800">
                      User Details
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-semibold text-gray-300 text-sm bg-gray-800">
                      Screenshot
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-semibold text-gray-300 text-sm bg-gray-800">
                      Accepted
                    </th>
                    <th className="px-4 py-3 title-font tracking-wider font-semibold text-gray-300 text-sm bg-gray-800">
                      Reject
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!paymentData.length ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                        No payment data available.
                      </td>
                    </tr>
                  ) : (
                    paymentData.map((payment, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:text-black">
                        <td className="px-4 py-3 font-medium text-white">{payment.refranceNumber}</td>
                        <td className="px-4 py-3">
                          <button
                            className="inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            onClick={() => handledetails(payment.userId)}
                          >
                            User Details
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="inline-flex border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                            onClick={() => handleImageClick(payment.pic)} // Open image modal on image click
                          >
                            <img src={payment.pic} alt="Screenshot" className="w-10 h-10 rounded" />
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                            onClick={() => handleApprove(payment.userId)}
                          >
                            Approve
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            className="inline-flex text-white border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                            onClick={() => HandleReject(payment.refranceNumber)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      
        {isUserModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={closeUserModal}
          >
            <div className="bg-white p-6 rounded shadow-lg w-1/3" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-bold mb-4">User Details</h2>
              {userData ? (
                <div>
                  <p className="mb-2"><strong>Name:</strong> {userData.name}</p>
                  <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
                  
                </div>
              ) : (
                <p>Loading user details...</p>
              )}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={closeUserModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

      
        {isImageModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={closeImageModal}
          >
            <div className="bg-white p-6 rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
              <img src={imageUrl} alt="Screenshot" className="max-w-full h-auto" />
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                onClick={closeImageModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default PayementReceive;
