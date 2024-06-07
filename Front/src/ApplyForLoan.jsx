import React from 'react';
import { Navbar , SideBarSmall , DepositcreditSmall } from './components'; // Assuming Navbar is correctly imported
import { useParams } from 'react-router-dom';

const ApplyForLoan = () => {
  const { user_id } = useParams();

  return (
    <div className="bg-primary w-full overflow-hidden">
      <Navbar />
      <SideBarSmall/>
      <DepositcreditSmall user_id={user_id}/>
    </div>
  );
};

export default ApplyForLoan;
