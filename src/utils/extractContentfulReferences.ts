/* eslint-disable no-param-reassign */
function isReference(object: any): boolean {
  return !!object?.fields;
}
/**
 * Recursively extracts the fields from Contentful references.
 */

function extractReferences(object: any): any {
  if (!object) return object;

  if (Array.isArray(object)) {
    object = object.map((item: any) => extractReferences(item));
  }

  if (typeof object === 'object') {
    Object.keys(object).forEach((key) => {
      object[key] = extractReferences(object[key]);
    });
  }

  if (isReference(object)) {
    return object.fields;
  }

  return object;
}

export default extractReferences;
