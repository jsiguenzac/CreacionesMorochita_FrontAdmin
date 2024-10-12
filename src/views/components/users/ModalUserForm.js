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
  FormControl,
  FormLabel,
  Select,
  Flex,
} from "@chakra-ui/react";

const ModalUserForm = ({ isOpen, onClose, onSubmit, user }) => {
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    id: "", // No visible en el formulario
    dni: "",
    name: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
  });

  // Efecto para llenar los campos si se pasa un usuario
  useEffect(() => {
    if (user) {
      setFormValues(user);
    } else {
      setFormValues({
        id: "",
        dni: "",
        name: "",
        lastName: "",
        email: "",
        role: "",
        phone: "",
      });
    }
  }, [user]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user ? "Editar Usuario" : "Agregar Usuario"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>DNI</FormLabel>
            <Input
              name="dni"
              value={formValues.dni}
              onChange={handleInputChange}
            />
          </FormControl>
          <Flex gap={4}>
            <FormControl mb={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <FormControl mb={4}>
            <FormLabel>Correo</FormLabel>
            <Input
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <Flex gap={4}>
            <FormControl mb={4}>
              <FormLabel>Rol</FormLabel>
              <Select
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
              >
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
                <option value="guest">Invitado</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Celular</FormLabel>
              <Input
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          {/* El campo ID es invisible, pero está presente */}
          <Input name="id" value={formValues.id} type="hidden" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {user ? "Guardar Cambios" : "Agregar Usuario"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUserForm;
