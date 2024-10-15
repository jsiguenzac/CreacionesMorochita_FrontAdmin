import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Icon,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt, FaTrash, FaBan, FaUserMinus, FaUserClock } from 'react-icons/fa';

function TablesTableRow(props) {
  const {
    logo,
    name,
    email,
    dni,
    subdomain,
    domain,
    status,
    date,
    lastItem,
    onEdit,
  } = props;
  // const textColor = useColorModeValue("gray.700", "white");
  // const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.600");

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps='0px'
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'>
        <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          {/* <Avatar
            src={logo}
            w='50px'
            borderRadius='12px'
            me='18px'
            border='none'
          /> */}
          <Flex direction='column'>
            <Text
              fontSize='sm'
              color='#fff'
              fontWeight='normal'
              minWidth='100%'>
              {name}
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='normal'>
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'
        minW='150px'>
        <Flex direction='column'>
        <Text fontSize='sm' color='#fff' fontWeight='normal'>
            {dni}
          </Text>
          {/*<Text fontSize='sm' color='#fff' fontWeight='normal'>
            {domain}
          </Text>
          <Text fontSize='sm' color='gray.400' fontWeight='normal'>
            {subdomain}
          </Text> */}
        </Flex>
      </Td>
      <Td
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'
        minW='150px'>
        <Flex direction='column'>
          <Text fontSize='sm' color='#fff' fontWeight='normal'>
            {domain}
          </Text>
        </Flex>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Badge
          bg={status ? "green.400" : "gray.600"}
          color={status ? "white" : colorStatus}
          fontSize='sm'
          p='3px 10px'
          borderRadius='8px'
          border="none" /* {!status ? "none" : "1px solid #fff"} */
          fontWeight='normal'>
          {status ? "Activo" : "Inactivo"}
        </Badge>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Text fontSize='sm' color='#fff' fontWeight='normal'>
          {date}
        </Text>
      </Td>
      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        {/* <Button p='0px' bg='transparent' variant='no-hover'>
          <Text
            fontSize='sm'
            color='gray.400'
            fontWeight='bold'
            border='1px solid #fff'
            cursor='pointer'>
            Editar
          </Text>
        </Button> */}
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
          <Button
            /* onClick={onOpenEdit} */
            borderRadius='12px'
            bg={status ? 'red.500' : 'green.500'}
            _hover={{ opacity: '0.8' }}
            _active={{ opacity: '0.9' }}
            me={{ base: 'none', lg: '20px' }}
            leftIcon={<Icon color='white' as={status ? FaUserMinus : FaUserClock } me='6px' />}>
            <Text fontSize='xs' color='#fff' fontWeight='bold'>
              {status ? 'INACTIVAR' : 'ACTIVAR'}
            </Text>
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
