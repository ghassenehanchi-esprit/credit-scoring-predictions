import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import './IndividualScore.css'; // Import the CSS file for styling
import "./SmallScore.css"
const ScoreCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const IndividualScore = ({ user_id }) => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/ScoreIndividual/${user_id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch scores');
      }
      const data = await response.json();
      setScore(data.scores[0].score); // Assuming 'scores' is an array and we're interested in the first score
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius;

  const calculateStrokeDashoffset = (score) => {
    const scoreNormalized = (score - 300) / (850 - 300);
    return circumference - scoreNormalized * circumference;
  };

  const getScoreCategory = (score) => {
    if (score >= 700) return 'score-high';
    if (score >= 550) return 'score-medium';
    return 'score-low';
  };

  return (
    <ScoreCard style={{backgroundColor:"#F3F1F3"}}>
      <CardContent className='CardContent' style={{height:"300px"}}>
        {!score && !loading && (
          <button className="btnnn" onClick={fetchScores} disabled={loading}>
            <svg style={{top:"20.2%" , marginLeft:"669px"}} width="180px" height="60px" viewBox="0 0 180 60" >
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span style={{top:"50%" , right:"50%"}}>Get Your Score</span>
          </button>
        )}
        {loading && <CircularProgress />}
        {score && (
          <>

            <Box className="score-circle" sx={{ mt: 2 }} style={{marginLeft:"19%" , marginTop:"1%" , scale:"1.6"}}>
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
                  className={`circle ${getScoreCategory(score)}`}
                  cx="100"
                  cy="100"
                  r={radius}
                  style={{
                    '--final-offset': `${calculateStrokeDashoffset(score)}`
                  }}
                />
              </svg>
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              <div style={{color:"grey"}}>
                Your Score is : {score}
              </div>
            </Typography>
            
          </>
        )}
      </CardContent>
    </ScoreCard>
  );
};

export default IndividualScore;
