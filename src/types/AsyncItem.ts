interface AsyncItem<T> {
  loading: boolean,
  item: T,
  error: Error,
}