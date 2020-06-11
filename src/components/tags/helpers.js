import TagApi from './api/TagsApi';

export const addTag = (tag, value) => {
  if (!value.includes(tag)) {
    return [...value, tag];
  }

  return [...value];
};

const filterAlreadyAddedTags = (result, value) => (tag) => !value.includes(tag);

export const searchTags = async (searchText, value) => {
  const result = await TagApi.getTags(searchText);

  if (result) {
    return result.filter(filterAlreadyAddedTags(result, value));
  }

  return [];
};
