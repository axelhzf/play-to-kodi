import * as React from 'react';
import Loading from "./Loading";
import * as R from 'ramda';

interface AsyncItemPlaceholderProps {
  item: AsyncItem<any>,
  loaded: (value: any) => JSX.Element,
}

export default class AsyncItemPlaceholder extends React.Component<AsyncItemPlaceholderProps, null> {

  render() {
    const { item, loaded } = this.props;
    if (!item) return null;
    if (item.loading) return <Loading />;
    if (!item.item) return <h1>Not found</h1>;
    if (R.isArrayLike(item.item) && item.item.length === 0) return <h1>Empty</h1>;
    return loaded(item.item);
  }

}