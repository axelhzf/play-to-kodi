import * as R from "ramda";

export const fetchSelector(path: string[], entity: string) {
  return (state) => {
    const item = R.path(R.concat(path, ['item']))(state) || [];
    return (
      R.merge(
        R.path(path, state),
        { item: R.map(id => state.entities[entity][id], item) }
      )
    )
  }
}