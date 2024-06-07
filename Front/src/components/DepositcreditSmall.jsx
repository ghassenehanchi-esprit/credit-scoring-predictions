import React, { useState } from 'react';
import './Depositcredit.css';
import axios from 'axios';


const DepositcreditSmall = ({ user_id }) => {
  const [creditAmount, setCreditAmount] = useState("");
  const [creditPurpose, setCreditPurpose] = useState("");
  const [domainOfWork, setDomainOfWork] = useState("");
  const [risk, setRisk] = useState("");
  const [question, setQuestion] = useState("");
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    setRecording(true);
    setQuestion("");
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuestion(transcript);
      setRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setRecording(false);
    };

    recognition.onend = async () => {
      setRecording(false);
      try {
        const response = await axios.post("http://127.0.0.1:5000/select-loan-application", {
          "text": question
        });
        console.log("question : ", question);
        console.log("Response from server : ", response.data);

        // Set values to the corresponding state variables
        
          setCreditAmount(response.data.credit_amount);
        
        
          setCreditPurpose(response.data.credit_purpose);
        
        
          setDomainOfWork(response.data.domain_of_work);
      } catch (error) {
        console.error("Error while sending request:", error);
      }
    };

    recognition.start();
  };

  return (
    <div className="credit-form">
      <h3 style={{ textAlign: 'center', color: '#573E06' }}>Enter your credit amount here</h3>

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
          <button className="icon-button">✉️</button>
          <input
            type="text"
            id="credit"
            name="credit"
            placeholder="Your amount"
            style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }}
            onChange={(e) => setCreditAmount(e.target.value)}
            value={creditAmount}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="credit-purpose">Credit Purpose:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="icon-button">✉️</button>
          <input
            type="text"
            id="credit-purpose"
            name="credit-purpose"
            placeholder="Your credit purpose"
            style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }}
            onChange={(e) => setCreditPurpose(e.target.value)}
            value={creditPurpose}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="domain">Domain of Work:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="icon-button">✉️</button>
          <input
            type="text"
            id="domain"
            name="domain"
            placeholder="Your domain"
            style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }}
            onChange={(e) => setDomainOfWork(e.target.value)}
            value={domainOfWork}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="loan-button">Send Loan</button>
      </div>
      {risk && <span>Risque : {risk}</span>}
    </div>
  );
};

export default DepositcreditSmall;
