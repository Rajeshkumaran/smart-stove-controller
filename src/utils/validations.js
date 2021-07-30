import * as regex from "./regex";
const validations = {
  configs: {
    name: regex.NAME,
    points: regex.POINTS,
  },

  check: (state) => {
    const { type, value } = state;
    return validations.configs[type]
      ? validations.configs[type].test(value)
      : true;
  },
};
export default validations;
