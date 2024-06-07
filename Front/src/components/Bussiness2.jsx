import styles, { layout } from "../style";
import airbnbImage from "../assets/airbnb.png";
import giphyGif from "../assets/giphy.gif"; // Import the GIF file
import SmallScore from "./SmallScore"
import Depositcredit from "./Depositcredit";
import IndividualScore from "./IndividualScore";



const Bussiness2 = ({user_id}) => (
  <section id="features" className={layout.section}>
    <div className="flex justify-between gap-4">
      {/* Section for Carthago solution */}
      <div className={`flex-1 ${layout.sectionInfo}`}>
        <div className="mb-10">
          <h2 className={`${styles.heading2} text-gold`} style={{ color: 'rgba(218, 165, 32, 0.9)' }}>
            <br className="sm:block hidden" />
            Get Your Score With A Simple Click
          </h2>
          <div className="bg-gold rounded-lg shadow-lg flex flex-col justify-between h-full overflow-hidden transform transition duration-300 hover:scale-105" style={{padding:" 5.5% 3%" , width:"100%"}}>
            <IndividualScore user_id={user_id}/>
          </div>
        </div>
      </div>

      {/* Small gap */}
      <div className="w-4" />

      {/* Section for credit scoring */}
      <div className={`flex-1 ${layout.sectionInfo}`}>
        <div className="mb-10">
          <h2 className={`${styles.heading2} text-gold`} style={{ color: 'rgba(218, 165, 32, 0.9)',marginLeft:"100px" }}>
            <br className="sm:block hidden" />
              Simple Loan Application
          </h2>
          <div className="bg-gold rounded-lg shadow-lg flex flex-col justify-between h-full overflow-hidden transform transition duration-300 hover:scale-105" style={{width:"140%"}}>
            <Depositcredit/>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Bussiness2;
