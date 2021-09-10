const handler = async (req, res) => {
  const { name } = req.query
  const response = await fetch(`https://calculadora-de-accesibilidad.s3.us-west-2.amazonaws.com/data/${name}/main.json`)
  const data = await response.text()
  res.status(200).json(data)
}


export default handler