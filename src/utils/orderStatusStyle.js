export const getStatusStyles = (status) => {
  switch (status) {
    case "Нове":
      return {
        background: "#324EBD",
        color: "#FAF9FB",
      };
    case "Відправлене":
      return {
        background: "#789DD1",
        color: "#FAF9FB",
      };
    case "Отримане":
      return {
        background: "#7CA75F",
        color: "#030C0D",
      };
    case "Скасоване":
      return {
        background: "rgba(209, 54, 52, 0.25)",
        color: "#D13634",
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
