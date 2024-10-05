import React from 'react';
import {
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure
} from '@chakra-ui/react';

export const CustomModal = ({ header, message, isOpen, onClose }) => {
    let aling = "center";
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent 
                backgroundColor="rgba(25, 25, 25, 0.90)" // Fondo oscuro semi-transparente
                color="white"
                display="flex" 
                flexDirection="column" 
                justifyContent={aling} 
                alignItems={aling}>
                <ModalHeader textAlign={aling}>{header}</ModalHeader>
                <ModalBody textAlign={aling}>
                    {message}
                </ModalBody>
                <ModalFooter display="flex" justifyContent="center">
                    <Button variant='brand' bgColor='#582cff' onClick={onClose}>
                        <Text color='white'>Aceptar</Text>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};