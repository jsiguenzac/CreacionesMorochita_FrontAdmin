import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";

const ModalRecoverAccess = ({ isOpen, onClose, onSubmit }) => {
  const toast = useToast();
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    email: ""
  });

  const handleClearForm = () => {
    setFormValues({
      email: ""
    });
  };

  const handleEmailChange = (e) => {
    setFormValues({
      ...formValues,
      email: e.target.value
    });
  }

  // Manejar el envío del correo
  const handleSendEmail = () => {
    if (!formValues.email) {
        toast({
            title: "Error",
            description: "Por favor, ingrese su correo electrónico.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
        return;
    }
    onSubmit(formValues);
    if (onClose) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    handleClearForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} isCentered>
        <ModalOverlay />
        <ModalContent
            overflowY="auto"
            maxH="80vh"
            maxW="500px"
            bgGradient="linear(to-br, brand.600, brand.800)"
            borderRadius="md"
            boxShadow="lg"
            p={4}
        >
            <ModalHeader fontSize="lg" color="white" fontWeight="bold" textAlign="center">
            Recuperar Contraseña
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
            <Flex direction="column" align="center" justify="center" gap={4}>
                <Text color="white" fontSize="md" textAlign="center">
                Se le enviará una contraseña temporal a su correo electrónico.
                </Text>
                <Input
                placeholder="Ingrese su correo electrónico"
                size="md"
                bg="white"
                borderRadius="md"
                name="email"
                _focus={{ borderColor: "brand.400" }}
                onChange={handleEmailChange}
                value={formValues.email}
                />
            </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center">
            <Button
                bg="brand.200"
                color="white"
                _hover={{ opacity: 0.8 }}
                _active={{ opacity: 0.9 }}
                mr={3}
                onClick={handleSendEmail}
            >
                Enviar Correo
            </Button>
            <Button colorScheme="gray" onClick={handleCancel}>
                Cancelar
            </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};

export default ModalRecoverAccess;
