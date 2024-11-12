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

const ModalInventoryForm = ({ isOpen, onClose, onSubmit, product, categories, providers }) => {
  const toast = useToast();
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    id: "", // No visible en el formulario
    nameForm: "",
    stock: "",
    price: "",
    category: "",
    talla: "",
    provider: ""
  });

  // Efecto para llenar los campos si se pasa un usuario
  useEffect(() => {
    if (product) {
      setFormValues({
        id: product.id_product,
        nameForm: product.name,
        stock: product.stock,
        price: product.price,
        category: product.id_category,
        talla: product.codesku,
        provider: product.id_provider
      });
    } else {
      setFormValues({
        id: "",
        nameForm: "",
        stock: "",
        price: "",
        category: "",
        talla: "",
        provider: ""
      });
    }
  }, [product]);

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
        nameForm: "",
        stock: "",
        price: "",
        category: "",
        talla: "",
        provider: ""
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (!formValues.nameForm || !formValues.stock || !formValues.price || !formValues.category || !formValues.talla || !formValues.provider) {
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
    if (onClose) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    handleClearForm();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} isCentered>
      <ModalOverlay />
      <ModalContent
        overflowY="auto"
        maxH="90vh"
        /* bg="rgba(0, 0, 128, 0.9)" */
        bgGradient="linear(to-br, brand.600, brand.800)"
      >
        <ModalHeader fontSize='xm' color='#fff' fontWeight='bold'>{product ? "Editar Producto" : "Nuevo Producto"}</ModalHeader>
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
                placeholder="Ingrese el nombre"
                name="nameForm"
                value={formValues.nameForm}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Stock</FormLabel>
              <Input
                bg="white"
                type="number"
                min="1"
                max="9999"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese el stock"
                name="stock"
                value={formValues.stock}
                onChange={handleInputChange}
              />
            </FormControl>
          </Flex>
          <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Proveedor</FormLabel>
              <Select
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Seleccione un proveedor"
                name="provider"
                value={formValues.provider}
                onChange={handleInputChange}
              >
                {providers
                  .map((c) => (
                  <option key={c.id_user} value={c.id_user}>
                    {c.name} {c.last_name}
                  </option>
                ))}
              </Select>
          </FormControl>
          <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Categoria</FormLabel>
              <Select
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Seleccione una categoria"
                name="category"
                value={formValues.category}
                onChange={handleInputChange}
              >
                {categories
                  .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
          </FormControl>
          <Flex gap={4}>
            <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Precio Unitario</FormLabel>
              <Input                
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese el precio"
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4} isRequired={true}>
              <FormLabel fontSize='xm' color='#fff' fontWeight='bold'>Tallas</FormLabel>
              <Input                
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Ingrese las tallas"
                name="talla"
                value={formValues.talla}
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
            {product ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
          <Button colorScheme="blue" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalInventoryForm;
