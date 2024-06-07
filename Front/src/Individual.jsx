import { Navbar , IndividualScore , CLientUp , Bussiness2 , Billing , CardDeal , Testimonials, Clients ,CTA , Footer , ChatBot } from "./components";
import { useParams } from 'react-router-dom';
import styles from "./style";

const Individual = () => {
  const { user_id } = useParams();
  
  return (
    <>
       <div className="bg-primary w-full overflow-hidden">
       

       <div className={`${styles.paddingX} ${styles.flexCenter}`}>
         <div className={`${styles.boxWidth}`}>
           <Navbar />
          
         </div>
       </div>
   
       <div className={`bg-primary ${styles.flexStart}`}>
         <div className={`${styles.boxWidth}`}> 
           <CLientUp />
         </div>
       </div>
       
       <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
         <div className={`${styles.boxWidth}`}>
           <Bussiness2 user_id={user_id}/>
           <Billing />
           <CardDeal />
           <Testimonials />
           <Clients />
           <CTA />
           <Footer />
         </div>
       </div>
     </div>
      <ChatBot user_id={user_id}/>
    </>
  );
};

export default Individual;