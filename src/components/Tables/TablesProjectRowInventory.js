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

function TableRowInventory(props) {
  const { name, stock, price, category, progression, lastItem, onEdit } = props;
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
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          S/.{price}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {stock}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {category}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
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
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
      <Flex direction={{ base: "column", md: "row" }} gap="20px">
        <Button
          onClick={onEdit}
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
      </Flex>
      </Td>
    </Tr>
  );
}

export default TableRowInventory;
