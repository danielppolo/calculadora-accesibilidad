import hash from 'object-hash';
import { MapParamsState } from 'src/context/mapParams';

const generateVariantId = ({ filters, ...otherOptions }: MapParamsState) =>
  hash({ ...otherOptions, ...filters });

export default generateVariantId;
