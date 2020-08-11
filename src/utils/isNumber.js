const isNumber = value => typeof value === 'number' && value === value && value !== Infinity && value !== -Infinity;

export default isNumber;
