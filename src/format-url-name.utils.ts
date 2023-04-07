export const formatUrlName = (str: string): string => {
  if (str === "index") {
    return "";
  }
  return str.toString().replace(/([A-Z])/g, (str) => "-" + str.toLowerCase());
};
