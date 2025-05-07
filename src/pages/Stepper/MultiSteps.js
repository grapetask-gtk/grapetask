import React from 'react';
import Navbar from '../../components/Navbar';
import MultiStep from '../../components/Stepper/MultiStep';
import '../../style/multistep.scss'
const MultiSteps = () => {
  return (
    <>
            <Navbar FirstNav='none' />
            <div>
                <MultiStep/>
            </div>
      
    </>
  );
}

export default MultiSteps;
