import { useMemo, useCallback } from 'react';

const useBuckets = (data, extractor, bucketCount) => {
  const values = data.map((item) => extractor(item));
  const max = Math.max(...values);
  const min = Math.min(...values);

  let i = 0;
  const l = data.length;
  const inc = (max - min) / bucketCount;
  const buckets = new Array(bucketCount);

  for (i = 0; i < bucketCount; i += 1) {
    buckets[i] = [];
  }
  for (i = 0; i < l; i += 1) {
    if (values[i] === max) {
      buckets[bucketCount - 1].push(data[i]);
    } else {
      console.log(values[i]);
      // buckets[((values[i] - min) / inc) || 0].push(data[i]);
    }
  }
  return buckets;
};

export default useBuckets;
