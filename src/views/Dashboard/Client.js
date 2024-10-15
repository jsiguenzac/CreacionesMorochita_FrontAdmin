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
  Button,
  FormControl,
  Input,
  Tr,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Table Components
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import ModalCLientForm from "../components/client/ModalClientForm";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";

// Data
import { tablesProjectDataClient, tablesTableData } from "variables/general";
import { UserListService, UserUpdateService, UserCreateService } from "services/Users/UserService";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

function Client() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [applyFilters, setApplyFilters] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [listClients, setListClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [clientsPerPage, setClientsPerPage] = useState(10);

  const { isOpen: isOpenErr, onOpen: onOpenErr, onClose: onCloseErr } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  const handleOpenModal = (client) => {
    setEditingClient(client || null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleIncrementPage = () => {
    setPage(page + 1);
    setApplyFilters(true);
  };
  const handleDecrementPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    setApplyFilters(true);
  };

  const handleApplyFilters = async () => {
    // Lógica para aplicar los filtros
    const form = {
      page: page,
      name: name,
      idRol: 5,
      dateCreation: -1,
    };
    setLoading(true);
    setMsg("Cargando clientes...");
    try {
      const { data, msg } = await UserListService(form);
      if (data) {
        setListClients(data.users);
        setTotalClients(data.total);
        setClientsPerPage(data.page_size);
      }
      else {
        console.log("Error al obtener la lista de clientes:", msg);
        setErr("Error al obtener los clientes");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de clientes:", error);
      setErr("Error al obtener los clientes");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  const handleClearFilters = () => {
    setName("");
    setPage(1);
    setApplyFilters(true);
  };

  const handleAddClientService = async (data) => {
    const role = 5;
    data = { ...data, role };
    const { exito, msg } = await UserCreateService(data);
    if (exito) {
      toast({
        title: "Éxito",
        description: "Cliente guardado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleCloseModal();
    }
    else if (msg === "DNI_EXISTENTE"){
      toast({
        title: "¡Error!",
        description: "El número de DNI ya está asignado a un cliente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else if (msg === "USUARIO_YA_EXISTE"){
      toast({
        title: "¡Error!",
        description: "El correo electrónico ya está asignado a un cliente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: "Ups..",
        description: "Ocurrió un error inesperado al guardar el cliente",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateClientService = async (data) => {
    const role = 5;
    data = { ...data, role };
    const { exito, msg } = await UserUpdateService(data);
    if (exito) {
      toast({
        title: "Éxito",
        description: "Usuario actualizado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleCloseModal();
    }
    else{
      if (msg === "USUARIO_NO_ENCONTRADO") {
        toast({
          title: "¡Error!",
          description: "El usuario no fue encontrado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      if (msg === "DNI_EXISTENTE") {
        toast({
          title: "¡Error!",
          description: "El número de DNI ya está asignado a un usuario",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: "Ups..",
          description: "Ocurrió un error inesperado al actualizar el usuario",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleAddEditClient = async (data) => {
    setLoading(true);
    try {
      if (!data) {
        setErr("Error al obtener los datos del cliente");
        onOpenErr();
        return;
      }
      if(data.id) {
        setMsg("Actualizando cliente...");
        await handleUpdateClientService(data);
      }
      else{
        setMsg("Guardando cliente...");
        await handleAddClientService(data);
      }
    }
    catch (error) {
      console.error("Error al agregar o editar cliente:", error);
      setErr(`error al ${data.id ? 'editar' : 'agregar'} cliente`);
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
    setApplyFilters(true);
  };

  useEffect(() => {
    if (applyFilters) {
      handleApplyFilters();
      setApplyFilters(false);
    }
  }, [applyFilters]);
  
  useEffect(() => {
    handleApplyFilters();
		if (onCloseErr) {
			setErr("");
		}
  }, []);

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Filtros */}
      <Card mb="22px">
        <CardHeader p="6px 0px 22px 0px">
        <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Filtrar Clientes
          </Text>
        </Flex>        
        <Button
          marginLeft={{ base: "50px", md: "auto" }}
          colorScheme="blue"
          onClick={() => handleOpenModal()}>
          Nuevo Cliente
          </Button>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap="20px">
            <FormControl>
              {/* <FormLabel color="gray.400">Nombre</FormLabel> */}
              <Input
                name="name"
                width={{ base: "100%", md: "180px" }}
                placeholder="Buscar por nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                color="#fff"
                borderColor="gray.600"
              />
            </FormControl>
          </Flex>
          {/* Flex for the buttons */}
          <Flex
            marginStart={{ base: "0px", md: "10px" }}
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
              disabled={name === "" && page === 1}
              onClick={handleClearFilters}
              width={{ base: "100px", md: "auto" }}
              marginLeft={{ base: "30px", md: "0px" }}
            >
              Limpiar
            </Button>
            <Flex
              marginStart={{ base: "0px", md: "500px" }}
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
                _hover={{ bg: (page * clientsPerPage) >= totalClients ? "gray.400" : "purple.500" }}
                bg={(page * clientsPerPage) >= totalClients ? "gray.300" : "brand.200"}
                disabled={(page * clientsPerPage) >= totalClients}
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
      {/* Clients Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        {/* <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              Clientes
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
                this month
              </Text>
            </Flex> 
          </Flex>
        </CardHeader> */}
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Nombre Completo
                </Th>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  DNI
                </Th>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Celular
                </Th>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Correo Electrónico
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Monto total del mes
                </Th>
                {/* <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Estado
                </Th> */}
                {/* <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  % de Comparación
                </Th> */}
                <Th borderBottomColor='#56577A'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listClients.length === 0 ? (
                <Tr>
                  <Th colSpan="6" textAlign="center" color="gray.400">
                    No se encontraron resultados
                  </Th>
                </Tr>
              ) :
              listClients.map((row, index, arr) => {
                return (
                  <TablesProjectRow
                    key={row.id_user}
                    name={row.name + " " + row.last_name}
                    /* logo={row.logo} */
                    /* status={row.status} */
                    email={row.email}
                    dni={row.dni}
                    phone={row.phone}
                    budget="0.00"
                    /* progression={row.progression} */
                    lastItem={index === arr.length - 1 ? true : false}
                    onEdit={() => handleOpenModal(row)}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <ModalCLientForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(data) => handleAddEditClient(data)}
        client={editingClient}
      />
      <CustomModal
				header="Upss!"
				message={err}
				isOpen={isOpenErr}
				onClose={onCloseErr}
        zIndex="1300"
			/>
      {loading && <DotSpin message={msg} />}
    </Flex>
  );
}

export default Client;
