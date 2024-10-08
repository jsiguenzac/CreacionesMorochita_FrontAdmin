import {React, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {getToken} from "../../services/Auth/tokenService";
import Loading from "../../components/utils/Loading";
//import BouncingLoader from "../../components/utils/BounciLoader";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  DarkMode,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Icon
} from "@chakra-ui/react";

// Assets
import signinImage from "assets/img/fondoHome.png";
import { LoginService } from "../../services/Auth/tokenService";
// Custom Components
import AuthFooter from "components/Footer/AuthFooter";
import GradientBorder from "components/GradientBorder/GradientBorder";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function signin() {
  const navigate = useHistory().push;
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    remind: false
  });

  const changeForm = (field, value) => {
    setForm(prev => ({
        ...prev, 
        [field]: value
    }));
  }
  const homePage = "/admin/dashboard";
  const titleColor = "white";
  const textColor = "gray.400";

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setErr("");
      const {logged, msg} = await LoginService(form);
      console.log("auth/signin Successful:", logged);
      if (logged)
        navigate(homePage);
      else if (msg === "USUARIO_NO_ENCONTRADO")
        setErr("El DNI o Correo Electrónico no está registrado");
      else if (msg === "CLAVE_INCORRECTA")
        setErr("La contraseña es incorrecta");
      handleShowModal();
    } catch (error) {
      console.error("Error during auth/signin:", error);
      return;
    } finally {
      setLoading(false);
      //navigate(homePage);
    }
  };  
  const { email, password, remind } = form;

  useEffect(() => {
    document.title = "Morochita | Login";
    if (getToken()) {
        navigate(homePage);
        return;
    }
    //setReadyView(true);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShowModal = () => {
      onOpen();
  };

  const [showPassword, setShowPassword] = useState(false); // Estado para controlar visibilidad

  const toggleShowPassword = () => {
      setShowPassword(!showPassword); // Alternar entre mostrar y ocultar contraseña
  };


  return (
    <Flex position='relative'>
      <Flex
        minH='100vh'
        h={{ base: "100vh", lg: "fit-content" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        pt={{ sm: "60px", md: "0px" }}
        flexDirection='column'
        me={{ base: "auto", lg: "50px", xl: "180px" }}> {/* margen derecho form */}
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px='50px'>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            mt={{ base: "20px", md: "100px", lg: "120px", xl: "100px" }} // altura del formulario
            mb={{ base: "60px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              Bienvenid@!
            </Heading>
            <Text
              mb='36px'
              ms='4px'
              color={textColor}
              fontWeight='bold'
              fontSize='14px'>
              Para ingresar, por favor inicia sesión
            </Text>
            <FormControl autoComplete="off">
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='normal'
                color='white'>
                DNI o Correo electrónico
              </FormLabel>
              <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  h='46px'
                  placeholder='Ingresa tu DNI o correo electrónico'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => changeForm("email", e.target.value)}
                />
              </GradientBorder>
            </FormControl>
            <FormControl autoComplete='off'>
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='normal'
                color='white'>
                Contraseña
              </FormLabel>
              {/* <GradientBorder
                mb='24px'
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius='20px'>
                <Input
                  color='white'
                  bg='rgb(19,21,54)'
                  border='transparent'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "346px" }}
                  maxW='100%'
                  type='password'
                  placeholder='Ingresa tu contraseña'
                  autoComplete='off'
                  value={password}
                  onChange={(e) => changeForm("password", e.target.value)}
                />
              </GradientBorder> */}
              <GradientBorder
                  mb='24px'
                  w={{ base: "100%", lg: "fit-content" }}
                  borderRadius='20px'
              >
                  <InputGroup size="lg">
                      <Input
                          color='white'
                          bg='rgb(19,21,54)'
                          border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: "100%", md: "346px" }}
                          maxW='100%'
                          type={showPassword ? 'text' : 'password'} // Condicional para cambiar el tipo de input
                          placeholder='Ingresa tu contraseña'
                          autoComplete='off'
                          value={password}
                          onChange={(e) => changeForm("password", e.target.value)}
                      />
                      <InputRightElement width="3rem">
                          <Icon
                              as={showPassword ? FaEyeSlash : FaEye} // Ícono depende del estado
                              color="gray.500"
                              cursor="pointer"
                              onClick={toggleShowPassword} // Alterna la visibilidad
                          />
                      </InputRightElement>
                  </InputGroup>
              </GradientBorder>
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <DarkMode>
                <Switch 
                id='remember-auth/signin' 
                colorScheme='brand'
                me='10px'
                isChecked={form.remind}
                onChange={(e) => changeForm("remind", e.target.checked)} 
                />
              </DarkMode>
              <FormLabel
                htmlFor='remember-auth/signin'
                mb='0'
                ms='1'
                fontWeight='normal'
                color='white'>
                Recuérdame
              </FormLabel>
            </FormControl>
            <Button
              variant='brand'
              fontSize='10px'
              type='submit'
              w='100%'
              maxW='350px'
              h='45'
              mb='20px'
              mt='20px'
              onClick={handleSubmit}>
              INICIAR SESIÓN
            </Button>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                ¿No puedes ingresar?
                <Link color={titleColor} as='span' ms='5px' fontWeight='bold'>
                  Haz clic aquí
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          w={{ base: "335px", md: "450px" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          mb='auto'> {/* altura de la pagina */}
          <AuthFooter />
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX='hidden'
          h='100%'
          maxW={{ md: "50vw", lg: "50vw" }} /* ancho de la imagen */
          minH='100vh'
          w='960px'
          position='absolute'
          left='0px'>
          <Box
            bgImage={signinImage}
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <Text
              textAlign='center'
              color='white'
              letterSpacing='8px'
              fontSize='20px'
              fontWeight='500'>
              TIENDA DE ROPA:
            </Text>
            <Text
              textAlign='center'
              color='transparent'
              letterSpacing='8px'
              fontSize='36px'
              fontWeight='bold'
              bgClip='text !important'
              bg='linear-gradient(94.56deg, #FFFFFF 90.99%, #21242F 102.65%)'>
              CREACIONES MOROCHITA
            </Text>
          </Box>
        </Box>
      </Flex>
      <CustomModal
          header="Upss!"
          message={err || "Credenciales Incorrectas"}
          isOpen={isOpen}
          onClose={onClose}
      />
      {loading && <DotSpin message="Iniciando Sesión..." />}
    </Flex>
  );
}

export default signin;