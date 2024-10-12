import React from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPencilAlt, FaWhatsapp, FaUserCircle, FaRegFileExcel } from 'react-icons/fa';

function DashboardTableRow(props) {
  const { logo, name, status, budget, dni, email, phone, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          {/* <Icon as={logo} h={"20px"} w={"20px"} me='18px' /> */}
          <Text fontSize='sm' color='#fff' minWidth='100%'>
            {name}
          </Text>
        </Flex>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Flex alignItems='center' textAlign={"center"} py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Text fontSize='sm' textAlign={"center"} color='#fff' pb='.5rem'  >
            {dni}
          </Text>
        </Flex>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' textAlign={"center"} color='#fff' pb='.5rem'>
          {phone}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' pb='.5rem'>
          {email}
        </Text>
      </Td>
      {/* <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {budget}
        </Text>
      </Td> */}
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        borderBottomColor='#56577A'
        border={lastItem ? "none" : null}>
        <Flex alignItems='center' textAlign={"center"} py='.8rem' minWidth='100%' >
          <Text fontSize='sm' color='#fff' fontWeight='bold' minWidth='100%'>
          {budget}
          </Text>
        </Flex>
      </Td>
      {/* <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' pb='.5rem'>
          {status ? 'Activo' : 'Inactivo'}
        </Text>
      </Td> */}
     {/* <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Flex direction='column'>
          <Text
            fontSize='sm'
            color='#fff'
            fontWeight='bold'
            pb='.2rem'>{`${progression}%`}</Text>
          <Progress
            colorScheme='brand'
            maxW='125px'
            h='3px'
            bg='#2D2E5F'
            value={progression}
            borderRadius='15px'
          />
        </Flex>
      </Td> */}
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
      <Flex direction={{ base: "column", md: "row" }} gap="20px">
        <Button
          /* onClick={onOpenEdit} */
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
          /* onClick={onOpenEdit} */
          borderRadius='12px'
          bg='blue.500'
          _hover={{ opacity: '0.8' }}
          _active={{ opacity: '0.9' }}
          me={{ base: 'none', lg: 'auto' }}
          width={{ base: '100px', md: 'auto' }}
          leftIcon={<Icon color='white' as={FaRegFileExcel} />}>
          {/* <Text fontSize='xs' color='#fff' fontWeight='bold'>
            {''}
          </Text> */}
        </Button>
      </Flex>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
