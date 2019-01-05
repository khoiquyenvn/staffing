import _ from 'lodash/fp';

export function getDefaultDropdownObject(propertyName) {
  return {
    value: '00000000-0000-0000-0000-000000000000',
    label: '',
    propertyName: propertyName
  };
}

export function getOptionsForDropdown(realOptions, propertyName) {
  let values = [
    getDefaultDropdownObject()
  ];
  let realValues = realOptions.map(option => {
    return {
      value: option.Id,
      label: option.Name,
      propertyName: propertyName
    }
  });

  return _.concat(values, realValues);
}