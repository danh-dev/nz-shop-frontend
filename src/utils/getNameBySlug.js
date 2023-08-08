const getSlugByName = slug => {
  return slug.split("-").join(" ");
};

export default getSlugByName;
