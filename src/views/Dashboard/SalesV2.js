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
import { PaymentsListService } from "services/Sales/PaymentsService";
import {
  SalesListService,
  SalesCreateService,
  SalesUpdateService,
  SalesDetailsService
} from "services/Sales/SalesService";
import { UserListService } from "services/Users/UserService";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";
import { dateToTimestamp } from "components/utils/Methods";

// Componente personalizado
import ModalSalesForm from "../components/sales/ModalSalesForm";

function Sales() {
  const [sellers, setSellers] = useState([]);
  const [status, setStatus] = useState([]);
  const [payments, setPayments] = useState([]);
  const [productsDetails, setProductsDetails] = useState([]);
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
  const handlePaymentsList = async () => {
    setLoading(true);
    setMsg("Cargando métodos de pago...");
    try {
      const { data, msg } = await PaymentsListService();
      if (data) {
        setPayments(data);
      }
      else {
        setErr("Error al obtener los métodos de pago");
        onOpenErr();
      }
    }
    catch (error) {
      setErr("Error inesperado al obtener los métodos de pago");
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
    handlePaymentsList();
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedSale(null);
    setProductsDetails([]);
  };

  const handleOpenModal = (sale) => {
    if (sale)
      handleDetailsSale(sale.id_sale);
    else
      setProductsDetails([]);
    setSelectedSale(sale || null);
    setIsOpenModal(true);
  };

  const handleAddSaleService = async (data) => {
    const { exito, msg, prod } = await SalesCreateService(data);
    if (exito) {
      handleCloseModal();
      toast({
        title: "Éxito",
        description: "Venta guardada exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    else if (msg === "STOCK_INSUFICIENTE"){
      toast({
        title: "¡Error!",
        description: `No hay suficiente stock para el producto ${prod}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    else if (
      msg.includes("no fue encontrado en el inventario") ||
      msg.includes("No hay suficiente stock") ||
      msg.includes("una venta anulada")
    ){
      toast({
        title: "¡Error!",
        description: msg,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    else if (msg === "PRODUCTO_NO_ENCONTRADO"){
      data.products.find(p => p.id === prod).name;
      toast({
        title: "¡Error!",
        description: `No se encontró el producto ${prod} en la base de datos`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: "Ups..",
        description: "Ocurrió un error inesperado al guardar la venta",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    if(!exito) return;
  };

  const handleUpdateSaleService = async (data) => {
    const { exito, msg, prod } = await SalesUpdateService(data);
    if (exito) {
      handleCloseModal();
      toast({
        title: "Éxito",
        description: "Venta actualizada exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    else if (msg === "STOCK_INSUFICIENTE"){
      toast({
        title: "¡Error!",
        description: `No hay suficiente stock para el producto ${prod}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    else if (msg === "PRODUCTO_NO_ENCONTRADO"){
      data.products.find(p => p.id === prod).name;
      toast({
        title: "¡Error!",
        description: `No se encontró el producto ${prod} en la base de datos`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: "Ups..",
        description: "Ocurrió un error inesperado al actualizar la venta",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }    
    if(!exito) return;
  };

  const handleGestionarVenta = async (sale) => {
    setLoading(true);
    try {
      if (!sale) {
        setErr("Error al obtener los datos de la venta");
        onOpenErr();
        return;
      } else if (sale.id) {
        setMsg("Actualizando venta...");
        await handleUpdateSaleService(sale);
      } else {
        setMsg("Registrando venta...");
        await handleAddSaleService(sale);
      }
    }
    catch (error) {
      console.error("Error al gestionar la venta:", error);
      setErr("Error inesperado al gestionar la venta");
      onOpenErr();
    }
    finally {
      setApplyFiltersFlag(true);
      setLoading(false);
      setMsg("");
    }
  }

  const handleDetailsSale = async (id_sale) => {
    if (!id_sale) return;
    setLoading(true);
    setMsg("Cargando detalle...");
    try {
      const { data, msg } = await SalesDetailsService(id_sale);
      if (data) {
        setProductsDetails(data.map((product) => ({
          id: product.id_product,
          name: product.name_product,
          price: product.price,
          stock: product.stock,
          talla: product.talla,
          quantity: product.quantity,
          subtotal: product.subtotal
        })));
      }
      else {
        setErr("Error al obtener el detalle de la venta");
        onOpenErr();
      }
    }
    catch (error) {
      setErr("Error inesperado al obtener los detalles de la venta");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  }

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
            mt={{ base: "10px", md: "0" }}
            marginLeft={{ base: "50px", md: "auto" }}
            alignSelf={{ base: "flex-end", lg: "flex-end" }}
            colorScheme="blue"
            onClick={() => handleOpenModal()}
          >
            Nueva Venta
          </Button>
        </CardHeader>
        <CardBody>
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap="20px"
            justifyContent="space-between"
            alignItems="center"
            width={{ base: "100%", md: "auto" }}
          >
            {/* Filtros */}
            <Flex direction={{ base: "column", md: "row" }} gap="20px" flex="1">
              <FormControl>
                <FormLabel color="gray.400">Vendedor</FormLabel>
                <Menu>
                  <MenuButton
                    width={{ base: "100%", md: "100%" }}
                    border="1px solid #4B5563"
                    as={Button}
                    rightIcon={<ChevronDownIcon color={filters.seller ? "white" : "gray.200"} />}
                    bg="none"
                    color={!filters.seller ? "gray.500" : "white"}
                    _hover={{ bg: "none", borderColor: "gray.300" }}
                    _active={{ bg: "none", borderColor: "white" }}
                  >
                    {filters.seller || "Seleccionar"}
                  </MenuButton>
                  <MenuList bg="gray.700" color="white" size="12px" overflowY="auto" maxHeight="200px">
                    {sellers.map((s) => (
                      <MenuItem
                        key={s.id_user}
                        onClick={() => {
                          setFilters((prevFilters) => ({ ...prevFilters, seller: `${s.name} ${s.last_name}` }));
                          setIdSeller(s.id_user);
                        }}
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
                    width={{ base: "100%", md: "100%" }}
                    border="1px solid #4B5563"
                    as={Button}
                    rightIcon={<ChevronDownIcon color={filters.status ? "white" : "gray.200"} />}
                    bg="none"
                    color={!filters.status ? "gray.500" : "white"}
                    _hover={{ bg: "none", borderColor: "gray.300" }}
                    _active={{ bg: "none", borderColor: "white" }}
                  >
                    {filters.status || "Seleccionar"}
                  </MenuButton>
                  <MenuList bg="gray.700" color="white" size="12px">
                    {status.map((s) => (
                      <MenuItem
                        key={s.id}
                        onClick={() => {
                          setFilters((prevFilters) => ({ ...prevFilters, status: s.name }));
                          setIdStatus(s.id);
                        }}
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
                <InputGroup width={{ base: "100%", md: "auto" }}>
                  <InputRightElement pointerEvents="none">
                    <CalendarIcon color="gray.300" marginRight="60px" />
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

            {/* Contenedor de botones */}
            <Flex
              mt={{ base: "30px", lg: "0" }}
              alignSelf={{ base: "flex-end", lg: "flex-end" }}
              alignItems={{ base: "center", lg: "flex-end" }}
              justifyContent={{ base: "center", lg: "flex-end" }}
              gap="10px"
              direction={{ base: "column", md: "row" }}
              width={{ base: "100%", md: "auto" }}
            >
              <Button
                _hover={{ bg: "brand.300" }}
                bg="brand.200"
                textColor="white"
                onClick={handleApplyFilters}
                width={{ base: "100%", md: "auto" }}
              >
                Aplicar
              </Button>
              <Button
                _hover={{ bg: "white" }}
                bg="gray.300"
                disabled={Object.values(filters).every((filter) => filter === "") && page === 1}
                onClick={handleClearFilters}
                width={{ base: "100%", md: "auto" }}
              >
                Limpiar
              </Button>
              <Button
                _hover={{ bg: page === 1 ? "gray.400" : "purple.500" }}
                bg={page === 1 ? "gray.300" : "brand.200"}
                disabled={page === 1}
                onClick={handleDecrementPage}
                width={{ base: "100%", md: "auto" }}
                textColor={page === 1 ? "gray.500" : "white"}
              >
                {'<'}
              </Button>
              <Button
                _hover={{ bg: (page * salesPerPage) >= totalSales ? "gray.400" : "purple.500" }}
                bg={(page * salesPerPage) >= totalSales ? "gray.300" : "brand.200"}
                disabled={(page * salesPerPage) >= totalSales}
                onClick={handleIncrementPage}
                width={{ base: "100%", md: "auto" }}
                textColor={(page * salesPerPage) >= totalSales ? "gray.500" : "white"}
              >
                {'>'}
              </Button>
            </Flex>
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
              {sales.length === 0 ? (
                <Tr>
                  <Th colSpan="6" textAlign="center" color="gray.400">
                    No se encontraron resultados
                  </Th>
                </Tr>
              ) :
              sales.map((row, index) => (
                <TableRowSales
                  key={row.id_sale}
                  customerName={row.name_client}
                  payment={row.name_payment}
                  saleDate={row.date_sale}
                  totalSale={row.total}
                  status={row.name_status}
                  onViewDetails={() => {
                    handleDetailsSale(row.id_sale);
                    handleOpenModal(row);
                  }}
                />
              ))}
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      {/* <Modal isOpen={isOpen} onClose={onClose}>
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
      </Modal> */}
      <ModalSalesForm
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onSubmit={(data) => handleGestionarVenta(data)}
        sale={selectedSale}
        detailsProd={productsDetails}
        status={status}
        payment={payments}
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

export default Sales;