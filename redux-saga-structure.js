// define Types
favoriteSearch = { Update: 'UPDATE_USER_NAME' }

// Action creator //
export const updateFavoriteSearchesAction = favoriteSearch => tagAction('update_favorite_searches', FavoriteSearchesTypes.Update, { payload: favoriteSearch });

// Saga stage //
export default function* favoriteSearchesWatcher() {
  yield takeLatest(getFavoriteSearchesSagaType, favoriteSearchesWorker);
}

export function* favoriteSearchesWorker() {
  yield put(getFavoriteSearchActions.start());

  const userCredentials = yield call(getUserCredentials);
  const internalUserId = yield select(internalUserIdFromState);

  try {
    const favoriteSearches = yield call(getFavoriteSearches, userCredentials, internalUserId);
    yield put(getFavoriteSearchActions.succeed(favoriteSearches));
    yield put(saveToFavoriteSearchesAction(favoriteSearches));
    return favoriteSearches;
  } catch (error) {
    yield put(getFavoriteSearchActions.fail(error.message));
    return null;
  }
}

// Reducer stage //
import lodash from 'lodash';
const getInitialState = () => ([]);

export default actionTypeSet => (state = getInitialState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypeSet.Save:
      return payload;
    case actionTypeSet.Update:
      return [
        ...state,
        ...[payload],
      ];
    default: return state;
  }
};
