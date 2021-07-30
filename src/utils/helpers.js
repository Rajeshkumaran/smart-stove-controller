export const get = (from, selector, defaultVal) => {
  const value = selector
    .replace(/\[([^[\]]*)\]/g, ".$1.")
    .split(".")
    .filter((t) => t !== "")
    .reduce((prev, cur) => prev && prev[cur], from);
  return value === undefined || value === null ? defaultVal : value;
};
const findChildObjectives = (okrs, id) => {
  return okrs.filter((okr) => okr.parent_objective_id === id);
};
export const formatOkrData = (okrs = []) => {
  if (!okrs) return [];
  const parentObjectives = okrs.filter((okr) => okr.parent_objective_id === "");
  let formattedData = [];

  parentObjectives.map((parentObjtve) => {
    let obj = {};
    obj.parent = parentObjtve;
    obj.childObjectives = findChildObjectives(okrs, parentObjtve.id);
    formattedData.push(obj);
    return null;
  });
  return formattedData;
};
export const findCategories = (okrs = []) => {
  if (!okrs) return [];
  let categories = new Set();
  okrs.map((okr) => {
    categories.add(okr.category);
    return null;
  });
  return [...categories];
};
