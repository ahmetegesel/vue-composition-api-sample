import { tags } from './mockData';

class TagApi {
  getTags = (name) => new Promise((resolve) => {
    setTimeout(() => {
      resolve(tags.filter((tag) => tag.includes(name)));
    }, 100);
  });
}

const instance = new TagApi();
Object.freeze(instance);
Object.seal(instance);

export default instance;
