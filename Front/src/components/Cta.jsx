import styles from "../style";
import Button from "./Button";
import "./Cta.css"

const CTA = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col" style={{height:"450px"}}>
      <h2 className={styles.heading2} style={{width:"250px"}}>Ensure Your </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Everything you need to Improve Your Credit Score and grow your financial status
        anywhere on the planet.
      </p>

      {/* Add the additional information here */}
      <br /><br /><br />
      <div className="text-white mt-5">
        <p>4800+ User Active</p>
        <p>230+ Trusted by Company</p>
      </div>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
    <link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'/>
      <h1 className="hahahaha">
        <em>G</em>
        <em class="planet left">R</em>
        <em>O</em>
        <em>W</em>
        <em class="planet right">T</em>
        <em>H</em>
      </h1>
    </div>
  </section>
);

export default CTA;
