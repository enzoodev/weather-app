import { authMock } from '@/mock/authMock';
import { createServer, Model } from 'miragejs';

export function mirageServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      location: Model,
    },

    routes() {
      this.namespace = 'api';

      this.get('/locations', (schema: any) => {
        return schema.locations.all();
      });

      this.post('/locations', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.locations.create(attrs);
      });

      this.delete('/locations/:id', (schema, request) => {
        const { id } = request.params;
        return schema.locations.find(id).destroy();
      });

      this.post('/login', () => {
        return authMock;
      });
    },
  });

  return server;
}
