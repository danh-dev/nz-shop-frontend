const getSlugByName = name => {
  return name.toLowerCase().split(/\W+/).join("-");
};

export default getSlugByName;
