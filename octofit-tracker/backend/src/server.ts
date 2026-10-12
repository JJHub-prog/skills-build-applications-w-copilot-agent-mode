import app from './app';
import { connectDatabase } from './config/database';

const port = Number(process.env.PORT) || 8000;

async function startServer(): Promise<void> {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-${port}.app.github.dev`
      : `http://localhost:${port}`;

    console.log(`Octofit API listening at ${baseUrl}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start Octofit API:', error);
  process.exitCode = 1;
});
