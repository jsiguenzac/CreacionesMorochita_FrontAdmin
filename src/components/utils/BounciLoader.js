import React from 'react';
import './DotSpin.css'; 
import { Text } from '@chakra-ui/react';

const DotSpin = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-container">
      <div className="dot-spin"></div>
      <Text className='loading-message' mt={4} fontSize="lg" color="white">
        {message}
      </Text>
    </div>
  );
};

export default DotSpin;
