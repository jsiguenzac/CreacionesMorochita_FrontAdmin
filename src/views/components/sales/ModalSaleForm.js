import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const products = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  // Agrega más productos según sea necesario
];

function ModalSaleForm({ sale, onClose }) {
  const [selectedProduct, setSelectedProduct] = useState(sale ? sale.product : "");
  const [quantity, setQuantity] = useState(sale ? sale.quantity : 1);
  const [saleDate, setSaleDate] = useState(sale ? sale.saleDate : new Date().toLocaleDateString('en-CA')); // Fecha actual por defecto
  const [paymentMethod, setPaymentMethod] = useState(sale ? sale.paymentMethod : "");
  const [status, setStatus] = useState("Completa"); // Estado por defecto
  const [customerName, setCustomerName] = useState(sale ? sale.customerName : "");
  const [dni, setDni] = useState(sale ? sale.dni : ""); // Nuevo estado para el DNI

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const product = products.find(p => p.name === selectedProduct);
    if (product) {
      setSubtotal(product.price * quantity);
    } else {
      setSubtotal(0);
    }
  }, [selectedProduct, quantity]);

  const calculateTotalSale = () => {
    return subtotal;
  };

  return (
    <Stack spacing={4}>
      <SimpleGrid columns={2} spacing={4}>
        <FormControl id="customerName">
          <FormLabel>Nombre del Cliente</FormLabel>
          <Input
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ingrese el nombre del cliente"
          />
        </FormControl>

        <FormControl id="dni">
          <FormLabel>DNI (Opcional)</FormLabel>
          <Input
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            placeholder="Ingrese el DNI"
          />
        </FormControl>

        <FormControl id="saleDate">
          <FormLabel>Fecha de Venta</FormLabel>
          <Input
            type="date"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="paymentMethod">
          <FormLabel>Medio de Pago</FormLabel>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            placeholder="Seleccione un medio de pago"
          >
            <option value="Yape">Yape</option>
            <option value="Plin">Plin</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Efectivo">Efectivo</option>
          </Select>
        </FormControl>

        <FormControl id="status">
          <FormLabel>Estado</FormLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Seleccione un estado"
          >
            <option value="Completa">Completa</option>
            <option value="Pendiente">Pendiente</option>
          </Select>
        </FormControl>

        <FormControl id="product">
          <FormLabel>Producto</FormLabel>
          <Input
            list="product-list"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            placeholder="Seleccione o ingrese un producto"
          />
          <datalist id="product-list">
            <option value="">Seleccionar productos</option>
            {products.map((product) => (
              <option key={product.id} value={product.name} />
            ))}
          </datalist>
        </FormControl>

        <IconButton
          icon={<AddIcon />}
          aria-label="Agregar producto"
          alignSelf="end"
          mt={8}
        />

        <FormControl id="quantity">
          <FormLabel>Cantidad</FormLabel>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ingrese la cantidad"
          />
        </FormControl>
      </SimpleGrid>

      <Box maxH="200px" overflowY="auto">
        <Table variant="simple" mt={4}>
          <Thead>
            <Tr>
              <Th>Producto</Th>
              <Th>Cantidad</Th>
              <Th>Precio</Th>
              <Th>Subtotal</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{selectedProduct}</Td>
              <Td>{quantity}</Td>
              <Td>{products.find(p => p.name === selectedProduct)?.price || 0}</Td>
              <Td>{subtotal}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Text fontSize="lg" fontWeight="bold" mt={4}>
        Total de Venta: {calculateTotalSale()}
      </Text>

      <Button colorScheme="blue" onClick={onClose}>
        Guardar
      </Button>
    </Stack>
  );
}

export default ModalSaleForm;