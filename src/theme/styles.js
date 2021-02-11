export default {
  global: {
    html: {
      scrollBehavior: "smooth",
      textSizeAdjust: "100%",
    },

    body: {
      fontSize: "1rem",
      color: "gray.500",
    },

    "*, *::before, &::after": {
      wordWrap: null,
    },

    "::selection": {
      bgColor: "orange.500",
      color: "white",
    },
  },
}
