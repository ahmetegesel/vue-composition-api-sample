import '@/installCompositionApi';
import * as searching from '../../helpers/searching';
import * as binding from '../../helpers/binding';
import * as helpers from '../helpers';
import Tags from '../Tags.vue';

describe('Tags Component tests', () => {
  const cleanSearch = jest.fn();
  const value = [];
  const emit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('onTagsChanged should call cleanSearch for cleaning search data prop.', () => {
    jest.spyOn(searching, 'useSearchWithCleaningAfterEvent').mockImplementationOnce(() => ({
      search: { value: '' },
      onChanged: cleanSearch,
    }));

    const { onTagsChanged } = Tags.setup({ value }, { emit });
    const newValue = 'test';

    onTagsChanged(newValue);

    expect(cleanSearch).toBeCalled();
  });

  test('onTagsChanged should reset activeTags to an empty array for a fresh start for next search.', () => {
    const { onTagsChanged, activeTags } = Tags.setup({ value }, { emit });
    const newValue = 'test';
    activeTags.value = ['test'];

    onTagsChanged(newValue);

    expect(activeTags.value.length).toBe(0);
  });

  test('onTagsChanged should add the given newValue to lazyValue.', () => {
    const { onTagsChanged, lazyValue } = Tags.setup({ value }, { emit });
    const testValue = 'test';

    onTagsChanged(testValue);

    expect(lazyValue.value.length).toBe(1);
    expect(lazyValue.value[0]).toBe(testValue);
  });

  test('onTagsChanged should add the given newValues to lazyValue.', () => {
    const { onTagsChanged, lazyValue } = Tags.setup({ value }, { emit });
    const testValue1 = 'test1';
    const testValue2 = 'test2';
    const testValue3 = 'test3';

    onTagsChanged(testValue1);
    onTagsChanged(testValue2);
    onTagsChanged(testValue3);

    expect(lazyValue.value.length).toBe(3);
    expect(lazyValue.value[0]).toBe(testValue1);
    expect(lazyValue.value[1]).toBe(testValue2);
    expect(lazyValue.value[2]).toBe(testValue3);
  });

  test('onTagsChanged should call updateValue with the newest lazyValue.', () => {
    const updateValue = jest.fn();

    jest.spyOn(binding, 'useTwoWayBinding').mockImplementationOnce(() => ({
      lazyValue: { value: [] },
      updateValue,
    }));

    const { onTagsChanged, lazyValue } = Tags.setup({ value }, { emit });
    const testValue = 'test';

    onTagsChanged(testValue);

    expect(updateValue).toBeCalledWith(lazyValue.value);
  });

  test('remove should remove given tag from lazyValue.', () => {
    const tagToBeRemoved = 'removingTag';
    const remainingTagAfterRemoval = 'test';

    jest.spyOn(binding, 'useTwoWayBinding').mockImplementationOnce(() => ({
      lazyValue: { value: [remainingTagAfterRemoval, tagToBeRemoved] },
    }));

    const { remove, lazyValue } = Tags.setup({ value }, { emit });

    remove(tagToBeRemoved);

    expect(lazyValue.value.length).toBe(1);
    expect(lazyValue.value[0]).toBe(remainingTagAfterRemoval);
  });

  test('When new value is set to search it should set the new value directly to searchText.', () => {
    const searchText = { value: '' };
    const searchKeyword = 'test';

    jest.spyOn(searching, 'useSearchWithCleaningAfterEvent').mockImplementationOnce(() => ({
      search: searchText,
    }));

    const { search } = Tags.setup({ value }, { emit });

    search.value = searchKeyword;

    expect(searchText.value).toBe(searchKeyword);
  });

  test('When new value is set to search it should toggle searching flag isSearching to false.', async () => {
    expect.assertions(1);

    jest.spyOn(helpers, 'searchTags').mockImplementationOnce(() => []);

    const searchKeyword = 'test';

    const { search, isSearching } = Tags.setup({ value }, { emit });
    isSearching.value = true;

    // Since setter fn of search is async, Promise.resolve makes it possible to await setter fn
    await Promise.resolve((search.value = searchKeyword));

    expect(isSearching.value).toBeFalsy();
  });

  test('When new value shorter than 3 is set to search it should not do anything.', async () => {
    expect.assertions(3);

    jest.spyOn(helpers, 'searchTags');
    jest.spyOn(helpers, 'addTag');
    jest.spyOn(searching, 'useSearchWithCleaningAfterEvent').mockImplementationOnce(() => ({
      search: { value: '' },
      onChanged: cleanSearch,
    }));
    const searchKeyword = 'te';

    const { search } = Tags.setup({ value }, { emit });

    // Since setter fn of search is async, Promise.resolve makes it possible to await setter fn
    await Promise.resolve((search.value = searchKeyword));

    expect(helpers.addTag).not.toBeCalled();
    expect(helpers.searchTags).not.toBeCalled();
    expect(cleanSearch).not.toBeCalled();
  });

  test('When new value longer than 2 and ending with "," '
    + 'is set to search it should add the given keyword omitting the comma.', async () => {
    expect.assertions(4);

    jest.spyOn(helpers, 'addTag');
    jest.spyOn(searching, 'useSearchWithCleaningAfterEvent').mockImplementationOnce(() => ({
      search: { value: '' },
      onChanged: cleanSearch,
    }));
    const searchKeyword = 'test,';

    const { search, lazyValue } = Tags.setup({ value }, { emit });
    const lazyValueBeforeAct = lazyValue.value;

    // Since setter fn of search is async, Promise.resolve makes it possible to await setter fn
    await Promise.resolve((search.value = searchKeyword));

    expect(helpers.addTag).toBeCalledWith(searchKeyword.slice(0, -1), lazyValueBeforeAct);
    expect(cleanSearch).toBeCalled();
    expect(lazyValue.value.length).toBe(1);
    expect(lazyValue.value[0]).toBe(searchKeyword.slice(0, -1));
  });

  test('When new value longer than 2 and NOT ending with "," '
    + 'is set to search it should search for the given keyword.', async () => {
    expect.assertions(3);

    const searchKeyword = 'test';
    jest.spyOn(helpers, 'searchTags').mockImplementation(() => [searchKeyword]);

    const { search, lazyValue, activeTags } = Tags.setup({ value }, { emit });

    // Since setter fn of search is async, Promise.resolve makes it possible to await setter fn
    await Promise.resolve((search.value = searchKeyword));

    expect(helpers.searchTags).toBeCalledWith(searchKeyword, lazyValue.value);
    expect(activeTags.value.length).toBe(1);
    expect(activeTags.value[0]).toBe(searchKeyword);
  });
});
