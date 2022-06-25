import userService from "../services/userService.js";

async function signUp(req, res) {
  const user = req.body;
  await userService.signUp(user);

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
