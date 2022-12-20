const passwordValidator = (password) => {
  if (
    !!password.trim() &&
    !password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
  )
    return false;
  return true;
};

const emailValidator = (email) => {
  if (!!email.trim() && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    return false;
  return true;
};

module.exports = {
  passwordValidator,
  emailValidator,
};
