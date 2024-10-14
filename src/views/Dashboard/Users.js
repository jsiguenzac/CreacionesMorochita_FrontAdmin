import React, { useState, useEffect } from "react";

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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  InputGroup, 
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesTableData } from "variables/general";
import ModalUserForm from "../components/users/ModalUserForm";

import { dateToTimestamp } from "components/utils/Methods";
import { RolLisService } from "services/Users/RolService";
import { UserListService } from "services/Users/UserService";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";

function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [idRol, setIdRol] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const { isOpen: isOpenErr, onOpen: onOpenErr, onClose: onCloseErr } = useDisclosure();


  // Función para abrir el modal y definir si es para agregar o editar usuario
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // const today = new Date().toISOString().split("T")[0];
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

  const handleIncrementPage = () => {
    setPage(page + 1);
    setApplyFiltersFlag(true);
  };

  const handleDecrementPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    setApplyFiltersFlag(true);
  };
  
  const handleApplyFilters = async () => {
    const ts = dateToTimestamp(filters.creationDate);
    // Lógica para aplicar los filtros
    const form = {
      page: page,
      name: filters.name,
      idRol: idRol,
      dateCreation: ts,
    };
    setLoading(true);
    setMsg("Cargando usuarios...");
    try {
      const { data, msg } = await UserListService(form);
      if (data) {
        setListUsers(data.users);
        setTotalUsers(data.total);
        setUsersPerPage(data.page_size);
      }
      else {
        console.log("Error al obtener la lista de usuarios:", msg);
        setErr("Error al obtener los usuarios");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
      setErr("Error al obtener los usuarios");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      role: "",
      creationDate: "",
    });
    setIdRol(0);
    setPage(1);
    setApplyFiltersFlag(true);
  };

  useEffect(() => {
    if (applyFiltersFlag) {
      handleApplyFilters();
      setApplyFiltersFlag(false);
    }
  }, [applyFiltersFlag]);

  const handleRolesList = async () => {
    setLoading(true);
    setMsg("Cargando roles...");
    try {
      const { data, msg } = await RolLisService();
      if (data) {
        setRoles(data);
      }
      else {
        console.log("Error al obtener la lista de roles:", msg);
        setErr("Error al obtener los roles");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de roles:", error);
      setErr("Error al obtener los roles");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  }

  useEffect(() => {
    // llamada de servicios al cargar la vista
    handleRolesList();
    handleApplyFilters();
		if (onCloseErr) {
			setErr("");
		}
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Filtros */}
      <Card mb="22px">
        <CardHeader p="6px 0px 22px 0px">
        <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Filtrar Usuarios
          </Text>
        </Flex>
        <Button
          marginLeft={{ base: "50px", md: "auto" }}
          colorScheme="blue" 
          onClick={() => handleOpenModal()}>
            Agregar Usuario
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
              <FormLabel color="gray.400">Rol</FormLabel>
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
                  {filters.role || "Seleccionar rol"}
                </MenuButton>
                <MenuList bg="gray.700" color="white" size="12px">
                  {roles
                    .filter((rol) => rol.id !== 5)
                    .map((rol) => (
                    <MenuItem
                      size="12px"
                      key={rol.id}
                      onClick={() => {
                        setFilters((prevFilters) => ({ ...prevFilters, role: rol.name }));
                        setIdRol(rol.id);
                      }}
                      /* onClick={() => setFilters({ ...filters, role: rol.name })} */
                      _hover={{ bg: "purple.500" }}
                      _focus={{ bg: "purple.500" }}
                    >
                      {rol.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Fecha de Creación</FormLabel>
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
              disabled={Object.values(filters).every((filter) => filter === "") && page === 1}
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
                _hover={{ bg: page === 1 ? "gray.400" : "purple.500" }}
                bg={page === 1 ? "gray.300" : "brand.200"}
                disabled={page === 1}
                onClick={handleDecrementPage}
                width={{ base: "70px", md: "70px" }}
                marginLeft={{ base: "30px", md: "50px" }}
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  {'<'}
                </Text>
              </Button>
              <Button 
                _hover={{ bg: (page * usersPerPage) >= totalUsers ? "gray.400" : "purple.500" }}
                bg={(page * usersPerPage) >= totalUsers ? "gray.300" : "brand.200"}
                disabled={(page * usersPerPage) >= totalUsers}
                onClick={handleIncrementPage}
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
                  Estado
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
              {listUsers.length === 0 ? (
                <Tr>
                  <Th colSpan="6" textAlign="center" color="gray.400">
                    No se encontraron usuarios
                  </Th>
                </Tr>
              ) :
              listUsers.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    key={row.id_user}
                    name={row.name + " " + row.last_name}
                    /* logo={row.logo} */
                    email={row.email}
                    dni={row.dni}
                    /* subdomain={row.subdomain} */
                    domain={row.name_rol.toLowerCase()}
                    status={row.active}
                    date={row.date_creation}
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
      <CustomModal
				header="Upss!"
				message={err}
				isOpen={isOpenErr}
				onClose={onCloseErr}
			/>
      {loading && <DotSpin message={msg} />}
    </Flex>
  );
}

export default Users;
