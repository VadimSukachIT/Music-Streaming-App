const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('kcors');
const routes = require('./routes');

const app = new Koa();

app.use(cors());
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    this.status = err.status || 500;
    this.body = {
      errors: [{ _global: 'An error has occurred' }],
    };
  }
});

routes(app);

app.listen(3000);
