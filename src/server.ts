import app from './app';
import config  from 'config';

const PORT = process.env.PORT || config.get<number>('port') || 3500;

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
  });