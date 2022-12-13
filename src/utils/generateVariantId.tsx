import hash from 'object-hash';

interface Options {
  cityCode: string;
  visualizationCode: string;
  variantCode: string;
  filters: Record<string, string>;
}

const generateVariantId = ({ filters, ...otherOptions }: Options) =>
  hash({ ...otherOptions, ...filters });

export default generateVariantId;
