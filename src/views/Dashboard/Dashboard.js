import React,{ useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Grid,
	Icon,
	Progress,
	SimpleGrid,
	Spacer,
	Stack,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	transition
} from '@chakra-ui/react';
// Styles for the circular progressbar
import medusa from 'assets/img/cardimgfree.png';
import imgHome from 'assets/img/fondoHome3.jpg';
// Custom components
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
// Icons
import { MdInventory } from "react-icons/md";
import { CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon, PersonIcon } from 'components/Icons/Icons.js';
import DashboardTableRow from 'components/Tables/DashboardTableRow';
import TimelineRow from 'components/Tables/TimelineRow';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiHappy } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { IoCheckmarkDoneCircleSharp, IoEllipsisHorizontal } from 'react-icons/io5';
// Data
import {
	barChartDataDashboard,
	barChartOptionsDashboard,
	lineChartDataDashboard,
	lineChartOptionsDashboard
} from 'variables/charts';
import { dashboardTableData, timelineData } from 'variables/general';
import { getUser } from "services/Auth/tokenService";
import { DashboardCardInfoService } from "services/Users/UserService";
import { getModulesAndPermissions } from "../../utils/constants";

export default function Dashboard() {
	const navigate = useHistory().push;
	const [loading, setLoading] = useState(false);
	const [infoCardUser, setInfoCardUser] = useState(null);
	const [infoCardInventory, setInfoCardInventory] = useState(null);
	const [infoCardSales, setInfoCardSales] = useState(null);
	const [infoGraphSalesStatus, setInfoGraphSalesStatus] = useState(null);
	const [dataUser, setDataUser] = useState(null);
	const user = getUser();
	const goToProfile = () => {
		navigate("/admin/profile");
	}	
	const goToSales = () => {
		navigate("/admin/sales");
	};
	const goToInventory = () => {
		navigate("/admin/inventory");
	};
	const goToUsers = () => {
		navigate("/admin/users");
	};
	const goToReports = () => {
		navigate("/admin/reports");
	};
	const moduleVentas = getModulesAndPermissions()?.find(module => module.id_module === 1);
	const moduleInventario = getModulesAndPermissions()?.find(module => module.id_module === 2);
	const moduleUsuarios = getModulesAndPermissions()?.find(module => module.id_module === 3);
	const moduleReportes = getModulesAndPermissions()?.find(module => module.id_module === 5);

	const handleCardInfo = async () => {
		try {
			setLoading(true);
			const {data, msg} = await DashboardCardInfoService();
			if (data) {
				setInfoCardUser(data.users);
				setInfoCardInventory(data.inventory);
				setInfoCardSales(data.sales);
				setInfoGraphSalesStatus(data.sales.sales_status);
			}
			else {
				console.error(msg);
			}
		}
		catch (error) {
			console.error(error);
		}
		finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		document.title = "Morochita | Admin";
		if (user){
			setDataUser(user);
			handleCardInfo();
		}
	}, []);
	return (
		<Flex flexDirection='column' pt={{ base: '120px', md: '75px' }}>
			{loading && <Flex justify='center' align='center' w='100%' h='100%'>
				<CircularProgress isIndeterminate color='brand.200' />
			</Flex>}
			{!loading &&
			<SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
				{/* MiniStatistics Card */}
				{moduleReportes &&
				<Card
					_hover={{ bg: 'brand.200', color: '#fff', transition: 'all .5s ease' }}
					onClick={() => goToReports()}
					cursor='pointer'
				>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat me='auto'>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									Ganancia del día
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff'>
										S/. {infoCardSales?.sales_today || 0}
									</StatNumber>
									{/* <StatHelpText
										alignSelf='flex-end'
										justifySelf='flex-end'
										m='0px'
										color='green.400'
										fontWeight='bold'
										ps='3px'
										fontSize='md'>
										+55%
									</StatHelpText> */}
								</Flex>
							</Stat>
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<RocketIcon h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>}
				{/* MiniStatistics Card */}
				{moduleInventario &&
				<Card
					minH='83px' 
					_hover={{ bg: 'brand.200', color: '#fff', transition: 'all .5s ease' }}
					onClick={() => goToInventory()}
					cursor='pointer'
				>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat me='auto'>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									Inventario
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff'>
										{infoCardInventory?.total_inventory || 0}
									</StatNumber>
									<StatHelpText
										display={infoCardInventory?.porcent_inventory_news_month === 0 || !infoCardInventory ? 'none' : 'flex'}
										alignSelf='flex-end'
										justifySelf='flex-end'
										m='0px'
										color={infoCardInventory?.flag_inventory_news_month ? 'red.500' : 'green.400'}
										fontWeight='bold'
										ps='3px'
										fontSize='md'>
										{infoCardInventory?.porcent_inventory_news_month > 0 ? '+' : '-'}
										{infoCardInventory?.porcent_inventory_news_month || 0}%
									</StatHelpText>
								</Flex>
							</Stat>
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<MdInventory h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>}
				{/* MiniStatistics Card */}
				{moduleUsuarios &&
				<Card
					_hover={{ bg: 'brand.200', color: '#fff', transition: 'all .5s ease' }}
					onClick={() => goToUsers()}
					cursor='pointer'
				>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									Usuarios
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff'>
										{infoCardUser?.total_users || 0}
									</StatNumber>
									<StatHelpText
										display={infoCardUser?.porcent_users_news_month === 0 || !infoCardUser ? 'none' : 'flex'}
										alignSelf='flex-end'
										justifySelf='flex-end'
										m='0px'
										color={infoCardUser?.flag_porcent_users ? 'red.500' : 'green.400'}
										fontWeight='bold'
										ps='3px'
										fontSize='md'>
										{infoCardUser?.porcent_users_news_month > 0 ? '+' : '-'}
										{infoCardUser?.porcent_users_news_month || 0}%
									</StatHelpText>
								</Flex>
							</Stat>
							<Spacer />
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<GlobeIcon h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>}
				{/* MiniStatistics Card */}
				{moduleVentas &&
				<Card
					_hover={{ bg: 'brand.200', color: '#fff', transition: 'all .5s ease' }}
					onClick={() => goToSales()}
					cursor='pointer'
				>
					<CardBody>
						<Flex flexDirection='row' align='center' justify='center' w='100%'>
							<Stat me='auto'>
								<StatLabel fontSize='sm' color='gray.400' fontWeight='bold' pb='2px'>
									Total de ventas
								</StatLabel>
								<Flex>
									<StatNumber fontSize='lg' color='#fff' fontWeight='bold'>
										S/. {infoCardSales?.sales_last_6_month || 0}
									</StatNumber>
									<StatHelpText
										display={infoCardSales?.porcent_sales === 0 || !infoCardSales ? 'none' : 'flex'}
										alignSelf='flex-end'
										justifySelf='flex-end'
										m='0px'
										color={infoCardSales?.flag_porcent_sales ? 'red.500' : 'green.400'}
										fontWeight='bold'
										ps='3px'
										fontSize='md'>
										{infoCardSales?.porcent_sales > 0 ? '+' : '-'}
										{infoCardSales?.porcent_sales || 0}%
									</StatHelpText>
								</Flex>
							</Stat>
							<IconBox as='box' h={'45px'} w={'45px'} bg='brand.200'>
								<CartIcon h={'24px'} w={'24px'} color='#fff' />
							</IconBox>
						</Flex>
					</CardBody>
				</Card>}
			</SimpleGrid>}
			<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', '2xl': '2fr 1.2fr 1.5fr' }} my='26px' gap='18px'>
				{/* Welcome Card */}
				<Card
					p='0px'
					gridArea={{ md: '1 / 1 / 2 / 3', '2xl': 'auto' }}
					bgImage={imgHome} /* Image for the background */
					bgSize='cover'
					bgPosition='50%'>
					<CardBody w='100%' h='100%'>
						<Flex flexDirection={{ sm: 'column', lg: 'row' }} w='100%' h='100%'>
							<Flex flexDirection='column' h='100%' p='22px' minW='60%' lineHeight='1.6'>
								<Text fontSize='sm' color='gray.400' fontWeight='bold'>
									Bienvenid@,
								</Text>
								<Text fontSize='28px' color='#fff' fontWeight='bold' mb='18px'>
									{dataUser ? dataUser.name + " " + dataUser.last_name : "Usuario"}
								</Text>
								<Text fontSize='md' color='gray.400' fontWeight='normal' mb='auto'>
									Gestiona tus procesos desde la barra lateral o el ícono del menú.
								</Text>
								<Spacer />
								<Flex align='center'>
									<Button
										onClick={() => goToProfile()}
										p='0px'
										variant='no-hover'
										bg='transparent'
										my={{ sm: '1.5rem', lg: '0px' }}>
										<Text
											fontSize='sm'
											color='#fff'
											fontWeight='bold'
											cursor='pointer'
											transition='all .3s ease'
											my={{ sm: '1.5rem', lg: '0px' }}
											_hover={{ me: '4px' }}>
											Ir al perfil
										</Text>
										<Icon
											as={BsArrowRight}
											w='20px'
											h='20px'
											color='#fff'
											fontSize='2xl'
											transition='all .3s ease'
											mx='.3rem'
											cursor='pointer'
											pt='4px'
											_hover={{ transform: 'translateX(20%)' }}
										/>
									</Button>
								</Flex>
							</Flex>
						</Flex>
					</CardBody>
				</Card>
			</Grid>
			{/* Seguimiento de ventas del mes actual */}
			{loading && <Flex justify='center' align='center' w='100%' h='100%'>
				<CircularProgress isIndeterminate color='brand.200' />
			</Flex>}
			{!loading &&
			<Card justifyContent="center" width="100%" p="6">
			<Flex direction="column">
				<Flex justify="space-between" align="center" mb="40px">
				<Text color="#fff" fontSize="lg" fontWeight="bold">
					Seguimiento de ventas mensuales
				</Text>
				</Flex>

				{/* Sección de estados */}
				<Grid templateColumns={{ sm: '1fr', md: 'repeat(3, 1fr)' }} gap={6} mb={8}>
				{/* Completadas */}
				<Box bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)" borderRadius="20px" p="4">
					<Stat color="#fff">
					<StatLabel color="gray.400">Completadas</StatLabel>
					<StatNumber fontSize="2xl">
					S/.{infoGraphSalesStatus?.complete || 0}
					</StatNumber>
					</Stat>
				</Box>

				{/* Pendientes */}
				<Box bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)" borderRadius="20px" p="4">
					<Stat color="#fff">
					<StatLabel color="gray.400">Pendientes</StatLabel>
					<StatNumber fontSize="2xl">
						S/.{infoGraphSalesStatus?.pending || 0}
					</StatNumber>
					</Stat>
				</Box>

				{/* Anuladas */}
				<Box bg="linear-gradient(126.97deg, #060C29 28.26%, rgba(4, 12, 48, 0.5) 91.2%)" borderRadius="20px" p="4">
					<Stat color="#fff">
					<StatLabel color="gray.400">Anuladas</StatLabel>
					<StatNumber fontSize="2xl">
						S/.{infoGraphSalesStatus?.annul || 0}
					</StatNumber>
					</Stat>
				</Box>
				</Grid>

				{/* Gráficas */}
				<Grid templateColumns={{ sm: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
				<Box textAlign="center">
					<CircularProgress value={Number(infoGraphSalesStatus?.porcent_complete) || 0} size="120px" color="green.400" thickness="6px">
					<CircularProgressLabel>
						<Text 
							color="#fff"
							fontSize="12px"
						>
							Completadas
						</Text>
						<Text
							color="green.400"
							fontSize="lg"
							fontWeight="bold"
						>
							{infoGraphSalesStatus?.porcent_complete || 0}%
						</Text>
					</CircularProgressLabel>
					</CircularProgress>
				</Box>

				<Box textAlign="center">
					<CircularProgress value={Number(infoGraphSalesStatus?.porcent_pending) || 0} size="120px" color="yellow.400" thickness="6px">
					<CircularProgressLabel>
						<Text
							color="#fff"
							fontSize="12px"
						>
							Pendientes
						</Text>
						<Text
							fontSize="lg"
							fontWeight="bold"
							color="yellow.400"
						>
							{infoGraphSalesStatus?.porcent_pending || 0}%
						</Text>
					</CircularProgressLabel>
					</CircularProgress>
				</Box>

				<Box textAlign="center">
					<CircularProgress value={Number(infoGraphSalesStatus?.porcent_annul) || 0} size="120px" color="red.400" thickness="6px">
					<CircularProgressLabel>
						<Text
							color="#fff"
							fontSize="12px"
						>
							Anuladas
						</Text>
						<Text
							fontSize="lg"
							fontWeight="bold"
							color="red.400"
						>
							{infoGraphSalesStatus?.porcent_annul || 0}%
						</Text>
					</CircularProgressLabel>
					</CircularProgress>
				</Box>
				</Grid>
			</Flex>
			</Card>}
			
			<Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '2fr 1fr' }} gap='24px'>
				{/* Projects 
				<Card p='16px' overflowX={{ sm: 'scroll', xl: 'hidden' }}>
					<CardHeader p='12px 0px 28px 0px'>
						<Flex direction='column'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' pb='8px'>
								Projects
							</Text>
							<Flex align='center'>
								<Icon as={IoCheckmarkDoneCircleSharp} color='teal.300' w={4} h={4} pe='3px' />
								<Text fontSize='sm' color='gray.400' fontWeight='normal'>
									<Text fontWeight='bold' as='span'>
										30 done
									</Text>{' '}
									this month.
								</Text>
							</Flex>
						</Flex>
					</CardHeader>
					<Table variant='simple' color='#fff'>
						<Thead>
							<Tr my='.8rem' ps='0px'>
								<Th
									ps='0px'
									color='gray.400'
									fontFamily='Plus Jakarta Display'
									borderBottomColor='#56577A'>
									Companies
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Members
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Budget
								</Th>
								<Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
									Completion
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{dashboardTableData.map((row, index, arr) => {
								return (
									<DashboardTableRow
										name={row.name}
										logo={row.logo}
										members={row.members}
										budget={row.budget}
										progression={row.progression}
										lastItem={index === arr.length - 1 ? true : false}
									/>
								);
							})}
						</Tbody>
					</Table>
				</Card>*/}
				{/* Orders Overview 
				<Card>
					<CardHeader mb='32px'>
						<Flex direction='column'>
							<Text fontSize='lg' color='#fff' fontWeight='bold' mb='6px'>
								Orders overview
							</Text>
							<Flex align='center'>
								<Icon as={AiFillCheckCircle} color='green.500' w='15px' h='15px' me='5px' />
								<Text fontSize='sm' color='gray.400' fontWeight='normal'>
									<Text fontWeight='bold' as='span' color='gray.400'>
										+30%
									</Text>{' '}
									this month
								</Text>
							</Flex>
						</Flex>
					</CardHeader>
					<CardBody>
						<Flex direction='column' lineHeight='21px'>
							{timelineData.map((row, index, arr) => {
								return (
									<TimelineRow
										logo={row.logo}
										title={row.title}
										date={row.date}
										color={row.color}
										index={index}
										arrLength={arr.length}
									/>
								);
							})}
						</Flex>
					</CardBody>
				</Card>*/}
			</Grid>
		</Flex>
	);
}
