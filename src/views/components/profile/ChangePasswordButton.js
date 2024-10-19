import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Button,
    Text,
    useToast,
    InputGroup,
    InputRightElement,
    Icon
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DotSpin from 'components/utils/BounciLoader';
import { UpdatePass } from '../../../services/Profile/UpdatePass';

export const ChangePasswordButtom = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState(false);
    const toast = useToast();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast({
                title: "Error",
                description: "Todos los campos son obligatorios",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        else if (newPassword !== confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try{
            setLoading(true);
            const { exito, msg } = await UpdatePass(currentPassword, newPassword);
            if (exito) {
                toast({
                    title: "Éxito",
                    description: "Contraseña cambiada exitosamente",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            }
            else if (msg === "USUARIO_NO_ENCONTRADO") {
                toast({
                    title: "Error",
                    description: "Usuario no encontrado",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                window.location.reload();
            }
            else if (msg === "CLAVE_ACTUAL_INCORRECTA") {
                setCurrentPasswordError(true);
                toast({
                    title: "Error",
                    description: "La contraseña actual es incorrecta",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            else {
                toast({
                    title: "Error",
                    description: "Ocurrió un error inesperado",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            }
        }catch(error){
            toast({
                title: "Error",
                description: error || "Ocurrió un error inesperado",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        finally{
            setLoading(false);
        }
        // Limpia los campos después de cambiar la contraseña
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
    };

    const handleChange = (e) => {
        setCurrentPasswordError(false);
        setCurrentPassword(e.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirNewPassword, setShowConfirNewPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const toggleShowConfirNewPassword = () => {
        setShowConfirNewPassword(!showConfirNewPassword);
    };

    const handleCloseAndClearFields = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setCurrentPasswordError(false);
        onClose();
    }
    
    return (
        <Modal isOpen={isOpen} onClose={handleCloseAndClearFields}>
            <ModalOverlay />
            <ModalContent maxW="400px" bgGradient="linear(to-br, brand.600, brand.800)">
                <ModalHeader color="white">Cambiar Contraseña</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <Text color='#fff' fontWeight='bold'>
                        Contraseña actual
                    </Text>
                    <InputGroup size="lg">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Ingresa tu contraseña actual"
                            value={currentPassword}
                            onChange={handleChange}
                            bg="white"
                            border="3px solid"
                            borderColor={currentPasswordError ? 'red.500' : ''}
                            color="black"
                            borderRadius="8px"
                            _placeholder={{ color: 'gray.500' }}
                        />
                        <InputRightElement width="3rem">
                            <Icon
                                as={showPassword ? FaEyeSlash : FaEye}
                                color="gray.500"
                                cursor="pointer"
                                onClick={toggleShowPassword}
                            />
                        </InputRightElement>
                    </InputGroup>

                    <Text color='#fff' fontWeight='bold'>
                        Contraseña nueva
                    </Text>
                    <InputGroup size="lg">
                        <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Ingresa la nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            mb={4}
                            bg="white"
                            border="3px solid"
                            borderColor={
                                (newPassword.length > 0 && confirmPassword.length > 0) ?
                                (newPassword === confirmPassword) ? 'green.500' : 'red.500' : ''}
                            color="black"
                            borderRadius="8px"
                            _placeholder={{ color: 'gray.500' }}
                        />
                        <InputRightElement width="3rem">
                            <Icon
                                as={showNewPassword ? FaEyeSlash : FaEye}
                                color="gray.500"
                                cursor="pointer"
                                onClick={toggleShowNewPassword}
                            />
                        </InputRightElement>
                    </InputGroup>
                    
                    <Text color='#fff' fontWeight='bold'>
                        Confirmar contraseña
                    </Text>
                    <InputGroup size="lg">
                        <Input
                            type={showConfirNewPassword ? 'text' : 'password'}
                            placeholder="Confirmar la nueva contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            bg="white"
                            border="3px solid"
                            borderColor={
                                (newPassword.length > 0 && confirmPassword.length > 0) ?
                                (newPassword === confirmPassword && newPassword && confirmPassword) ? 'green.500' : 'red.500' : ''}
                            color="black"
                            borderRadius="8px"
                            _placeholder={{ color: 'gray.500' }}
                        />
                        <InputRightElement width="3rem">
                            <Icon
                                as={showConfirNewPassword ? FaEyeSlash : FaEye}
                                color="gray.500"
                                cursor="pointer"
                                onClick={toggleShowConfirNewPassword}
                            />
                        </InputRightElement>
                    </InputGroup>
                </ModalBody>

                <ModalFooter>
                    <Button data-testid="btn-change-pass"
                        _hover={{ opacity: '0.8' }}
                        _active={{ opacity: '0.9' }} 
                        bg='brand.200'
                        mr={3}
                        onClick={handleChangePassword}
                    >
                        <Text color='#fff' fontWeight='bold'>
                            Cambiar
                        </Text>
                    </Button>
                    <Button /* variant="ghost"  */colorScheme="blue" onClick={handleCloseAndClearFields}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
			{loading && <DotSpin message="Cambiando contraseña..." />}
        </Modal>
    );
};