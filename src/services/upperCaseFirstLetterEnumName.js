export const upperCaseFirstLetterEnumName = (enumsStateName, id) => {
  const enumsName = enumsStateName.find((enumName) => enumName.id === id)?.name;

  const enumsNameUpperCaseFirstLetter = enumsName
    ? enumsName.charAt(0).toUpperCase() + enumsName.slice(1)
    : undefined;

  return enumsNameUpperCaseFirstLetter;
};
