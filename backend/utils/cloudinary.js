export const optimizeImage = (
  url,
  options = "w_400,h_400,c_fill,f_auto,q_auto"
) => {
  if (!url) return "";
  return url.replace("/upload/", `/upload/${options}/`);
};
