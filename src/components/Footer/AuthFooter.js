/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";

export default function AuthFooter(props) {
  return (
    <Flex
      h='100%'
      flexDirection={{
        base: "column",
      }}
      alignItems={{
        base: "center",
      }}
      justifyContent='space-between'
      pb='10px'
      fontSize='sm'>
      <Text
        color='white'
        textAlign={{
          base: "center",
        }}
        mb={{ base: "20px" }}>
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as='span' mx='2px'>
          {/* {document.documentElement.dir === "rtl"
            ? " مصنوع من ❤️ بواسطة"
            : "Made with ❤️ by "} */}
            Hecho por 
        </Text>
        <Link href='https://www.linkedin.com/in/jsiguenzac/' target='_blank'>
          {/* {document.documentElement.dir === "rtl"
            ? " توقيت الإبداعية"
            : "Simmmple "} */}
            Joel Sigüenza C.
        </Link>
        </Text>
        {/* &
        <Link href='https://www.creative-tim.com' target='_blank'>
          {document.documentElement.dir === "rtl" ? "سيممبل " : " Creative Tim"}
        </Link>
        {document.documentElement.dir === "rtl"
          ? "للحصول على ويب أفضل"
          : " for a better web"}
      </Text>
      <List display='flex'>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link color='white' fontSize='sm' href='https://www.simmmple.com'>
            {document.documentElement.dir === "rtl"
              ? "Joel Sigüenza C."
              : "Joel Sigüenza C."}
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link color='white' fontSize='sm' href='https://www.creative-tim.com'>
            {/* {document.documentElement.dir === "rtl" ? "سيممبل" : "Creador Joel"} /}
            Creator Joel
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: "20px",
          }}>
          <Link
            color='white'
            fontSize='sm'
            href='https://creative-tim.com/blog'>
            {document.documentElement.dir === "rtl" ? "مدونة" : "Blog"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color='white'
            href='https://www.creative-tim.com/license'>
            {document.documentElement.dir === "rtl" ? "رخصة" : "License"}
          </Link>
        </ListItem>
      </List> */}
    </Flex>
  );
}
