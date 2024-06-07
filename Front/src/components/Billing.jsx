import React, { useState } from "react";
import { apple, google } from "../assets";
import styles, { layout } from "../style";

const Billing = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]); // State to store recommended courses

  const handleRecommendation = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rejection_cause: "credit_score" }), // Directly using "credit_score" as rejection_cause
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
  
      const data = await response.json(); // Parse JSON response
      setRecommendedCourses(data.recommended_courses);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
    }
  };

  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <button
          onClick={handleRecommendation}
          style={{
            textDecoration: "underline",
            color: "blue",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Get your recommendation right now
        </button>
        {/* Display recommended courses */}
        {recommendedCourses.length > 0 && (
          <ul>
            {recommendedCourses.map((course, index) => (
              <li key={index}>
                <a href={course} target="_blank" rel="noopener noreferrer">
                  {course}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Your Friendly <br className="sm:block hidden" /> Recommendation System
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          With One Click Get specific PDF recommendations
        </p>

        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img
            src={apple}
            alt="google_play"
            className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
          />
          <img
            src={google}
            alt="google_play"
            className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
};

export default Billing;
