const buildCityMarker = (color: string) => {
  const container = document.createElement('div');
  container.className = 'flex items-center justify-center relative';
  const pulse = document.createElement('div');
  pulse.className = 'animate-pulse absolute rounded-full h-4 w-4 opacity-5';
  pulse.style.backgroundColor = color;
  const dot = document.createElement('div');
  dot.className = 'absolute rounded-full h-2 w-2';
  dot.style.backgroundColor = color;
  container.appendChild(dot);
  container.appendChild(pulse);
  return container;
};

export default buildCityMarker;
