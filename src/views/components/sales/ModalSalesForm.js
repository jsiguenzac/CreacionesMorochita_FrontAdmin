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
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ProductFindByNameService } from "../../../services/Inventory/ProductsService";

const ModalSalesForm = ({ isOpen, onClose, onSubmit, sale, detailsProd, payment, status }) => {
  const toast = useToast();
  const [total, setTotal] = useState(0);
  const [talla, setTalla] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [idPayment, setIdPayment] = useState(1);
  const [idStatus, setIdStatus] = useState(2);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [productItem, setProductItem] = useState(
    {
      id: "",
      name: "",
      price: "",
      stock: ""
    }
  );
  const [productSend, setProductSend] = useState([]);
  const [products, setProducts] = useState([]);
  // Estado para los campos del formulario
  const [formValues, setFormValues] = useState({
    id: "",
    nameClientForm: "",
    dniClientForm: "",
    payment: "",
    status: "",
    products: productSend,
    total: total
  });

  useEffect(() => {
    if (sale) {
      setFormValues({
        id: sale.id_sale,
        nameClientForm: sale.name_client,
        dniClientForm: sale.dni_client,
        payment: sale.name_payment,
        status: sale.name_status,
        total: sale.total
      });
      setIdPayment(sale.id_payment);
      setIdStatus(sale.id_status);
      setTotal(sale.total);
    } else {
      setFormValues({
        id: "",
        nameClientForm: "",
        dniClientForm: "",
        payment: "",
        status: "",
        products: productSend,
        total: total
      });
      setIdPayment(0);
      setIdStatus(0);
      setTotal(0);
    }
    if (detailsProd) setProductSend(detailsProd);
    else setProductSend([]);
  }, [sale, detailsProd]);
  
  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFindProducts = async (name) => {
    setIsMenuOpen(false);
    if (!name) {
      setProducts([]);
      return;
    }
    if (name.length <= 2) {
      return;
    }
    const {data, msg} = await ProductFindByNameService(name);
    if (!data) {
      toast({
        title: "Ups..",
        description: "No se encontraron productos con ese nombre.\nIntente con otro nombre.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setProducts([]);
    data.map((product) => {
      setProducts((prev) => [...prev, {
        id: product.id_product,
        name: product.name,
        price: product.price,
        stock: product.stock
      }]);
    });
    setIsMenuOpen(true);
  };

  const handleSelectProduct = (product) => {
    setProductItem({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock
    });
    setSearchProduct(product.name);
    setIsMenuOpen(false);
  };

  const handleAddProduct = () => {
    if (!productItem.name) {
      toast({
        title: "Ups..",
        description: "Seleccione un producto por favor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (!talla) {
      toast({
        title: "Ups..",
        description: "Ingrese la talla del producto por favor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (!quantity) {
      toast({
        title: "Ups..",
        description: "Ingrese la cantidad de productos por favor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (quantity < 1) {
      toast({
        title: "Ups..",
        description: "La cantidad mínima es 1.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (quantity > productItem.stock) {
      toast({
        title: "Ups..",
        description: "La cantidad supera el stock disponible.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newSubtotal = productItem.price * quantity;
    setProductSend((prev) => [...prev, {
      id: productItem.id,
      name: productItem.name,
      price: productItem.price,
      stock: productItem.stock,
      talla: talla,
      quantity: quantity,
      subtotal: newSubtotal
    }]);
    const newTotal = total + newSubtotal;
    setTotal(newTotal);
    setProductItem({
      id: "",
      name: "",
      price: "",
      stock: ""
    });
    setSearchProduct("");
    setTalla("");
    setQuantity(1);
  };

  const handleDeleteProduct = (index) => {
    setProductSend((prev) => prev.filter((_, i) => i !== index));
    const newTotal = total - productSend[index].subtotal;
    setTotal(newTotal === 0 ? 0 : newTotal);
  };

  const handleClearForm = () => {
    setTotal(0);    
    setProductSend([]);
    setProductItem({
      id: "",
      name: "",
      price: "",
      stock: "",
      talla: "",
      quantity: "",
      subtotal: ""
    });
    setProducts([
      {
        id: "",
        name: "",
        price: "",
        stock: ""
      }
    ]);
    setFormValues({
      id: "",
      nameClientForm: "",
      dniClientForm: "",
      payment: "",
      status: "",
      products: productSend,
      total: total
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    if (!formValues.nameClientForm || !formValues.payment || !formValues.status) {
      toast({
        title: "Ups..",
        description: "Rellene los campos requeridos (*) por favor.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (productSend.length === 0) {
      toast({
        title: "Ups..",
        description: "Agregue al menos un producto a la venta.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    formValues.id = Number(formValues.id) || null;
    formValues.payment = idPayment;
    formValues.status = idStatus;
    formValues.total = total;
    formValues.dniClientForm = Number(formValues.dniClientForm) || null;
    // convertir a entero los valores de los productos
    formValues.products = productSend.map((p) => ({
      id: Number(p.id),
      talla: p.talla,
      price: Number(p.price),
      quantity: Number(p.quantity),
      subtotal: Number(p.subtotal)
    }));
    onSubmit(formValues);
    if (onClose) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setSearchProduct("");
    setIsMenuOpen(false);
    handleClearForm();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent
        overflowY="auto"
        maxH="90vh"
        /* bg="rgba(0, 0, 128, 0.9)" */
        bgGradient="linear(to-br, brand.600, brand.800)"
      >
        <ModalHeader fontSize='xm' color='#fff' fontWeight='bold'>{sale ? "Gestionar Venta" : "Nueva Venta"}</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody
          maxHeight="500px"
          overflowY="auto"
        >
          <Flex gap={4}>
            <FormControl mb={4} isRequired>
              <FormLabel
                fontSize={{ base: 'sm', md: 'md' }}
                color='#fff'
                fontWeight='bold'
              >
                Cliente
              </FormLabel>
              <Input
                autoComplete="off"
                type="text"
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="Nombre del Cliente"
                name="nameClientForm"
                value={formValues.nameClientForm}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel
               fontSize={{ base: 'sm', md: 'md' }}
               marginRight={{ base: "0" }}
               color='#fff'
               fontWeight='bold'
              >
                DNI Cliente (opcional)
              </FormLabel>
              <Input
                bg="white"
                type="number"
                min="1"
                max="9999"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="DNI del Cliente"
                name="dniClientForm"
                value={formValues.dniClientForm}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  const finalValue = formValues.dniClientForm.slice(0, 8);
                  setFormValues((prev) => ({
                    ...prev,
                    dniClientForm: finalValue,
                  }));
                }}
              />
            </FormControl>
          </Flex>          
          <Flex gap={4}>
          <FormControl mb={4} isRequired>
            <FormLabel
              fontSize={{ base: "sm", md: "md" }}
              color="#fff"
              fontWeight="bold"
            >
              Método de Pago
            </FormLabel>
            <Menu matchWidth>
              <MenuButton
                fontWeight="normal"
                as={Button}
                bg="white"
                border="3px solid"
                borderColor="gray.300"
                _active={{ borderColor: "blue.500" }}
                borderRadius="8px"
                width="100%"
                rightIcon={<ChevronDownIcon color="black" />}
                textAlign="left"
              >
                {formValues.payment || "Seleccione"}
              </MenuButton>
              <MenuList
                maxHeight="130px"
                overflowY="auto"
                width="100%"
                minWidth="unset"
              >
                {payment.map((c) => (
                  <MenuItem
                    _hover={{ bg: "brand.100" }}
                    key={c.id}
                    onClick={() => {
                      handleInputChange({ target: { name: "payment", value: c.name } });
                      setIdPayment(c.id);
                    }}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </FormControl>
          <FormControl mb={4} isRequired>
          <FormLabel
              fontSize={{ base: "sm", md: "md" }}
              color="#fff"
              fontWeight="bold"
            >
              Estado
            </FormLabel>
            <Menu matchWidth>
              <MenuButton
                fontWeight="normal"
                as={Button}
                bg="white"
                border="3px solid"
                borderColor="gray.300"
                _active={{ borderColor: "blue.500"}}
                borderRadius="8px"
                width="100%"
                rightIcon={<ChevronDownIcon color="black" />}
                _placeholder={{ color: 'gray.500' }}
                textAlign="left"
              >
                {formValues.status || "Seleccione"}
              </MenuButton>
              <MenuList
                maxHeight="130px"
                overflowY="auto"
                width="100%"
                minWidth="unset"
              >
                {status
                  .filter((p) => p.id !== 3 || sale)
                  .map((c) => (
                  <MenuItem
                    _hover={{ bg: "brand.100" }}
                    key={c.id}
                    onClick={() => {
                      handleInputChange({ target: { name: "status", value: c.name } });
                      setIdStatus(c.id);
                    }}
                  >
                    {c.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            </FormControl>
          </Flex>
          <Flex gap={4}>
            <FormControl 
              mb={4}
              position="relative"
              isRequired={productSend.length === 0}
            >
              <FormLabel
                fontSize={{ base: "sm", md: "md" }}
                color="#fff"
                fontWeight="bold"
              >
                Producto
              </FormLabel>
              <Input
                    bg="white"
                    border="3px solid"
                    color="black"
                    borderRadius="8px"
                    _placeholder={{ color: 'gray.500' }}
                    placeholder="Ingrese el nombre del producto"
                    type="text"
                    name="searchProduct"
                    value={searchProduct}
                    width="100%"
                    onChange={(e) => {
                      setSearchProduct(e.target.value);
                      handleFindProducts(e.target.value)
                    }}
                    autoComplete="off"
                  />
              <Menu isOpen={isMenuOpen} matchWidth>
                <MenuButton as={Box} width="100%">
                  <Input
                    display="none"
                    bg="white"
                    border="3px solid"
                    color="black"
                    borderRadius="8px"
                    _placeholder={{ color: 'gray.500' }}
                    placeholder="Ingrese nombre del producto"
                    type="text"
                    name="product"
                    width="100%"
                    autoComplete="off"
                  />
                </MenuButton>
                <MenuList
                  maxHeight="150px"
                  overflowY="auto"
                  minWidth="unset"
                  width="100%"
                >
                  {products.length > 0 ? (
                    products.map((product) => (
                      <MenuItem
                        key={product.id}
                        _hover={{ bg: "brand.100" }}
                        onClick={() => {
                          handleSelectProduct(product);
                        }}
                      >
                        {product.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>No hay resultados</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </FormControl>
          </Flex>
          <Flex gab={4}>
            <FormControl 
              mb={4}
              isRequired
              position="relative"
            >
              <FormLabel
                fontSize={{ base: 'sm', md: 'md' }}
                color='#fff'
                fontWeight='bold'
              >
                Talla
              </FormLabel>
              <Input
                width="93%"
                autoComplete="off"
                type="text"
                bg="white"
                border="3px solid"
                color="black"
                borderRadius="8px"
                _placeholder={{ color: 'gray.500' }}
                placeholder="S, M, L, XL"
                name="talla"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
              />
            </FormControl>
            <FormControl
              mb={4}
              isRequired={productSend.length === 0}
            >
                <FormLabel
                  fontSize={{ base: 'sm', md: 'md' }}
                  color='#fff'
                  fontWeight='bold'
                >
                  Cantidad
                </FormLabel>
                  <Flex align="center">
                    <Input
                      width="90%"
                      bg="white"
                      border="3px solid"
                      color="black"
                      borderRadius="8px"
                      _placeholder={{ color: 'gray.500' }}
                      placeholder="1 - 99"
                      type="number"
                      name="quantity"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(e.target.value)}
                      onBlur={() => {
                        const finalValue = Math.max(1, Math.min(99, Number(quantity) || 1));
                        setQuantity(finalValue);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <IconButton
                      onClick={handleAddProduct}
                      icon={<AddIcon color='white' />}
                      bg='green.500'
                      _hover={{ bg: 'green.400' }}
                      _active={{ bg: 'green.600' }}
                      aria-label="Agregar producto"
                      ml={2}
                    />
                  </Flex>
              </FormControl>
          </Flex>
          <Box maxH="200px" maxW="500px" overflowY="auto">
            <Table variant="simple" mt={4}>
              <Thead style={{ backgroundColor: '#1A365D' }}>
                <Tr>
                  <Th color="#fff">Producto</Th>
                  <Th color="#fff">Talla</Th>
                  <Th color="#fff">Cantidad</Th>
                  <Th color="#fff">Precio</Th>
                  <Th color="#fff">Subtotal</Th>
                  <Th color="#fff">Acciones</Th>
                </Tr>
              </Thead>
              <Tbody maxH="200px" overflowY="auto">
                {productSend.length > 0 ?
                  productSend.map((product) => (
                  <Tr>
                    <Td color="#fff">{product.name}</Td>
                    <Td color="#fff">{product.talla}</Td>
                    <Td color="#fff">{product.quantity}</Td>
                    <Td color="#fff">{product.price}</Td>
                    <Td color="#fff">{product.subtotal}</Td>
                    <Td color="#fff">
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Eliminar producto"
                        bg='red.500'
                        _hover={{ bg: 'red.400' }}
                        _active={{ bg: 'red.600' }}
                        onClick={() => handleDeleteProduct(productSend.indexOf(product))}
                      />
                    </Td>
                  </Tr>
                )) : (
                  <Tr>
                    <Td colSpan="6" color="#fff">Aún no hay productos agregados</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>          
          <Flex justifyContent="flex-end">
            <Text fontSize="lg" fontWeight="bold" mt={4} color="#fff">
              Total: S/.{total}
            </Text>
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
            {sale ? "Guardar Cambios" : "Agregar Venta"}
          </Button>
          <Button colorScheme="blue" onClick={handleCancel}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSalesForm;