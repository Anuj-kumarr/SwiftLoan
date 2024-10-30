# SwiftLoan
Empowering your financial future, one loan at a time


To Start the backend at your backend at localhost at server.js 
app.use(cors({
     origin: 'http://localhost:3000', // Frontend origin
     credentials: true, // if you are using cookies or credentials
   }));

To start Frontend at localhost the add  
at all api add backend address http://localhost:5000

then for backend start  -> node backend/server.js
then for frontend start ->  cd frontend then -> npm start

flow diagram 

Flow Diagram: Loan Application and Payment System

User Authentication

Sign Up / Log In:
User enters credentials (email, password, etc.) to either sign up or log in.
If the login is successful, the user is redirected to the loan application page.
Loan Application Process

Apply for Loan:
User submits a loan application with required details such as loan amount, purpose, income proof, etc.
The application is saved and sent to the admin for verification.
Admin Verification

Loan Verification and Approval:
Admin reviews the user's application details, verifying the documents and information provided.
Decision: Admin either approves or rejects the loan application.
If approved, the user is notified and given access to the loan details, including the payment schedule.
If rejected, the user is informed of the reason.
User Loan Management

View Payment Chart:
Upon loan approval, the user can view a detailed payment chart, including due dates for repayment.
Payment Submission

Make a Payment:
The user selects the amount to pay and submits a reference number (payment ID) along with a screenshot of the payment.
The payment details are then submitted to the admin for verification.
Admin Payment Verification

Verify Payment:
Admin reviews the payment reference number and the screenshot.
Decision: Admin either approves or rejects the payment.
If approved, the payment is recorded, and the user’s balance is updated.
If rejected, the user is notified to resubmit correct payment details.




                            

