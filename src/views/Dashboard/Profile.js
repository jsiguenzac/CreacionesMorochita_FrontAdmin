import {
	Avatar,
	AvatarBadge,
	AvatarGroup,
	Box,
	Button,
	CircularProgress,
	CircularProgressLabel,
	DarkMode,
	Flex,
	Grid,
	Icon,
	Image,
	Link,
	Switch,
	Text,
	useDisclosure
} from '@chakra-ui/react';
import avatar11 from 'assets/img/avatars/avatar11.png';

// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import LineChart from 'components/Charts/LineChart';
import IconBox from 'components/Icons/IconBox';
import { CarIcon, FulgerIcon, FulgerWhiteIcon } from 'components/Icons/Icons';
import { Separator } from 'components/Separator/Separator';
import { BsArrowRight } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaPencilAlt, FaTwitter } from 'react-icons/fa';
// Icons
import { IoDocumentsSharp, IoKey, IoKeyOutline, IoKeySharp } from 'react-icons/io5';
import { getUser, clearAllStorage, removeUser, saveUser } from 'services/Auth/tokenService';
// Data
import {
	lineChartDataProfile1,
	lineChartDataProfile2,
	lineChartOptionsProfile1,
	lineChartOptionsProfile2
} from 'variables/charts';
import { React, useState, useEffect } from 'react';
import { CustomModal } from 'components/Modal/ModalMessage';
import { DetailUser } from 'services/Profile/DetailUser';
import DotSpin from 'components/utils/BounciLoader';

import { EditProfileButton } from '../components/profile/EditProfileButton';
import { ChangePasswordButtom } from '../components/profile/ChangePasswordButton';

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [dataUser, setDataUser] = useState(null);
	
    const user = getUser();
	
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
	const { isOpen: isOpenChangePassword, onOpen: onOpenChangePassword, onClose: onCloseChangePassword } = useDisclosure();
	const { isOpen: isOpenErr, onOpen: onOpenErr, onClose: onCloseErr } = useDisclosure();

	const handleShowModalErr = () => {
		if (err) {
			onOpenErr();
		}
	};

    const handleDataUser = async () => {
        setLoading(true);
        try {
            const { data, msg } = await DetailUser(user.id_user);

            if (data) {
				removeUser();
				saveUser(data);
                setDataUser(data);
            } else if (msg === "USUARIO_NO_ENCONTRADO" || msg === "USUARIO_INACTIVO") {
				clearAllStorage();
                setErr("Usuario no encontrado o inactivo");
				handleShowModalErr();
            } else {
                clearAllStorage();
                setErr("Error al obtener datos del usuario");
				handleShowModalErr();
            }
        } catch (error) {
            console.error("Error al obtener datos del usuario: ", error);
            setErr("Error al obtener datos del usuario");
			handleShowModalErr();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
		console.log("user: ", user);
		console.log("dataUser: ", dataUser);
		console.log("err: ", err);
        if (user && !dataUser) {
            handleDataUser();
        }
		if (onCloseErr) {
			setErr("");
		}
    }, []);

	// Creamos una constante con los datos a editar
    const userDataEdit = dataUser ? {
		id_user: dataUser.id_user,
        name: dataUser.name,
		last_name: dataUser.last_name,
		dni: dataUser.dni,
		email: dataUser.email,
		phone: dataUser.phone
    } : {};
	
    if (!user) {
        return (
		<Flex direction='column' mt={{ sm: '25px', md: '0px' }}>
			<Text color="red.500">No se encontró el usuario.</Text>
		</Flex>
		);
    }
	return (
		<Flex direction='column' mt={{ sm: '25px', md: '0px' }}>
			<Box
				mb={{ sm: '24px', md: '50px', xl: '20px' }}
				borderRadius='15px'
				px='0px'
				display='flex'
				flexDirection='column'
				justifyContent='center'
				align='center'>
				{/* Header */}
				<Card
					direction={{ sm: 'column', md: 'row' }}
					mx='auto'
					maxH='330px'
					w={{ sm: '90%', xl: '100%' }}
					justifyContent={{ sm: 'center', md: 'space-between' }}
					align='center'
					p='24px'
					borderRadius='20px'
					mt='100px'>
					<Flex align='center' direction={{ sm: 'column', md: 'row' }}>
						<Flex
							align='center'
							mb={{ sm: '10px', md: '0px' }}
							direction={{ sm: 'column', md: 'row' }}
							w={{ sm: '100%' }}
							textAlign={{ sm: 'center', md: 'start' }}>
							<Avatar me={{ md: '22px' }} src={avatar11} w='80px' h='80px' borderRadius='15px'>
								{/* <AvatarBadge
									cursor='pointer'
									borderRadius='8px'
									border='transparent'
									bg='linear-gradient(138.78deg, rgba(6, 11, 40, 0.94) 17.44%, rgba(10, 14, 35, 0.49) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)'
									boxSize='26px'
									backdropFilter='blur(120px)'> 
									<Icon h='12px' w='12px' color='#fff' as={FaPencilAlt} />
								</AvatarBadge> HABILIDAR PARA EDITAR FOTO*/}
							</Avatar>
							<Flex direction='column' maxWidth='100%' my={{ sm: '14px' }}>
								<Text
									fontSize={{ sm: 'lg', lg: 'xl' }}
									color='#fff'
									fontWeight='bold'
									ms={{ sm: '8px', md: '0px' }}>
									{dataUser ? `${dataUser?.name || ''} ${dataUser.last_name || ''}` : "Usuario"}
								</Text>
								<Text fontSize={{ sm: 'sm', md: 'md' }} color='gray.400'>
									{dataUser ? dataUser?.email : 'No registrado'}
								</Text>
							</Flex>
						</Flex>
						<Flex direction={{ sm: 'column', lg: 'row' }} w={{ sm: '100%', md: '50%', lg: 'auto' }}>
							<Button
								onClick={onOpenEdit}
								borderRadius='12px'
								bg='brand.200'
								_hover={{ opacity: '0.8' }}
								_active={{ opacity: '0.9' }}
								me={{ base: 'none', lg: '20px' }}
								leftIcon={<Icon color='white' as={FaPencilAlt} me='6px' />}>
								<Text fontSize='xs' color='#fff' fontWeight='bold'>
									EDITAR
								</Text>
							</Button>
							 <Button
							 	onClick={onOpenChangePassword}
								borderRadius='12px'
								top={{ sm: '10px', md: '0px' }}
								//bg='transparent'
								bg='brand.200'
								/* _hover={{
									bg: 'brand.200'
								}}
								_active={{
									bg: 'brand.200'
								}} */
								_hover={{ opacity: '0.8' }}
								_active={{ opacity: '0.9' }}
								me={{ base: 'none', lg: '20px' }}
								leftIcon={<Icon color='white' as={IoKey} me='6px' />}>
								<Text fontSize='xs' color='#fff' fontWeight='bold'>
									CAMBIAR CONTRASEÑA
								</Text>
							</Button>
						</Flex>
					</Flex>
				</Card>
				{/* Botones de Editar y Cambiar Contraseña */}
                <Flex mt="4">
					<EditProfileButton isOpen={isOpenEdit} onClose={onCloseEdit} userData={userDataEdit} handleDataUser={handleDataUser} />
                    <ChangePasswordButtom isOpen={isOpenChangePassword} onClose={onCloseChangePassword} />
                </Flex>
			</Box>
			<Flex
				align={{ sm: 'center', md: 'flex-start' }}
				direction={{ base: 'column', lg: 'row' }} // Column in smaller screens, row in larger screens
				//justify="space-between" // Space between the cards
				justifyContent={{ sm: 'center', md: 'space-between' }}
				wrap="wrap"
				w="100%"
				gap="24px"
				>
				{/* Información Card */}
				<Card
					p="16px"
					maxH={{ md: '410px' }}
					maxW={{ sm: '325px', md: '725px', lg: '770px' }}
					gridArea={{ xl: '1 / 2 / 2 / 3', '2xl': 'auto' }}
					flex="1"
				>
					<CardHeader p="12px 5px" mb="12px">
					<Flex direction="column">
						<Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
						INFORMACIÓN
						</Text>
						<Text fontSize="sm" color="gray.400">
						Hola, {dataUser?.name || 'User'}. Observa tu información actualizada.
						</Text>
					</Flex>
					</CardHeader>
					<CardBody w="100%">
					<Flex w="100%" direction={{ sm: 'column', md: 'row' }}>
						<Flex
						direction="column"
						align="center"
						me={{ md: '16px', lg: '50px' }}
						mb={{ sm: '12px', md: '0px' }}
						>
						<CircularProgress
							size={200}
							value={68}
							thickness={6}
							color="green.400"
							variant="vision"
						>
							<CircularProgressLabel>
							<Flex direction="column" justify="center" align="center">
								<Text color="#fff" fontSize="36px" fontWeight="bold" mb="6px">
								68%
								</Text>
								<Text color="gray.400" fontSize="sm">
								Current load
								</Text>
							</Flex>
							</CircularProgressLabel>
						</CircularProgress>
						<Flex direction="column" mt="18px" align="center">
							<Text color="#fff" fontSize="lg" fontWeight="bold" mb="2px">
							0h 58 min
							</Text>
							<Text color="gray.500" fontSize="sm">
							Time to full charge
							</Text>
						</Flex>
						</Flex>
						<Grid
						templateColumns={{ sm: '1fr', md: 'repeat(2, 1fr)' }}
						gap="24px"
						w="100%"
						alignSelf="flex-start"
						>
						{/* Cards inside the information card */}
						<Flex
							align="center"
							p="18px"
							justify="space-between"
							bg="linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)"
							borderRadius="20px"
						>
							<Flex direction="column" me="auto">
							<Text fontSize="xs" color="gray.400" mb="3px">
								Battery Health
							</Text>
							<Text color="#fff" fontSize="20px" fontWeight="bold">
								76%
							</Text>
							</Flex>
							<IconBox bg="brand.200" w="40px" h="40px" direction="column">
							<CarIcon w="28px" h="28px" />
							<FulgerWhiteIcon w="8px" h="11px" transform="rotate(90deg)" />
							</IconBox>
						</Flex>
						{/* Add other inner cards here */}
						<Flex
							align="center"
							p="18px"
							justify="space-between"
							bg="linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)"
							borderRadius="20px"
						>
						<Flex direction='column' me='auto'>
									<Text fontSize='xs' color='gray.400' mb='3px'>
										Efficiency
									</Text>
									<Text color='#fff' fontSize='20px' fontWeight='bold'>
										+20%
									</Text>
								</Flex>
								<Box maxH='75px'>
									<LineChart
										lineChartData={lineChartDataProfile1}
										lineChartOptions={lineChartOptionsProfile1}
									/>
								</Box>
						</Flex>
						<Flex
							align="center"
							p="18px"
							justify="space-between"
							bg="linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)"
							borderRadius="20px"
						>
							<Flex direction='column' me='auto'>
								<Text fontSize='xs' color='gray.400' mb='3px'>
									Consumption
								</Text>
								<Text color='#fff' fontSize='20px' fontWeight='bold'>
									163W/km
								</Text>
							</Flex>
							<IconBox bg='brand.200' w="40px" h="40px" >
								<FulgerWhiteIcon w='24px' h='24px' color='#fff' />
							</IconBox>
						</Flex>
						<Flex
							align="center"
							p="18px"
							justify="space-between"
							bg="linear-gradient(126.97deg, rgba(6, 11, 38, 0.74) 28.26%, rgba(26, 31, 55, 0.5) 91.2%)"
							borderRadius="20px"
						>
							<Flex direction='column' me='auto'>
								<Text fontSize='xs' color='gray.400' mb='3px'>
									This Week
								</Text>
								<Text color='#fff' fontSize='20px' fontWeight='bold'>
									1.342km
								</Text>
							</Flex>
							<Box maxH='75px'>
								<LineChart
									lineChartData={lineChartDataProfile2}
									lineChartOptions={lineChartOptionsProfile2}
								/>
							</Box>
						</Flex>
						</Grid>
					</Flex>
					</CardBody>
				</Card>
				{/* Datos Personales Card */}
				<Card
					p="16px"
					bgSize="cover"
					maxW={{ sm: '325px', md: '725px', lg: '380px' }}
					h={{ sm: '270px', lg: '350px', xl: '310px' }}
					flexBasis="380px"
				>
					<CardHeader p="12px 5px" mb="12px">
					<Text fontSize="lg" color="#fff" fontWeight="bold">
						DATOS PERSONALES
					</Text>
					</CardHeader>
					<CardBody px="5px">
					<Flex direction="column">
						<Separator mb="30px" />
						<Flex align="center" mb="18px">
						<Text fontSize="sm" color={'gray.400'} me="10px">
							Nombre(s):{' '}
						</Text>
						<Text fontSize="sm" color="#fff" fontWeight="400">
							{dataUser ? dataUser?.name : 'User'}
						</Text>
						</Flex>
						<Flex align="center" mb="18px">
						<Text fontSize="sm" color={'gray.400'} me="10px">
							Apellido(s):{' '}
						</Text>
						<Text fontSize="sm" color="#fff" fontWeight="400">
							{dataUser ? dataUser?.last_name : ''}
						</Text>
						</Flex>
						<Flex align="center" mb="18px">
						<Text fontSize="sm" color={'gray.400'} me="10px">
							DNI:{' '}
						</Text>
						<Text fontSize="sm" color="#fff" fontWeight="400">
							{dataUser ? dataUser?.dni : '-'}
						</Text>
						</Flex>
						<Flex align="center" mb="18px">
						<Text fontSize="sm" color={'gray.400'} me="10px">
							Correo:{' '}
						</Text>
						<Text fontSize="sm" color="#fff" fontWeight="400">
							{dataUser ? dataUser?.email : 'No registrado'}
						</Text>
						</Flex>
						<Flex align="center" mb="18px">
						<Text fontSize="sm" color={'gray.400'} me="10px">
							Celular:{' '}
						</Text>
						<Text fontSize="sm" color="#fff" fontWeight="400">
							{dataUser ? dataUser?.phone : 'No registrado'}
						</Text>
						</Flex>
					</Flex>
					</CardBody>
				</Card>
			</Flex>
			<CustomModal
				header="Upss!"
				message={err || "Ocurrió un error al obtener los datos del usuario"}
				isOpen={isOpenErr}
				onClose={onCloseErr}
			/>
			{loading && <DotSpin message="Cargando Perfil..." />}
		</Flex>
	);
};