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
  Text,
  useToast,
} from "@chakra-ui/react";

const ModalUserForm = ({ isOpen, onClose, onSubmit, user, roles }) => {
  const toast = useToast();
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    id: "", // No visible en el formulario
    dni: "",
    nameForm: "",
    lastName: "",
    email: "",
    role: "",
    phone: "",
  });

  // Efecto para llenar los campos si se pasa un usuario
  useEffect(() => {
    if (user) {
      setFormValues({
        id: user.id_user,
        dni: user.dni,
        nameForm: user.name,
        lastName: user.last_name,
        email: user.email,
        role: user.id_rol,
        phone: user.phone,
      });
    } else {
      setFormValues({
        id: "",
        dni: "",
        nameForm: "",
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

  const handleClearForm = () => {
    setFormValues({
      id: "",
      dni: "",
      nameForm: "",
      lastName: "",
      email: "",
      role: "",
      phone: "",
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (!formValues.nameForm || !formValues.lastName || !formValues.email || !formValues.role) {
      toast({
        title: "Ups..",
        description: "Rellene los campos requeridos (*) por favor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Faltan campos por rellenar", formValues);
      return;
    }
    onSubmit(formValues);
  };

  const handleCancel = () => {
    handleClearForm();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <ModalOverlay />
      <ModalContent
        overflowY="auto"
        maxH="90vh"
        /* bg="rgba(0, 0, 128, 0.9)" */
        bgGradient="linear(to-br, brand.600, brand.800)"
      >
        <ModalHeader fontSize='xm' color='#fff' fontWeight='bold'>{user ? "Editar Usuario" : "Agregar Usuario"}</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex gap={4}>
            <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Nombre</FormLabel>
              <Input
                autoComplete="off"
                type="text"
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese su nombre"
                name="nameForm"
                value={formValues.nameForm}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Apellido</FormLabel>
              <Input
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese su apellido"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <FormControl mb={4}>
            <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>
              Correo {' '}
              <Text as="span" color="red.500">
                *
              </Text>
              {user && (
              <Text as="span" color="red.500" fontSize="xs">
                {' '}
                Para editar el correo, contacte al desarrollador.
              </Text>
            )}
            </FormLabel>
            <Input              
              bg="white"
              border="3px solid"
              color="black"
              borderRadius="8px"
              _placeholder={{ color: 'gray.500' }}
              placeholder="Ingrese su correo"
              name="email"
              type="email"
              value={formValues.email}
              disabled={user ? true : false}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Rol</FormLabel>
              <Select
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Seleccione un rol"
                name="role"
                value={formValues.role}
                onChange={handleInputChange}
              >
                {roles
                  .filter((role) => role.id !== 5)
                  .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          <Flex gap={4}>
            <FormControl mb={4}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>DNI</FormLabel>
              <Input                
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese su DNI"
                type="number"
                name="dni"
                value={formValues.dni}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Celular</FormLabel>
              <Input                
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese su Celular"
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
          <Button 
            _hover={{ opacity: '0.8' }}
            _active={{ opacity: '0.9' }} 
            bg='brand.200' mr={3}
            onClick={handleSubmit}
            textColor={'#fff'}
          >
            {user ? "Guardar Cambios" : "Agregar Usuario"}
          </Button>
          <Button colorScheme="blue" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUserForm;
