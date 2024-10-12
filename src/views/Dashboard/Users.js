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
  Tr,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesProjectData, tablesTableData } from "variables/general";
import ModalUserForm from "../components/users/ModalUserForm";

// Icons
// import { AiFillCheckCircle } from "react-icons/ai";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Función para abrir el modal y definir si es para agregar o editar usuario
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null); // Limpia el usuario en edición cuando cierras el modal
  };

  const today = new Date().toISOString().split("T")[0];

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
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Filtros */}
      <Card mb="22px">
        <CardHeader p="6px 0px 22px 0px">
        <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Filtrar Usuarios
          </Text>
          <Button colorScheme="blue" onClick={() => handleOpenModal()}>
            Agregar Usuario
          </Button>
        </Flex>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap="20px">
            <FormControl>
              <FormLabel color="gray.400">Nombre</FormLabel>
              <Input
                name="name"
                placeholder="Buscar por nombre"
                value={filters.name}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Rol</FormLabel>
              <Select
                name="role"
                placeholder="Seleccionar rol"
                value={filters.role}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
              >
                <option value="admin">Admin</option>
                <option value="user">Usuario</option>
                <option value="guest">Invitado</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Fecha de Creación</FormLabel>
              <Input
                type="date"
                name="creationDate"
                value={filters.creationDate}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
                max={today}
              />
            </FormControl>
          </Flex>
          {/* Flex for the buttons */}
          <Flex
            mt="30px"
            marginStart={{ base: "0px", md: "50px" }}
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
              marginStart={{ base: "0px", md: "50px" }}
              justifyContent="flex-end"
              gap="10px"
              direction={{ base: "column", md: "row" }}
            >
              <Button
                _hover={{ bg: "purple.500" }}
                bg={"brand.200"}
                disabled={Object.values(filters).every((filter) => filter === "")}
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

      {/* Users Table */}
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        {/* <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Authors Table
          </Text>
        </CardHeader> */}
        <CardBody>
          <Table variant="simple" color="#fff">
            <Thead>
              <Tr my=".8rem" ps="0px" color="gray.400">
                <Th
                  ps="0px"
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Nombre completo
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  DNI
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Rol
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Status
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Fecha de Creación
                </Th>
                <Th borderBottomColor="#56577A"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    key={index}
                    name={row.name}
                    logo={row.logo}
                    email={row.email}
                    dni={row.dni}
                    subdomain={row.subdomain}
                    domain={row.domain}
                    status={row.status}
                    date={row.date}
                    lastItem={index === arr.length - 1 ? true : false}
                    onEdit={() => handleOpenModal(row)}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <ModalUserForm 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(data) => console.log("Guardando usuario:", data)}
        user={editingUser}
      />
    </Flex>
  );
}

export default Users;
