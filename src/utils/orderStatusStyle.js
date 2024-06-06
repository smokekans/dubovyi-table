export const getStatusStyles = (status) => {
  switch (status) {
    case "Нове":
      return {
        background: "#FAF9FB",
        color: "#030C0D",
      };
    case "Відправлене":
      return {
        background: "#789DD1",
        color: "#FAF9FB",
      };
    case "Отримане":
      return {
        background: "#7CA75F",
        color: "#FAF9FB",
      };
    case "Скасоване":
      return {
        background: "#D13634",
        color: "#FAF9FB",
      };
    case "В обробці":
      return {
        background: "#FBA032",
        color: "#030C0D",
      };
    default:
      return {};
  }
};
