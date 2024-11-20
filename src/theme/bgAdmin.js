import bgBody from "assets/img/background-body-admin.png";

export const bgAdmin = {
  styles: {
    global: (props) => ({
      body: {
        bgImage: bgBody,
        bgSize: "cover",
        bgPosition: "center center",
      },
      // color a scroll bar
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "brand.800",
      },
      "::-webkit-scrollbar-thumb": {
        //background: "#888",
        bgGradient:"linear(to-br, purple.500, purple.800)",
        borderRadius: "6px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "brand.200"
      }
    }),
  },
};
