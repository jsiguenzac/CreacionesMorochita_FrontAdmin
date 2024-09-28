import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const Loading = ({ message = "Cargando...", size = "xl", ...rest }) => {
  return (
    <Flex
      position="fixed" // Fijo en la pantalla para que siempre esté centrado
      top="0"
      left="0"
      width="100vw" // Ancho completo de la ventana
      height="100vh" // Alto completo de la ventana
      justifyContent="center" // Centrar horizontalmente
      alignItems="center" // Centrar verticalmente
      backgroundColor="rgba(0, 0, 0, 0.5)" // Fondo oscuro semitransparente
      zIndex="9999" // Asegura que esté encima de todo
      direction="column"
      {...rest}
    >
      <Spinner size={size} thickness="4px" speed="0.65s" color="#5c2cfc" />
      <Text mt={4} fontSize="lg" color="white">
        {message}
      </Text>
    </Flex>
  );
};

export default Loading;
