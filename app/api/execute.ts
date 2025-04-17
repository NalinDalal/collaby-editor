import { spawn } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code, language } = req.body;

  const dockerRun = spawn("docker", [
    "run",
    "--rm",
    "-e",
    `CODE=${code}`,
    "-e",
    `LANG=${language}`,
    "-m",
    "100m", // memory limit
    "--cpus=0.5", // cpu limit
    "online-compiler",
  ]);

  let output = "";
  let error = "";

  dockerRun.stdout.on("data", (data) => {
    output += data.toString();
  });

  dockerRun.stderr.on("data", (data) => {
    error += data.toString();
  });

  dockerRun.on("close", () => {
    res.status(200).json({ output: output.trim(), error: error.trim() });
  });
}
