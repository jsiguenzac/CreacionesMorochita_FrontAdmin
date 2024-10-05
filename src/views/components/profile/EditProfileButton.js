import { Button, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { UpdateUser } from '../../../services/Profile/UpdateUser';
import DotSpin from 'components/utils/BounciLoader';

export function EditProfileButton({ isOpen, onClose, userData, handleDataUser }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        id_user: '',
        name: '',
        last_name: '',
        dni: '',
        email: '',
        phone: ''
    });

    const toast = useToast();
    
    // Efecto para cargar los datos del usuario cuando el modal se abre
    useEffect(() => {
        if (isOpen) {
            setFormData({
                id_user: userData.id_user,
                name: userData.name,
                last_name: userData.last_name,
                dni: userData.dni,
                email: userData.email,
                phone: userData.phone
            });
        }
    }, [isOpen, userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        if (!formData.name || !formData.last_name ||
            !formData.dni || !formData.email) {
            toast({
                title: "Error",
                description: "Rellene los campos por favor. Solo el celular es opcional.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setLoading(true);
        try {
            const { exito, msg} = await UpdateUser(formData);
            if (exito) {
                handleDataUser();
                toast({
                    title: "Perfil actualizado.",
                    description: "Tu perfil ha sido actualizado exitosamente.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
            }
            else {
                toast({
                    title: "Error al actualizar el perfil.",
                    description: msg || "Ocurrió un error inesperado.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Error al actualizar el perfil.",
                description: error || "Ocurrió un error inesperado.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                maxW={['90%', '500px']}
                maxH={['90vh']}
                overflowY="auto"
                mx="auto"
                p={4}
                bg="rgba(25, 25, 25, 0.9)" // Fondo oscuro y transparente
            >
                <ModalHeader color="white">Editar Perfil</ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <Text fontSize='xm' color='#fff' fontWeight='bold'>
                        Nombre(s):
                    </Text>
                    <Input
                        type='text'
                        name="name"
                        placeholder="Nombre(s)"
                        value={formData.name}
                        onChange={handleChange}
                        mb={4}
                        bg="white"
                        border="3px solid"
                        color="black"
                        borderRadius="8px"
                        _placeholder={{ color: 'gray.500' }}
                    />
                    <Text fontSize='xm' color='#fff' fontWeight='bold'>
                        Apellido(s):
                    </Text>
                    <Input
                        type='text'
                        name="last_name"
                        placeholder="Apellido(s)"
                        value={formData.last_name}
                        onChange={handleChange}
                        mb={4}
                        bg="white"
                        border="3px solid"
                        color="black"
                        borderRadius="8px"
                        _placeholder={{ color: 'gray.500' }}
                    />
                    <Text fontSize='xm' color='#fff' fontWeight='bold'>
                        DNI:
                    </Text>
                    <Input
                        max={8}
                        min={8}
                        type='number'
                        name="dni"
                        placeholder="Ingrese su DNI"
                        value={formData.dni}
                        onChange={handleChange}
                        mb={4}
                        bg="white"
                        border="3px solid"
                        color="black"
                        borderRadius="8px"
                        _placeholder={{ color: 'gray.500' }}
                    />
                    <Text fontSize='xm' color='#fff' fontWeight='bold'>
                        Celular:
                    </Text>
                    <Input
                        max={9}
                        min={9}
                        type='number'
                        name="phone"
                        placeholder="Ingrese su Celular"
                        value={formData.phone}
                        onChange={handleChange}
                        mb={4}
                        bg="white"
                        border="3px solid"
                        color="black"
                        borderRadius="8px"
                        _placeholder={{ color: 'gray.500' }}
                    />
                    <Text fontSize='xm' color='#fff' fontWeight='bold'>
                        Correo electrónico:
                    </Text>
                    <Input
                        disabled='disabled'
                        type='email'
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        bg="white"
                        border="3px solid"
                        color="black"
                        borderRadius="8px"
                        _placeholder={{ color: 'gray.500' }}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        _hover={{ opacity: '0.8' }}
                        _active={{ opacity: '0.9' }} 
                        bg='brand.200' mr={3} 
                        onClick={handleSave}
                    >
                        <Text color='#fff' fontWeight='bold'>
                            Guardar
                        </Text>                        
                    </Button>
                    <Button /* variant="ghost"  */colorScheme="blue" onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
            {loading && <DotSpin message="Actualizando..." />}
        </Modal>
    );
}