import { categories } from './mockData';

class CategoryApi {
  getCategories = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(categories);
    }, 100);
  });
}

const instance = new CategoryApi();
Object.freeze(instance);
Object.seal(instance);

export default instance;
