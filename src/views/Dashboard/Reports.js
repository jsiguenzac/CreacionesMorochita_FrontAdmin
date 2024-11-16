import React, { useState, useEffect } from "react";
// Chakra imports
import {
  Flex,
  Box,
  Grid,
  SimpleGrid,
  Progress,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tr,
  useToast,
  useDisclosure,
  CircularProgress,
} from "@chakra-ui/react";

import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { ChevronDownIcon, CalendarIcon, DownloadIcon } from "@chakra-ui/icons";

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
import { dateToTimestamp } from "components/utils/Methods";

// Data
import { UserListService } from "services/Users/UserService";
import { ReportExportService } from "services/Sales/ReportsSalesServices";
import {
	barChartDataDashboard,
	barChartOptionsDashboard,
	lineChartDataDashboard,
	lineChartOptionsDashboard
} from 'variables/charts';
// Icons
import { AiFillCheckCircle } from "react-icons/ai";
import { CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon, PersonIcon } from 'components/Icons/Icons.js';

function Reports() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [sellers, setSellers] = useState([]);
  const [idSeller, setIdSeller] = useState(0);
  const [filters, setFilters] = useState({
    seller: "",
    dateInit: "",
    dateEnd: "",
  });

  const { isOpen: isOpenErr, onOpen: onOpenErr, onClose: onCloseErr } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // Función para obtener la fecha actual
  const now = new Date();
  now.setHours(now.getHours() - 5);
  const today = now.toISOString().split("T")[0];
  const yesterday = new Date(now.setDate(now.getDate() - 1)).toISOString().split("T")[0];

  const handleSellerList = async () => {
    const form = {
      page: 1,
      name: "",
      idRol: 3,
      dateCreation: -1,
    };
    setLoading(true);
    setMsg("Obteniendo vendedores...");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDownloadReport = async () => {
    try {
      const tsInit = dateToTimestamp(filters.dateInit);
      const tsEnd = dateToTimestamp(filters.dateEnd);
      const form = {
        seller: idSeller,
        dateInit: tsInit,
        dateEnd: tsEnd,
      };
      setLoading(true);
      setMsg("Descargando reporte...");
      const { exito, msg } = await ReportExportService(form);
      if (exito) {
        toast({
          title: "Reporte descargado",
          description: "El reporte de ventas se descargó correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      else if (msg === "FECHA_FIN_MENOR") {
        toast({
          title: "Ups!",
          description: "La fecha de fin debe ser mayor a la fecha de inicio",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
      else if (msg === "NO_HAY_VENTAS") {
        toast({
          title: "Ups!",
          description: "No se encontraron ventas para exportar",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
      else if (msg === "ERROR_EXPORTAR_EXCEL") {
        toast({
          title: "¡Oh no!",
          description: "Ocurrió un error al descargar el reporte de ventas.\nIntentelo de nuevo, más tarde",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      else {
        console.log("ErrExport", msg);
        toast({
          title: "¡Oh no!",
          description: "Ocurrió un error al descargar el reporte de ventas.\nIntentelo de nuevo, más tarde",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    catch (error) {
      console.error("Error al descargar el reporte:", error);
      toast({
        title: "¡Oh no!",
        description: "Ocurrió un error inesperado al exportar el reporte de ventas.\nContacte al desarrollador",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  const handleClearFilters = () => {
    setIdSeller(0);
    setFilters({
      seller: "",
      dateInit: "",
      dateEnd: "",
    });
  };
  
  useEffect(() => {
    handleSellerList();
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
              Generación de Reportes de Ventas
              <br />
              <Text fontSize="sm" color="gray.400" fontWeight="medium">
                Filtra las ventas según un rango de fechas y/o un vendedor específico.
              </Text>
            </Text>
          </Flex>
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
                    name="seller"
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
                <FormLabel color="gray.400">Fecha Inicio</FormLabel>
                <InputGroup width={{ base: "100%", md: "auto" }}>
                  <InputRightElement pointerEvents="none">
                    <CalendarIcon color="gray.300" marginRight="60px" />
                  </InputRightElement>
                  <Input
                    type="date"
                    pl="10px"
                    name="dateInit"
                    value={filters.dateInit}
                    onChange={handleInputChange}
                    color="#fff"
                    borderColor="gray.600"
                    max={yesterday}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel color="gray.400">Fecha Fin</FormLabel>
                <InputGroup width={{ base: "100%", md: "auto" }}>
                  <InputRightElement pointerEvents="none">
                    <CalendarIcon color="gray.300" marginRight="60px" />
                  </InputRightElement>
                  <Input
                    type="date"
                    pl="10px"
                    name="dateEnd"
                    value={filters.dateEnd}
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
                onClick={handleDownloadReport}
                width={{ base: "100%", md: "auto" }}
              >
                <Icon as={DownloadIcon} w="20px" h="20px" me="5px" />
                <Text fontSize="sm">
                  Generar Reporte
                </Text>
              </Button>
              <Button
                _hover={{ bg: "white" }}
                bg="gray.300"
                disabled={Object.values(filters).every((filter) => filter === "")}
                onClick={handleClearFilters}
                width={{ base: "100%", md: "auto" }}
              >
                Limpiar
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {/* Report Table */}
      {/* <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Vendedor
                </Th>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Método de Pago
                </Th>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Cliente
                </Th>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Fecha de Venta
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Monto total
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Estado
                </Th>
                <Th borderBottomColor='#56577A'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {listReport.length === 0 ? (
                <Tr>
                  <Th colSpan="6" textAlign="center" color="gray.400">
                    No se encontraron resultados
                  </Th>
                </Tr>
              ) :
              listReport.map((row, index, arr) => {
                return (
                  <TablesProjectRow
                    key={row.id_user}
                    name={row.name + " " + row.last_name}
                    email={row.email}
                    dni={row.dni}
                    phone={row.phone}
                    budget="0.00"
                    lastItem={index === arr.length - 1 ? true : false}
                    onEdit={() => handleOpenModal(row)}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>        
      </Card> */}
      
      {/* Graficas */}
      {/* <Flex 
        direction='row'
        justifyContent='center'
        alignItems='center'
        mt='10px'
        marginBottom='20px'
      >
        <Text fontSize='lg' color='#fff' fontWeight='bold'>
          Gráfica de Ventas
        </Text>
      </Flex> */}
      {/* Sales Overview */}
      {loading && <Flex justify='center' align='center' w='100%' h='100%'>
        <CircularProgress isIndeterminate color='brand.200' />
      </Flex>}
      {!loading && <Card justifyContent="center" width="100%" p="6">
        <CardHeader mb='20px' ps='22px'>
          <Flex direction='column' alignSelf='flex-start'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
              Ventas del año
            </Text>
            <Text fontSize='md' fontWeight='medium' color='gray.400'>
              <Text 
                as='span'
                color='green.400'
                fontWeight='bold'
              >
                (+5%) más
              </Text>{' '}
              en {1900 + new Date().getYear()}
            </Text>
          </Flex>
        </CardHeader>
        <Box w='100%' minH={{ sm: '300px' }}>
          <LineChart
            lineChartData={lineChartDataDashboard}
            lineChartOptions={lineChartOptionsDashboard}
          />
        </Box>
      </Card>}
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

export default Reports;
