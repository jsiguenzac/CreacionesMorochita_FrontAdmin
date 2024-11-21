import React from "react";
import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Text,
    Image,
    Flex
} from "@chakra-ui/react";
import imgNotConected from "../../../assets/img/not_conected.png";

const ConnectionStatusModal = ( { isOnline } ) => {
  if (isOnline) return null;

  const loadImageFromLocalStorage = () => {
    const imageDataUrl = localStorage.getItem('offline-image');
    if (imageDataUrl) return imageDataUrl;
    return imgNotConected;
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Flex position='relative' alignItems='center'>
    <Modal isOpen={!isOnline} onClose={() => {}} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay />
      {/* Contenedor div que ocupa todo el ancho y alto de la pantalla */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo oscuro semitransparente
        zIndex: 9999
      }}>
        <ModalContent
            overflowY="auto"
            maxH="80vh"
            maxW="500px"
            textAlign="center"
            //bgGradient="linear(to-br, gray.600, gray.800)"
            bg="rgb(221, 231, 248)"
            borderRadius="md"
            boxShadow="lg"
            p={4}
        >
          <ModalHeader fontSize="lg" color="black" fontWeight="bold" textAlign="center">
            Sin conexión a Internet
          </ModalHeader>
          {/* <ModalCloseButton color="white" /> */}
          <ModalBody>
            <Flex direction="column" align="center" justify="center" gap={4}>
              <Image
                src={loadImageFromLocalStorage()}
                alt="No Connection ☹"
                boxSize="100px"
                mb={4}
                width={{ base: "50%", md: "250px" }}
                height={{ base: "50%", md: "250px" }}
              />
              <Text color="black" fontSize="md" textAlign="center">
                Parece que no tienes conexión a Internet. <br />
                Verifica tu conexión o recarga la página cuando se restablezca.
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              bg="gray.600"
              color="white"
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.9 }}
              onClick={handleReload}
            >
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
    </Flex>
  );
}

export default ConnectionStatusModal;