import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Icon,
  Text,
  Th,
  Thead,
  Button,
  FormControl,
  Input,
  FormLabel,
  Select,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DotSpin from "components/utils/BounciLoader";
import { CustomModal } from "components/Modal/ModalMessage";
import ModalInventoryForm from "../components/inventory/ModalInventoryForm";

// Table Components
import TableRowInventory from "components/Tables/TablesProjectRowInventory";
import TablesTableRow from "components/Tables/TablesTableRow";

// Data
import { tablesProjectDataInventory, tablesTableData } from "variables/general";
import { CategoryListService } from "services/Inventory/CategoryService";
import { ProductsListService, ProductCreateService, ProductUpdateService } from "services/Inventory/ProductsService";
import { UserListService } from "services/Users/UserService";

// Icons
import { AiFillCheckCircle } from "react-icons/ai";

function Inventory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [providers, setProviders] = useState([]);
  const [idProvider, setIdProvider] = useState(0);
  const [idCategory, setIdCategory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [productList, setProductList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(15);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);
  
  const { isOpen: isOpenErr, onOpen: onOpenErr, onClose: onCloseErr } = useDisclosure();
  const toast = useToast();

  const [filters, setFilters] = useState({
    name: "",
    category: "",
  });

  const handleOpenModal = (product) => {
    setEditingProduct(product || null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleCategoryList = async () => {
    setLoading(true);
    setMsg("Cargando categorias...");
    try {
      const { data, msg } = await CategoryListService();
      if (data) {
        setCategoryList(data);
      }
      else {
        console.log("Error al obtener la lista de categorias:", msg);
        setErr("Error al obtener los categorias");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de categorias:", error);
      setErr("Error al obtener los categorias");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  const handleProviderList = async () => {
    // Lógica para aplicar los filtros
    const form = {
      page: 1,
      name: "",
      idRol: 4,
      dateCreation: -1,
    };
    setLoading(true);
    setMsg("Cargando proveedores...");
    try {
      const { data, msg } = await UserListService(form);
      if (data) {
        setProviders(data.users);
      }
      else {
        console.log("Error al obtener la lista de proveedores:", msg);
        setErr("Error al obtener los proveedores");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de proveedores:", error);
      setErr("Error al obtener los proveedores");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };


  const handleApplyFilters = async () => {
    // Lógica para aplicar los filtros
    const form = {
      page: page,
      name: filters.name,
      idCategory: idCategory
    };
    setLoading(true);
    setMsg("Cargando productos...");
    try {
      const { data, msg } = await ProductsListService(form);
      if (data) {
        setProductList(data.products);
        setTotalProducts(data.total);
        setProductsPerPage(data.page_size);
      }
      else {
        console.log("Error al obtener la lista de productos:", msg);
        setErr("Error al obtener los productos");
        onOpenErr();
      }
    }
    catch (error) {
      console.error("Error al obtener la lista de productos:", error);
      setErr("Error al obtener los productos");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
  };

  useEffect(() => {
    handleCategoryList();
    handleProviderList();
    handleApplyFilters();
		if (onCloseErr) {
			setErr("");
		}
  }, []);

  useEffect(() => {
    if (applyFiltersFlag) {
      handleApplyFilters();
      setApplyFiltersFlag(false);
    }
  }, [applyFiltersFlag]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleIncrementPage = () => {
    setPage(page + 1);
    setApplyFiltersFlag(true);
  };

  const handleDecrementPage = () => {
    if (page === 1) return;
    setPage(page - 1);
    setApplyFiltersFlag(true);
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      category: "",
    });
    setPage(1);
    setIdCategory(0);
    setApplyFiltersFlag(true);
  };

  const handleUpdateProductService = async (data) => {
    const { exito, msg } = await ProductUpdateService(data);
    if (exito) {
      toast({
        title: "Éxito",
        description: "Producto actualizado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleCloseModal();
    }
    else{
      if (msg === "PRODUCTO_NO_ENCONTRADO") {
        toast({
          title: "¡Error!",
          description: "El producto no fue encontrado",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      else{
        toast({
          title: "Ups..",
          description: "Ocurrió un error inesperado al actualizar el Producto",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleAddProductService = async (data) => {
    const { exito, msg } = await ProductCreateService(data);
    if (exito) {
      toast({
        title: "Éxito",
        description: "Producto guardado exitosamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleCloseModal();
    }
    else if (msg === "PRODUCTO_EXISTENTE"){
      toast({
        title: "¡Error!",
        description: "El nombre del producto ya está registrado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: "Ups..",
        description: "Ocurrió un error inesperado al guardar el Producto",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const handleAddEditProduct = async (data) => {
    setLoading(true);
    try {
      if (!data) {
        setErr("Error al obtener los datos del producto");
        onOpenErr();
        return;
      }
      if(data.id) {
        setMsg("Actualizando producto...");
        await handleUpdateProductService(data);
      }
      else{
        setMsg("Guardando producto...");
        await handleAddProductService(data);
      }
    }
    catch (error) {
      console.error("Error al agregar o editar producto:", error);
      setErr("Error al agregar o editar producto");
      onOpenErr();
    }
    finally {
      setLoading(false);
      setMsg("");
    }
    setApplyFiltersFlag(true);
  };

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/* Filtros */}
      <Card mb="22px">
        <CardHeader p="6px 0px 22px 0px">
        <Flex direction={{ base: "column", md: "row" }} gap="20px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Filtros
          </Text>
        </Flex>
        <Button
          marginLeft={{ base: "50px", md: "auto" }}
          colorScheme="blue" 
          onClick={() => handleOpenModal()}>
            Agregar Producto
          </Button>
        </CardHeader>
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap="20px">
            <FormControl>
              <FormLabel color="gray.400">Nombre</FormLabel>
              <Input
                name="name"
                width={{ base: "100%", md: "180px" }}
                placeholder="Buscar por nombre"
                value={filters.name}
                onChange={handleInputChange}
                color="#fff"
                borderColor="gray.600"
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.400">Categoria</FormLabel>
              <Menu>
                <MenuButton
                  width={{ base: "100%", md: "220px" }}
                  border="1px solid #4B5563"
                  as={Button}
                  rightIcon={<ChevronDownIcon color={filters.category ? "white" : "gray.200"} />}
                  bg="none" 
                  bord color={!filters.category ? "gray.500" : "white" } 
                  _hover={{ bg: "none", borderColor: "gray.300" }}
                  _active={{ bg: "none", borderColor: "white" }}
                >
                  {filters.category || "Seleccionar Estado"}
                </MenuButton>
                <MenuList bg="gray.700" color="white" size="12px">
                  {categoryList
                    .map((c) => (
                    <MenuItem
                      size="12px"
                      key={c.id}
                      onClick={() => {
                        setFilters((prevFilters) => ({ ...prevFilters, category: c.name }));
                        setIdCategory(c.id);
                      }}
                      _hover={{ bg: "purple.500" }}
                      _focus={{ bg: "purple.500" }}
                    >
                      {c.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </FormControl>
          </Flex>
          {/* Flex for the buttons */}
          <Flex
            mt="30px"
            marginStart={{ base: "0px", md: "20px" }}
            justifyContent="flex-end"
            gap="10px"
            direction={{ base: "column", md: "row" }}
          >
            <Button
              _hover={{ bg: "brand.300" }}
              bg={"brand.200"}
              textColor={"white"}
              onClick={handleApplyFilters}
              width={{ base: "100px", md: "auto" }}
              marginLeft={{ base: "30px", md: "0px" }}
            >
              Aplicar
            </Button>
            <Button
              _hover={{ bg: "white" }}
              bg={"gray.300"}
              disabled={Object.values(filters).every((filter) => filter === "")}
              onClick={handleClearFilters}
              width={{ base: "100px", md: "auto" }}
              marginLeft={{ base: "30px", md: "0px" }}
            >
              Limpiar
            </Button>
            <Flex
              marginStart={{ base: "0px", md: "50px", lg: "50px" }}
              justifyContent="flex-end"
              gap="10px"
              direction={{ base: "column", md: "row" }}
            >
              <Button
                _hover={{ bg: page === 1 ? "gray.400" : "purple.500" }}
                bg={page === 1 ? "gray.300" : "brand.200"}
                disabled={page === 1}
                onClick={handleDecrementPage}
                width={{ base: "70px", md: "70px" }}
                marginLeft={{ base: "30px", md: "50px" }}
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  {'<'}
                </Text>
              </Button>
              <Button
                _hover={{ bg: (page * productsPerPage) >= totalProducts ? "gray.400" : "purple.500" }}
                bg={(page * productsPerPage) >= totalProducts ? "gray.300" : "brand.200"}
                disabled={(page * productsPerPage) >= totalProducts}
                onClick={handleIncrementPage}
                width={{ base: "70px", md: "70px" }}
                marginLeft={{ base: "30px", md: "0px" }}
              >
                <Text fontSize="lg" color="#fff" fontWeight="bold">
                  {'>'}
                </Text>
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {/* Clients Table */}
      <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }} pb='0px'>
        {/* <CardHeader p='6px 0px 22px 0px'>
          <Flex direction='column'>
            <Text fontSize='lg' color='#fff' fontWeight='bold' mb='.5rem'>
              Inventario de Productos
            </Text>
            <Flex align='center'>
              <Icon
                as={AiFillCheckCircle}
                color='green.500'
                w='15px'
                h='15px'
                me='5px'
              />
              <Text fontSize='sm' color='gray.400' fontWeight='normal'>
                <Text fontWeight='bold' as='span' color='gray.400'>
                  +30%
                </Text>{" "}
                este mes
              </Text>
            </Flex>
          </Flex>
        </CardHeader> */}
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Nombre del Producto
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Precio Unitario
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Stock
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Categoria
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  % de Venta Mensual
                </Th>
                <Th borderBottomColor='#56577A'></Th>
              </Tr>
            </Thead>
            <Tbody>
              {productList.length === 0 ? (
                <Tr>
                  <Th colSpan="6" textAlign="center" color="gray.400">
                    No se encontraron resultados
                  </Th>
                </Tr>
              ) :
              productList.map((row, index, arr) => {
                return (
                  <TableRowInventory
                    name={row.name}
                    stock={row.stock}
                    price={row.price}
                    category={row.name_category}
                    progression={row.sales_percentage}
                    lastItem={index === arr.length - 1 ? true : false}
                    onEdit={() => handleOpenModal(row)}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <ModalInventoryForm 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(data) => handleAddEditProduct(data)}
        product={editingProduct}
        categories={categoryList}
        providers={providers}
      />
      <CustomModal
				header="Upss!"
				message={err}
				isOpen={isOpenErr}
				onClose={onCloseErr}
        zIndex="1300"
			/>
      {loading && <DotSpin message={msg} />}
    </Flex>
  );
}

export default Inventory;
