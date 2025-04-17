import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  res.status(201).json({ message: "User created", userId: user.id });
}
