import * as bcrypt from 'bcrypt';

const saltRound = 10;

export const hash = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    // AddLog
    console.log('Error Hash: ', error);
    return null;
  }
};

export const compareHash = async (password: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    // AddLog
    console.log('Error Compare: ', error);
    return false;
  }
};
