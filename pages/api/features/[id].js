// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require('fs')

const handler = async (req, res) => {
  const { id } = req.query
  console.log(id)
  await fs.readFile(`data/api/${id}.json`, 'utf8', (err, data) => {
    if (err) throw err;
    res.status(200).json(JSON.parse(data))
  });
}


export default handler