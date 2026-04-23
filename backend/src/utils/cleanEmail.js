export const cleanEmail = (email) => {
  const username = email.split("@")[0];
  const name = username.replace(/[^a-zA-Z]/g, "");

  return name;
};
