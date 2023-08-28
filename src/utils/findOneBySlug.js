import getSlugByName from "./getSlugByName";

const findOneBySlug = (array, props, slug) => {
  return array.find(item => getSlugByName(item[props]) === slug);
};

export default findOneBySlug;
