// Depositcredit.jsx
import React, { useState } from 'react';
import './Depositcredit.css';
import axios from 'axios';
import { useAuth } from './UseAuth';
import './IndividualScore.css'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
const Depositcredit = () => 
{
  const [input, setInput]=useState("")

  const [loanAmount, setLoanAmount] = useState("");
  const { user } = useAuth();
  const [depositInfo, setDepositInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");
  const [creditPurpose, setCreditPurpose] = useState("");
  const [domainOfWork, setDomainOfWork] = useState("");
  const [risk, setRisk] = useState("");
  const [question, setQuestion] = useState("");
  const [recording, setRecording] = useState(false);
   const calculateStrokeDashoffset = (score) => {
    const scoreNormalized = (score - 300) / (850 - 300);
    return circumference - scoreNormalized * circumference;
  };
  const ScoreCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center',
  }));
  const getScoreCategory = (score) => {
    if (score >= 700) return 'score-high';
    if (score >= 550) return 'score-medium';
    return 'score-low';
  };
  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius;

  const handleSubmit = async () => {
    
    setLoading(true);
    try {
      // Step 1: Update the individual's loan amount
      if (user.role === "Individual") {
       await axios.post(`http://127.0.0.1:5000/update_individual_loan_amount/${user.id}`, {
        loan_amount: loanAmount
      });
      } else if (user.role === "Small") {
        await axios.post(`http://127.0.0.1:5000/update_small_enterprise_loan_amount/${user.id}`, {
          loan_amount: loanAmount
        });
      } else if (user.role === "Large") {
         await axios.post(`http://127.0.0.1:5000/update_large_medium_enterprise_loan_amount/${user.id}`, {
          loan_amount: loanAmount
        });
      }
    
      // Step 2: Fetch the decision for the authenticated user
      const decisionResponse = await axios.get(`http://127.0.0.1:5000/predict_loan/${user.id}`);
      let decision = decisionResponse.data.decision;
    
      // Invert the decision if the user's role is "Individual"
      if (user.role === "Individual") {
        decision = decision === 0 ? 1 : 0;
      }
      let scoreResponse;

      if (user.role === "Individual") {
        scoreResponse = await axios.get(`http://127.0.0.1:5000/ScoreIndividual/${user.id}`);
      } else if (user.role === "Small") {
        scoreResponse = await axios.get(`http://127.0.0.1:5000/ScoreSmallEntreprise/${user.id}`);
      } else if (user.role === "Large") {
        // Assuming you need to send a POST request for large enterprises
        scoreResponse = await axios.post(`http://127.0.0.1:5000/predict`, { user_id: user.id });
      }
      let score = scoreResponse.data.scores[0].score;
      // Step 3: Create a new instance of the deposit
      await axios.post('http://127.0.0.1:5000/create_deposit', {
        user_id: user.id,
        loan_amount: loanAmount,
        decision: decision,
        score: score // Include the score in the deposit creation

      });
      setDepositInfo({
        decision: decision, // Replace with actual decision logic
        score: score // Replace with actual score logic
      });
    } catch (error) {
      console.error('Error submitting deposit:', error);
      // Handle the error appropriately
    }
    setLoading(false);

  };


  const startRecording = async () => {
    setRecording(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    // recognition.lang = 'ar-SA';
  
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      try {
        const response = await axios.post("http://127.0.0.1:5000/select-loan-application", {
          "text": transcript
        });
        console.log("question : ", transcript);
        console.log("Response from server : ", response.data);
        console.log("Credit amount from server : ", response.data.Response.credit_amount);
        console.log("credit_purpose from server : ", response.data.Response.credit_purpose);
        console.log("domain_of_work from server : ", response.data.Response.domain_of_work);

        if (response.data.Response.credit_amount != null) {
          document.querySelector('input[name="credit"]').value = response.data.Response.credit_amount;
        }
        if (response.data.Response.credit_purpose != null) {
          document.querySelector('input[name="credit-purpose"]').value = response.data.Response.credit_purpose;
        }
        if (response.data.Response.domain_of_work != null) {
          document.querySelector('input[name="domain"]').value = response.data.Response.domain_of_work;
        }
      } catch (error) {
        console.error("Error while sending request:", error);
      } finally {
        setRecording(false);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setRecording(false);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();
  };



  const handleInputChange = (e) => {
    setLoanAmount(e.target.value);
    setInput(e.target.value);
  };
  const handleclick =async()=>{
    const Response = await axios.post("http://127.0.0.1:5000/recommend"
    ,{"rejection_cause":input})
    console.log("response is ",Response)
    //Response.data.rejection_cause
  }
  const Risklvl=async()=>
  { const email=localStorage.getItem("email")
    const Response = await axios.post("http://127.0.0.1:5000/predict",
    {
      "rejection_cause":email 
  });
  setRisk(Response.data.Risk_Level)
    console.log("response is ",Response)
  }

  return (
    <div className="deposit-credit-container">
    <div className="credit-form">
      <h3 style={{ textAlign: 'center', color: '#573E06' }}>Enter your credit amount here</h3>
      
      {/* Moved the vocal button inside the form group */}
      <div className="form-group">
        <button
          className={`vocal-button ${recording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-200'}`}
          onClick={recording ? null : startRecording}
          disabled={recording}
        >
          🎤 Vocal
        </button>
        <label htmlFor="credit">Credit Amount:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick=  {handleclick} className="icon-button">✉️</button>
          <input  onChange={handleInputChange} type="text" id="credit" name="credit" placeholder="Your amount" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="credit-purpose">Credit Purpose:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="icon-button">✉️</button>
          <input type="text" id="credit-purpose" name="credit-purpose" placeholder="Your credit purpose" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="domain">Domain of Work:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="icon-button">✉️</button>
          <input type="text" id="domain" name="domain" placeholder="Your domain" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleSubmit} className="loan-button">Send Loan</button>
      </div>
      </div>

      {depositInfo && (

                <div className="result-box">


          <Typography variant="h5" component="div">
            Credit Scoring for Individuals
          </Typography>
          <Box className="score-circle" sx={{ mt: 2 }}>
          <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
              >
                {/* Define gradients for stroke colors */}
                <defs>
                  <linearGradient id="LowScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#e74c3c', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#c0392b', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="MediumScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#f1c40f', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#f39c12', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="HighScoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#27ae60', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2ecc71', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle
                  className={`circle ${getScoreCategory(depositInfo.score)}`}
                  cx="100"
                  cy="100"
                  r={radius}
                  style={{
                    '--final-offset': `${calculateStrokeDashoffset(depositInfo.score)}`
                  }}
                />
              </svg>
          </Box>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {depositInfo.score}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Decision: {depositInfo.decision === 0 ? 'Rejected' : 'Accepted'}
          </Typography>
          </div>

       
      )}
    </div>
  );
};

export default Depositcredit;
 
