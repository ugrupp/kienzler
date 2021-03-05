const styles = {
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

    // Only way to use media queries on swiper slides as it seems
    ".swiper-slide-details": {
      width: [312, null, 520, null, null, 900, 980],
    },

    // Only way to use media queries on swiper slides as it seems
    ".swiper-slide-sizes": {
      width: [300, null, 360, null, null, null, 460],
      "&:last-of-type": {
        marginRight: 100,
      },
    },
  },
}

export default styles
