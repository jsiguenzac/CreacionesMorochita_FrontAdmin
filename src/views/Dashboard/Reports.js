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

// Data
import { UserListService, UserUpdateService, UserCreateService } from "services/Users/UserService";
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
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [applyFilters, setApplyFilters] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [sellers, setSellers] = useState([]);
  const [listReport, setListReport] = useState([]);
  const [idSeller, setIdSeller] = useState("");
  const [reportPerPage, setReportPerPage] = useState(10);
  const [totalReport, setTotalReport] = useState(0);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
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
    setMsg("Aplicando filtros...");
    try {
      const { data, msg } = await UserListService(form);
      if (data) {
        console.log("Clientes:", data);
      }
      else {
        console.log("Error al obtener el reporte:", msg);
        setErr("Error al obtener el reporte");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener el reporte:", error);
      setErr("Error inesperado al obtener el reporte");
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
    setFilters({
      seller: "",
      dateInit: "",
      dateEnd: "",
    });
  };

  useEffect(() => {
    if (applyFilters) {
      handleApplyFilters();
      setApplyFilters(false);
    }
  }, [applyFilters]);
  
  useEffect(() => {
    handleSellerList();
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
              Filtros de Búsqueda
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
                _hover={{ bg: (page * reportPerPage) >= totalReport ? "gray.400" : "purple.500" }}
                bg={(page * reportPerPage) >= totalReport ? "gray.300" : "brand.200"}
                disabled={(page * reportPerPage) >= totalReport}
                onClick={handleIncrementPage}
                width={{ base: "100%", md: "auto" }}
                textColor={(page * reportPerPage) >= totalReport ? "gray.500" : "white"}
              >
                {'>'}
              </Button>
              <Button
                _hover={{ bg: "purple.500" }}
                bg={(page * reportPerPage) >= totalReport ? "gray.300" : "brand.200"}
                disabled={(page * reportPerPage) >= totalReport}
                onClick={handleIncrementPage}
                width={{ base: "100%", md: "auto" }}
                textColor={(page * reportPerPage) >= totalReport ? "gray.500" : "white"}
              >
                <Icon as={DownloadIcon} w="20px" h="20px" me="5px" />
                <Text fontSize="sm">
                  Exportar
                </Text>
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {/* Clients Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
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
      </Card>
      
      {/* Graficas */}
      <Flex 
        direction='row'
        justifyContent='center'
        alignItems='center'
        mt='10px'
        marginBottom='20px'
      >
        <Text fontSize='lg' color='#fff' fontWeight='bold'>
          Gráficas
        </Text>
      </Flex>
      <Grid
				templateColumns={{ sm: '1fr', lg: '1.7fr 1.3fr' }}
				maxW={{ sm: '100%', md: '100%' }}
				gap='24px'
				mb='24px'
      >
				{/* Sales Overview */}
				<Card p='28px 0px 0px 0px'>
					<CardHeader mb='20px' ps='22px'>
						<Flex direction='column' alignSelf='flex-start'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
								Ventas del año
							</Text>
							<Text fontSize='md' fontWeight='medium' color='gray.400'>
								<Text as='span' color='green.400' fontWeight='bold'>
									(+5%) more
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
				</Card>
				{/* Active Users */}
				<Card p='16px'>
					<CardBody>
						<Flex direction='column' w='100%'>
							<Box
								bg='linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)'
								borderRadius='20px'
								display={{ sm: 'flex', md: 'block' }}
								justify={{ sm: 'center', md: 'flex-start' }}
								align={{ sm: 'center', md: 'flex-start' }}
								minH={{ sm: '180px', md: '220px' }}
								p={{ sm: '0px', md: '22px' }}>
								<BarChart
									barChartOptions={barChartOptionsDashboard}
									barChartData={barChartDataDashboard}
								/>
							</Box>
							<Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
								<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
									Clientes activos
								</Text>
								<Text fontSize='md' fontWeight='medium' color='gray.400'>
									<Text as='span' color='green.400' fontWeight='bold'>
										(+23%)
									</Text>{' '}
									en la última semana
								</Text>
							</Flex>
							<SimpleGrid gap={{ sm: '12px' }} columns={4}>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<WalletIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Users
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										32,984
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={20} />
								</Flex>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<RocketIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Clicks
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										2.42m
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={90} />
								</Flex>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<CartIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Sales
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										2,400$
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={30} />
								</Flex>
								<Flex direction='column'>
									<Flex alignItems='center'>
										<IconBox as='box' h={'30px'} w={'30px'} bg='brand.200' me='6px'>
											<StatsIcon h={'15px'} w={'15px'} color='#fff' />
										</IconBox>
										<Text fontSize='sm' color='gray.400'>
											Items
										</Text>
									</Flex>
									<Text
										fontSize={{ sm: 'md', lg: 'lg' }}
										color='#fff'
										fontWeight='bold'
										mb='6px'
										my='6px'>
										320
									</Text>
									<Progress colorScheme='brand' bg='#2D2E5F' borderRadius='30px' h='5px' value={50} />
								</Flex>
							</SimpleGrid>
						</Flex>
					</CardBody>
				</Card>
			</Grid>
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
