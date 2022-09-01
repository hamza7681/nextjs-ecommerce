import mongoConnection from "../../Helpers/mongoConnection";
import User from "../../models/userSchema";
import bcrypt from 'bcryptjs'

mongoConnection();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "please ass all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: "user already exists with that email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    
    res.status(201).json({ message: "signup success" });
  } catch (err) {
    console.log(err);
  }
};
