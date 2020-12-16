import { APITest } from './api';
import { addMockDataToGitIgnore } from '../utils';

// function isPort(value) {
//   return Number.isNaN(value) || typeof value !== 'number' || value <= 0 || value % 1 !== 0
// }

export async function start(context) {
  const testApi = new APITest();
  try {
    addMockDataToGitIgnore(context);

    const portArg = context?.parameters?.options?.port;
    const wsPortArg = context?.parameters?.options?.wsPort;

    // let port = undefined;
    let port = portArg;

    // let wsPort = undefined;
    let wsPort = wsPortArg;

    // if (portArg) {
    //   port = Number(portArg);

    //   if (!isPort(port)) {
    //     context.print.error(`port must be a positive integer`);
    //     return context;
    //   }
    // }

    // if (wsPortArg) {
    //   wsPort = Number(portArg);

    //   if (!isPort(wsPort)) {
    //     context.print.error(`wsPort must be a positive integer`);
    //     return context;
    //   }
    // }

    context.print.info(`port: ${port}`);
    context.print.info(`wsPort: ${wsPort}`);

    testApi.start(context, port, wsPort);
  } catch (e) {
    console.log(e);
    // Sending term signal so we clean up after ourself
    process.kill(process.pid, 'SIGTERM');
  }
}
