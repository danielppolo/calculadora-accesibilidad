import React, { useState, useEffect } from 'react';
import Map from '../components/Map';

export default function Home() {
  const [city, setCity] = useState();
  useEffect(() => {
    const fetchCity = async () => {
      const response = await fetch('/api/cities/cancun');
      const data = await response.json();
      setCity(data);
    };

    fetchCity();
  }, []);
  return (
    <Map city="cancun" data={city || {}} />
  );
}
