const handler = async (req, res) => {
  const { name, id } = req.query;
  console.log(name, id)
  const response = await fetch(`https://calculadora-de-accesibilidad.s3.us-west-2.amazonaws.com/data/${name}/layers/${id}.geojson`);
  const data = await response.text();
  res.status(200).json(data);
};

export default handler;
