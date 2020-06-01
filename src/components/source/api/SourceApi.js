import { sources } from './mockData';

class SourceApi {
  getSources = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(sources);
    }, 100);
  });
}

const instance = new SourceApi();
Object.freeze(instance);
Object.seal(instance);

export default instance;
