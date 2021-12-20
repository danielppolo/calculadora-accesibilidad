const count = (array, property) => array.reduce((acc, item) => acc + item.properties[property], 0);

export default count;
