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
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";

const ModalUserUpdateStatus = ({ isOpen, onClose, onSubmit, user }) => {
  const toast = useToast();
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    id: "",
    is_active: "",
    name: "",
  });

  // Efecto para llenar los campos si se pasa un usuario
  useEffect(() => {
    if (user) {
      setFormValues({
        id: user.id_user,
        is_active: user.active,
        name: `${user.name} ${user.last_name}`,
      });
    } else {
      setFormValues({
        id: "",
        is_active: "",
        name: "",
      });
    }
  }, [user]);

  const handleClearForm = () => {
    setFormValues({
      id: "",
      is_active: "",
      name: "",
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
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
          Gestionar {formValues.is_active ? "inactivación" : "activación"} del usuario
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex direction="column" align="center" justify="center" gap={2}>
            <Text color="white" fontSize="md" textAlign="center">
              ¿Estás seguro de que deseas{" "}
              <Text as="span" fontWeight="bold">
                {formValues.is_active ? "inactivar" : "activar"}
              </Text>{" "}
              al usuario{" "}
              <Text as="span" fontWeight="bold">
                {formValues.name}
              </Text>
              ?
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            bg="brand.200"
            color="white"
            _hover={{ opacity: 0.8 }}
            _active={{ opacity: 0.9 }}
            mr={3}
            onClick={handleSubmit}
          >
            {formValues.is_active ? "Sí, Inactivar" : "Sí, Activar"}
          </Button>
          <Button colorScheme="gray" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUserUpdateStatus;
