import React from "react";
import {
  Tr,
  Td,
  Text,
  Flex,
  Badge,
  Button,
  Icon
} from "@chakra-ui/react";
import { FaInfoCircle, FaRegFilePdf } from "react-icons/fa";

function TableRowSales({ customerName, payment, saleDate, totalSale, status, onViewDetails, generatePDF }) {
    const statusColorsMap = {
        Completa: "green",
        Pendiente: "red",
        default: "gray"
      };
      
    const statusColor = statusColorsMap[status] || statusColorsMap.default;

  return (
    <Tr>
      <Td>
        <Flex align="center">
          <Text fontSize="sm" color="#fff" fontWeight="bold">
            {customerName}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="sm" color="#fff" fontWeight="bold">
          {payment}
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" color="#fff" fontWeight="bold">
          {saleDate}
        </Text>
      </Td>
      <Td>
        <Text fontSize="sm" color="#fff" fontWeight="bold">
          S/.{totalSale}
        </Text>
      </Td>
      <Td>
        <Badge
          colorScheme={statusColor}
          py="4px"
          px="10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      <Td>
        <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <Button
            onClick={onViewDetails}
            borderRadius="12px"
            bg="blue.500"
            color="white"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            leftIcon={<Icon as={FaInfoCircle} />}
          >
            Ver Detalles
          </Button>
          <Button
            onClick={generatePDF}
            display={status === "Completa" ? "block" : "none"}
            borderRadius="12px"
            bg="red.400"
            color="white"
            _hover={{ bg: "red.600" }}
            _active={{ bg: "red.700" }}
            leftIcon={<Icon as={FaRegFilePdf} />}
          >
            Boleta
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TableRowSales;