const accountService = require('resources/account/account.service');
const securityUtil = require('security.util');

async function createAccount(userData) {
  const salt = await securityUtil.generateSalt();
  const hash = await securityUtil.getHash(userData.password, salt);

  const user = await accountService.create({
    login: userData.firstName,
    passwordHash: hash.toString(),
    passwordSalt: salt.toString(),
    email: userData.email,
  });

  return user;
}

exports.signup = async (ctx) => {
  const userData = ctx.request.body;

  await createAccount(userData);
  this.status = 200;
};

module.exports.signin = async (ctx) => {
  let isPasswordMatch = false;

  const user = accountService.findOne({ email: ctx.request.body.email });

  if (user) {
    isPasswordMatch = await securityUtil
      .compareTextWithHash(ctx.request.body.password, user.passwordHash, user.passwordSalt);
  } else {
    ctx.errors.push({ email: 'User with such email doesn\'t exist' });
  }

  if (!isPasswordMatch) {
    ctx.errors.push({ password: 'Invalid password' });
  } else {
    ctx.state.user = user;
    this.status = 200;
  }
};

module.exports.logout = (ctx) => {
  ctx.state.user = {};
};
