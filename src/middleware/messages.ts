export default store => next => action => {
  try {
    console.log('message', action);
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
