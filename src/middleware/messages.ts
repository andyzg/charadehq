export default store => next => action => {
  try {
    console.log('message');
    next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}
