import React, { useState, useEffect } from "react";
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Button,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon, CalendarIcon } from "@chakra-ui/icons";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TableRowSales from "components/Tables/TablesProjectRowSales";
import { salesData } from "variables/general";
import { StatusListService } from "services/Sales/StatusSales";
import { SalesListService } from "services/Sales/SalesService";
import { UserListService } from "services/Users/UserService";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";
import { dateToTimestamp } from "components/utils/Methods";

// Componente personalizado
import ModalSaleForm from "../components/sales/ModalSaleForm";

function Sales() {
  const [sellers, setSellers] = useState([]);
  const [status, setStatus] = useState([]);
  const [idStatus, setIdStatus] = useState(0);
  const [idSeller, setIdSeller] = useState(0);
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [salesPerPage, setSalesPerPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);
  // Función para obtener la fecha actual
  const now = new Date();
  now.setHours(now.getHours() - 5);
  const today = now.toISOString().split("T")[0];
  
  const [filters, setFilters] = useState({
    seller: "",
    status: "",
    saleDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleStatusList = async () => {
    setLoading(true);
    setMsg("Cargando estados...");
    try {
      const { data, msg } = await StatusListService();
      if (data) {
        setStatus(data);
      }
      else {
        console.log("Error al obtener la lista de estados:", msg);
        setErr("Error al obtener los estados");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de estados:", error);
      setErr("Error al obtener los estados");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  }

  const handleApplyFilters = async () => {
    const ts = dateToTimestamp(filters.saleDate);
    // Lógica para aplicar los filtros
    const form = {
      page: page,
      idSeller: idSeller,
      idStatus: idStatus,
      dateSale: ts,
    };
    setLoading(true);
    setMsg("Cargando ventas...");
    try {
      const { data, msg } = await SalesListService(form);
      if (data) {
        setSales(data.sales);
        setTotalSales(data.total);
        setSalesPerPage(data.page_size);
      }
      else {
        console.log("Error al obtener la lista de ventas:", msg);
        setErr("Error al obtener los ventas");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de ventas:", error);
      setErr("Error al obtener los ventas");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  const handleSellerList = async () => {
    // Lógica para aplicar los filtros
    const form = {
      page: 1,
      name: "",
      idRol: 3,
      dateCreation: -1,
    };
    setLoading(true);
    setMsg("Cargando vendedores...");
    try {
      const { data, msg } = await UserListService(form);
      if (data) {
        setSellers(data.users);
      }
      else {
        console.log("Error al obtener la lista de vendedores:", msg);
        setErr("Error al obtener los vendedores");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de vendedores:", error);
      setErr("Error al obtener los vendedores");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  useEffect(() => {
    // llamada de servicios al cargar la vista
    handleStatusList();
    handleSellerList();
    handleApplyFilters();
		if (onCloseErr) {
			setErr("");
		}
  }, []);

  const handleClearFilters = () => {
    setFilters({
      seller: "",
      status: "",
      saleDate: "",
    });
    setIdStatus(0);
    setIdSeller(0);
    setPage(1);
    setApplyFiltersFlag(true);
  };

  useEffect(() => {
    if (applyFiltersFlag) {
      handleApplyFilters();
      setApplyFiltersFlag(false);
    }
  }, [applyFiltersFlag]);

  const handleIncrementPage = () => {
    setPage(page + 1);
    setApplyFiltersFlag(true);
  };

  const handleDecrementPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    setApplyFiltersFlag(true);
  };

  const { isOpen: isOpenErr, onOpen: onOpenErr, onClose: onCloseErr } = useDisclosure();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSale, setSelectedSale] = useState(null);

  const handleAddSale = () => {
    setSelectedSale(null);
    onOpen();
  };

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    onOpen();
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card mb="22px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction={{ base: "column", md: "row" }} gap="20px">
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              Filtros de Ventas
            </Text>
          </Flex>
          <Button
            marginLeft={{ base: "50px", md: "auto" }}
            colorScheme="blue"
            onClick={handleAddSale}
          >
            Nueva Venta
          </Button>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <FormControl>
              <FormLabel color="gray.400">Vendedor</FormLabel>
              <Menu>
                <MenuButton
                  width={{ base: "100%", md: "220px" }}
                  border="1px solid #4B5563"
                  as={Button}
                  rightIcon={<ChevronDownIcon color={filters.seller ? "white" : "gray.200"} />}
                  bg="none" 
                  bord color={!filters.seller ? "gray.500" : "white" } 
                  _hover={{ bg: "none", borderColor: "gray.300" }}
                  _active={{ bg: "none", borderColor: "white" }}
                >
                  {filters.seller || "Seleccionar Vendedor"}
                </MenuButton>
                <MenuList bg="gray.700" color="white" size="12px">
                  {sellers
                    .map((s) => (
                    <MenuItem
                      size="12px"
                      key={s.id_user}
                      onClick={() => {
                        setFilters((prevFilters) => ({ ...prevFilters, seller: s.name }));
                        setIdSeller(s.id_user);
                      }}
                      /* onClick={() => setFilters({ ...filters, role: rol.name })} */
                      _hover={{ bg: "purple.500" }}
                      _focus={{ bg: "purple.500" }}
                    >
                      {s.name} {s.last_name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Estado</FormLabel>
              <Menu>
                <MenuButton
                  width={{ base: "100%", md: "220px" }}
                  border="1px solid #4B5563"
                  as={Button}
                  rightIcon={<ChevronDownIcon color={filters.status ? "white" : "gray.200"} />}
                  bg="none" 
                  bord color={!filters.status ? "gray.500" : "white" } 
                  _hover={{ bg: "none", borderColor: "gray.300" }}
                  _active={{ bg: "none", borderColor: "white" }}
                >
                  {filters.status || "Seleccionar Estado"}
                </MenuButton>
                <MenuList bg="gray.700" color="white" size="12px">
                  {status
                    .map((s) => (
                    <MenuItem
                      size="12px"
                      key={s.id}
                      onClick={() => {
                        setFilters((prevFilters) => ({ ...prevFilters, status: s.name }));
                        setIdStatus(s.id);
                      }}
                      /* onClick={() => setFilters({ ...filters, role: rol.name })} */
                      _hover={{ bg: "purple.500" }}
                      _focus={{ bg: "purple.500" }}
                    >
                      {s.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Fecha de Venta</FormLabel>
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
                  name="saleDate"
                  value={filters.saleDate}
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
            {/* <Flex
              marginStart={{ base: "0px", md: "50px", lg: "50px" }}
              justifyContent="flex-end"
              gap="10px"
              direction={{ base: "column", md: "row" }}
            > */}
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
                _hover={{ bg: (page * salesPerPage) >= totalSales ? "gray.400" : "purple.500" }}
                bg={(page * salesPerPage) >= totalSales ? "gray.300" : "brand.200"}
                disabled={(page * salesPerPage) >= totalSales}
                onClick={handleIncrementPage}
                width={{ base: "70px", md: "70px" }}
                marginLeft={{ base: "30px", md: "0px" }}
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  {'>'}
                </Text>
              </Button>
          </Flex>
        </CardBody>
      </Card>

      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        {/* <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color="#fff" fontWeight="bold" mb=".5rem">
              Listado de Ventas
            </Text>
          </Flex>
        </CardHeader> */}
        <CardBody>
          <Table variant="simple" color="#fff">
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th color="gray.400">Cliente</Th>
                <Th color="gray.400">Medio de Pago</Th>
                <Th color="gray.400">Fecha de Venta</Th>
                <Th color="gray.400">Total</Th>
                <Th color="gray.400">Estado</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {sales.length !== 0 ? (
                <Tr>
                  <Th colSpan="6" textAlign="center" color="gray.400">
                    No se encontraron resultados
                  </Th>
                </Tr>
              ) :
              salesData.map((row, index) => (
                <TableRowSales
                  key={index}
                  customerName={row.customerName}
                  payment={row.product}
                  saleDate={row.saleDate}
                  totalSale={row.totalSale}
                  status={row.status}
                  onViewDetails={() => handleViewDetails(row)}
                />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedSale ? "Detalles de Venta" : "Agregar Venta"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalSaleForm sale={selectedSale} onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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

export default Sales;