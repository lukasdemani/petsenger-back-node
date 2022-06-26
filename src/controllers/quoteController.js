import quoteService from "../services/quoteService.js";

async function getQuote(req, res) {
  const price = req.body;
  console.log(['price', req.body])
  const quote = await quoteService.getQuote(price);
  console.log(quote)
  res.send(quote);
}

const quoteController = {
  getQuote
}

export default quoteController;