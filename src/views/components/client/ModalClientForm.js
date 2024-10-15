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

const ModalCLientForm = ({ isOpen, onClose, onSubmit, client }) => {
  const toast = useToast();
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    id: "", // No visible en el formulario
    dni: "",
    nameForm: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Efecto para llenar los campos si se pasa un usuario
  useEffect(() => {
    if (client) {
      setFormValues({
        id: client.id_user,
        dni: client.dni,
        nameForm: client.name,
        lastName: client.last_name,
        email: client.email,
        phone: client.phone,
      });
    } else {
      setFormValues({
        id: "",
        dni: "",
        nameForm: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
  }, [client]);

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
      phone: "",
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (!formValues.nameForm || !formValues.lastName || !formValues.email) {
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
    console.log("Formulario enviado", formValues);
    onSubmit(formValues);
    if (onClose) {
      handleCancel();
    }
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
        <ModalHeader fontSize='xm' color='#fff' fontWeight='bold'>{client ? "Editar Cliente" : "Agregar Cliente"}</ModalHeader>
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
              {client && (
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
              disabled={client ? true : false}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* <FormControl mb={4} isRequired={true}>
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
            </FormControl> */}
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
            {client ? "Guardar Cambios" : "Agregar Cliente"}
          </Button>
          <Button colorScheme="blue" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCLientForm;
