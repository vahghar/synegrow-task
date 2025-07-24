import express from 'express';
import taskRoutes from './routes/taskRoutes';
import YAML from 'yamljs'
import { serve, setup } from 'swagger-ui-express';

const app = express();
const PORT = 3000;

const swaggerDoc = YAML.load('./swagger.yaml')

app.use(express.json());
app.use('/api', taskRoutes);
app.use('/docs', serve, setup(swaggerDoc));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});