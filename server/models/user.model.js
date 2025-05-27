import { db } from "../config/database.js";

const create = async ({ email, password, username }) => {
  const query = {
    text: `
    INSERT INTO USERS (EMAIL, PASSWORD, USERNAME)
    VALUES($1,$2,$3)
    RETURNING EMAIL, USERNAME, ROLE_ID, UID
    `,
    values: [email, password, username],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const find = async () => {
  const query = {
    text: `
    SELECT * FROM USERS
    `,
  };
  const { rows } = await db.query(query);
  return rows;
};

const findByEmail = async (email) => {
  const query = {
    text: `
      SELECT * FROM USERS
      WHERE EMAIL = $1
    `,
    values: [email],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findByUsername = async (username) => {
  const query = {
    text: `
      SELECT * FROM USERS
      WHERE USERNAME = $1
    `,
    values: [username],
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const UserModel = {
  create,
  find,
  findByEmail,
  findByUsername,
};
