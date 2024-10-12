import React, { useState } from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Button,
  FormControl,
  Input,
  FormLabel,
  Select,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tr,
} from "@chakra-ui/react";

import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TableRowInventory from "components/Tables/TablesProjectRowInventory";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesProjectDataInventory, tablesTableData } from "variables/general";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

function Inventory() {

  const now = new Date();
  now.setHours(now.getHours() - 5);
  const today = now.toISOString().split("T")[0];
  
  const [filters, setFilters] = useState({
    name: "",
    role: "",
    creationDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    // Lógica para aplicar los filtros
    console.log("Filtros aplicados:", filters);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      role: "",
      creationDate: "",
    });
  };


  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Filtros */}
      <Card mb="22px">
        <CardHeader p="6px 0px 22px 0px">
        <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Filtros
          </Text>
        </Flex>
        <Button
          marginLeft={{ base: "50px", md: "auto" }}
          colorScheme="blue" 
          onClick={() => handleOpenModal()}>
            Agregar Producto
          </Button>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap="20px">
            <FormControl>
              <FormLabel color="gray.400">Nombre</FormLabel>
              <Input
                name="name"
                width={{ base: "100%", md: "180px" }}
                placeholder="Buscar por nombre"
                value={filters.name}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Categoria</FormLabel>
              {/* <Select
                name="role"
                placeholder="Seleccionar rol"
                value={filters.role}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
                _focus={{ bg: "gray.800" }}
                _expanded={{ bg: "gray.800" }}
              >
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
                <option value="guest">Invitado</option>
              </Select> */}
              <Menu>
                <MenuButton
                  width={{ base: "100%", md: "220px" }}
                  border="1px solid #4B5563"
                  as={Button}
                  rightIcon={<ChevronDownIcon color={filters.role ? "white" : "gray.200"} />}
                  bg="none" 
                  bord color={!filters.role ? "gray.500" : "white" } 
                  _hover={{ bg: "none", borderColor: "gray.300" }}
                  _active={{ bg: "none", borderColor: "white" }}
                >
                  {filters.role || "Seleccionar categoria"}
                </MenuButton>
                <MenuList bg="gray.700" color="white">
                  <MenuItem
                    onClick={() => setFilters({ ...filters, role: "Pantalones" })}
                    _hover={{ bg: "purple.500" }}
                    _focus={{ bg: "purple.500" }}
                  >
                    Pantalones
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFilters({ ...filters, role: "Polos" })}
                    _hover={{ bg: "purple.500" }}
                    _focus={{ bg: "purple.500" }}
                  >
                    Polos
                  </MenuItem>
                  <MenuItem
                    onClick={() => setFilters({ ...filters, role: "Cafarenas" })}
                    _hover={{ bg: "purple.500" }}
                    _focus={{ bg: "purple.500" }}
                  >
                    Cafarenas
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => setFilters({ ...filters, role: "Proveedor" })}
                    _hover={{ bg: "purple.500" }}
                    _focus={{ bg: "purple.500" }}
                  >
                    Proveedor
                  </MenuItem> */}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Fecha de Registro</FormLabel>
              {/* <Input
                type="date"
                name="creationDate"
                value={filters.creationDate}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
                max={today}
              /> */}
              <InputGroup
                width={{ base: "100%", md: "auto" }}
              >
                <InputRightElement pointerEvents="none">
                  <CalendarIcon 
                    color="gray.400"
                    marginRight="55px"
                  />
                </InputRightElement>
                <Input
                  type="date"
                  pl="10px"
                  name="creationDate"
                  value={filters.creationDate}
                  onChange={handleInputChange}
                  color="#fff"
                  borderColor="gray.600"
                  max={today}
                />
              </InputGroup>
            </FormControl>
          </Flex>
          {/* Flex for the buttons */}
          <Flex
            mt="30px"
            marginStart={{ base: "0px", md: "20px" }}
            justifyContent="flex-end"
            gap="10px"
            direction={{ base: "column", md: "row" }}
          >
            <Button
              _hover={{ bg: "brand.300" }}
              bg={"brand.200"}
              textColor={"white"}
              onClick={handleApplyFilters}
              width={{ base: "100px", md: "auto" }}
              marginLeft={{ base: "30px", md: "0px" }}
            >
              Aplicar
            </Button>
            <Button
              _hover={{ bg: "white" }}
              bg={"gray.300"}
              disabled={Object.values(filters).every((filter) => filter === "")}
              onClick={handleClearFilters}
              width={{ base: "100px", md: "auto" }}
              marginLeft={{ base: "30px", md: "0px" }}
            >
              Limpiar
            </Button>
            <Flex
              marginStart={{ base: "0px", md: "50px", lg: "50px" }}
              justifyContent="flex-end"
              gap="10px"
              direction={{ base: "column", md: "row" }}
            >
              <Button
                _hover={{ bg: "purple.500" }}
                bg={"brand.200"}
                /* disabled={Object.values(filters).every((filter) => filter === "")} */
                /* onClick={handleClearFilters} */
                width={{ base: "70px", md: "70px" }}
                marginLeft={{ base: "30px", md: "50px" }}
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  {'<'}
                </Text>
              </Button>
              <Button 
                _hover={{ bg: "purple.500" }}
                bg={"brand.200"}
                /* disabled={Object.values(filters).every((filter) => filter === "")} */
                /* onClick={handleClearFilters} */
                width={{ base: "70px", md: "70px" }}
                marginLeft={{ base: "30px", md: "0px" }}
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  {'>'}
                </Text>
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {/* Clients Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              Inventario de Productos
            </Text>
            <Flex align='center'>
              <Icon
                as={AiFillCheckCircle}
                color='green.500'
                w='15px'
                h='15px'
                me='5px'
              />
              <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                <Text fontWeight='bold' as='span' color='gray.400'>
                  +30%
                </Text>{" "}
                este mes
              </Text>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Nombre del Producto
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Precio Unitario
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Stock
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Categoria
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  % de Venta Mensual
                </Th>
                <Th borderBottomColor='#56577A'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesProjectDataInventory.map((row, index, arr) => {
                return (
                  <TableRowInventory
                    name={row.name}
                    logo={row.logo}
                    status={row.status}
                    budget={row.budget}
                    category={row.category}
                    progression={row.progression}
                    lastItem={index === arr.length - 1 ? true : false}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Inventory;
