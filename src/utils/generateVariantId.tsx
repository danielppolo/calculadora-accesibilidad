import hash from 'object-hash';
import { MapParamsState } from 'src/types';

const generateVariantId = ({
  filters,
  ...otherOptions
}: Partial<MapParamsState>) => hash({ ...otherOptions, ...filters });

export default generateVariantId;
