export const validateIsAdmin = async (req, res, next) => {
  const role_id = req.role_id;

  if (role_id !== 1) {
    return res.status(400).json({ error: "Error only admin have access" });
  }

  next()
};
