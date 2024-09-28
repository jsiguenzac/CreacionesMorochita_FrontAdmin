/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent='space-between'
      px='30px'
      pb='20px'>
      <Text
        fontSize='sm'
        color='white'
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}>
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as='span'>
          {document.documentElement.dir === "rtl"
            ? "Creado por "
            : "Hecho por "}
        </Text>
        <Link href='https://www.linkedin.com/in/jsiguenzac/' target='_blank'>
          {/* {document.documentElement.dir === "rtl"
            ? " توقيت الإبداعية"
            : "Simmmple "} */}
            Joel Sigüenza C.
        </Link>
        {/* &
        <Link href='https://www.creative-tim.com' target='_blank'>
          {document.documentElement.dir === "rtl" ? "سيممبل " : " Creative Tim"}
        </Link>
        {document.documentElement.dir === "rtl"
          ? "للحصول على ويب أفضل"
          : " for a better web"} */}
      </Text>


      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='white' fontSize='sm' href='https://www.simmmple.com'>
            {/* {document.documentElement.dir === "rtl"
              ? "توقيت الإبداعية"
              : "Por Cambiar"} */}
              Por cambiar
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link color='white' fontSize='sm' href='https://www.creative-tim.com'>
            {/* {document.documentElement.dir === "rtl" ? "سيممبل" : "Creative Tim"} */}
            Por cambiar
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}>
          <Link
            color='white'
            fontSize='sm'
            href='https://creative-tim.com/blog'>
            {/* {document.documentElement.dir === "rtl" ? "مدونة" : "Blog"} */}
            Por cambiar
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color='white'
            fontSize='sm'
            href='https://www.creative-tim.com/license'>
            {/* {document.documentElement.dir === "rtl" ? "رخصة" : "License"} */}
            Por cambiar
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}

