import * as R from "ramda";

export const fetchSelector(path: string[], entity: string) {
  return (state) => {
    const items = R.path(R.concat(path, ['items']))(state) || [];
    return (
      R.merge(
        R.path(path, state),
        { items: R.map(id => state.entities[entity][id], items) }
      )
    )
  }
}