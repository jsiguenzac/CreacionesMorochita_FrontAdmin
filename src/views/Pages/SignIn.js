import {React, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {getToken} from "../../services/Auth/tokenService";
import Loading from "../../components/utils/Loading";

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
  Icon,
  useToast
} from "@chakra-ui/react";

// Assets
import signinImage from "assets/img/fondoHome.png";
import imgHome from 'assets/img/fondoHome3.jpg';
import { LoginService, RecoverAccessService, savePermissions, clearAllStorage } from "../../services/Auth/tokenService";
import { PermissionsListService } from "../../services/Auth/PermissionsService";
import imgNotConected from "../../assets/img/not_conected.png";

// Custom Components
import AuthFooter from "components/Footer/AuthFooter";
import GradientBorder from "components/GradientBorder/GradientBorder";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ModalRecoverAccess from "../components/login/ModalRecoverAccess";

function signin() {
  const toast = useToast();
  const navigate = useHistory().push;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    setMessage("Iniciando Sesión...");
    try {
      setErr("");
      const {logged, msg} = await LoginService(form);
      console.log("auth/signin Successful:", logged);
      if (logged){
        const { permssions, msg } = await PermissionsListService();
        console.log("auth/permissions Successful:", permssions);
        if (!permssions){
          clearAllStorage();
          setErr(`Contacta al administrador del sistema para que te asigne permisos`);
          handleShowModal();
          return;
        }
        savePermissions(permssions);        
        navigate(homePage);
      }
      else if (msg === "USUARIO_NO_ENCONTRADO")
        setErr("El DNI o Correo Electrónico no está registrado");
      else if (msg === "CLAVE_INCORRECTA")
        setErr("La contraseña es incorrecta");
      handleShowModal();
    } catch (error) {
      console.error("Error auth/signin:", error);
      clearAllStorage();
      setErr("Ocurrió un error inesperado al intentar iniciar sesión. Vuelve a intentarlo más tarde");
    } finally {
      setLoading(false);
      setMessage("");
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
  const { isOpen: isOpenRecover, onOpen: onOpenRecover, onClose: onCloseRecover } = useDisclosure();

  const handleShowModal = () => {
      onOpen();
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
      setShowPassword(!showPassword); // Alternar entre mostrar y ocultar contraseña
  };

  const handleRecoverPass = async (email) => {
    setLoading(true);
    setMessage("Enviando Correo...");
    try {
      const { exito, msg } = await RecoverAccessService(email);
      console.log("auth/recover Successful:", exito, msg);
      if (exito) {
        toast({
          title: "Correo enviado",
          description: "Se ha enviado un correo con las instrucciones para recuperar tu contraseña",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onCloseRecover();
      }
      else if (msg === "CORREO_INVALIDO") {
        toast({
          title: "Ups!",
          description: "El correo ingresado no es válido",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      else if (msg === "USUARIO_NO_ENCONTRADO") {
        toast({
          title: "Usuario no encontrado",
          description: "El correo ingresado no está registrado en el sistema o fue inactivado.\nContacta al administrador del sistema",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    } catch (error) {
      console.error("Error auth/recover:", error);
      setErr("Ocurrió un error inesperado al intentar recuperar tu contraseña. Vuelve a intentarlo más tarde");
    }
    finally {
      setLoading(false);
      setMessage("");
    }
  };
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Guardar imagen sin conexión
  const saveImageToLocalStorage = () => {
    fetch(imgNotConected)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // la imagen almacenada como un Data URL en LocalStorage
          localStorage.setItem('offline-image', reader.result);
        };
        reader.readAsDataURL(blob);
      });
  };

  useEffect(() => {
    saveImageToLocalStorage();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        
        {/* <Logo Mobile /> */}
        {isMobile && (
          <Flex 
            position='absolute'
            top='40px'
            w='100%'
            justifyContent='center'
            alignItems='center'
          >
            <img
              src={imgHome}
              alt="logo"
              style={{
                width: "200px",
                height: "130px",
                borderRadius: "50px"
              }}
            />
          </Flex>
        )}
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px='50px'
        >
          <Flex
            direction='column'
            w={{ base: "100%", lg: "fit-content" }}
            background='transparent'
            mt={{ base: "50%", md: "100px", lg: "120px", xl: "100px" }} // altura del formulario
            mb={{ base: "60px", lg: "80px" }}
          >
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
                  //border='transparent'
                  borderRadius='20px'
                  fontSize='sm'
                  size='lg'
                  w={{ base: "100%", md: "100%", lg: "346px" }}
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
                          //border='transparent'
                          borderRadius='20px'
                          fontSize='sm'
                          size='lg'
                          w={{ base: "100%", md: "100%", lg: "346px" }}
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
            <Button data-testid="btn-signin"
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
                <Link
                  color={titleColor}
                  as='span' ms='5px'
                  fontWeight='bold'
                  onClick={onOpenRecover}
                >
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
            {/* <Text
              textAlign='center'
              color='white'
              letterSpacing='8px'
              fontSize='20px'
              fontWeight='500'>
              TIENDA DE ROPA:
            </Text> */}
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
      <ModalRecoverAccess
        isOpen={isOpenRecover}
        onClose={onCloseRecover}
        onSubmit={(email) => {handleRecoverPass(email)}}
      />
      <CustomModal
          header="Upss!"
          message={err || "Credenciales Incorrectas"}
          isOpen={isOpen}
          onClose={onClose}
      />
      {loading && <DotSpin message={message} />}
    </Flex>
  );
}

export default signin;