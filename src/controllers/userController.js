import userService from "../services/userService.js";

async function signUp(req, res) {
  const user = req.body;
  const response = await userService.signUp(user);
  console.log(response)
  res.sendStatus(201);
}

async function signIn(req, res) {
  const user = req.body;
  const nameToken = await userService.signIn(user);
  console.log(nameToken)
  res.send(nameToken);
}

export default {
  signUp,
  signIn,
};
