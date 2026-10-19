import { app } from './app.ts';

const port = 3000;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Server API berjalan di http://localhost:${port}`);
});
