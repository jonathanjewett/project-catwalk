import React from 'react';
import './list-view.scss';

/**
 * Displays elements in a list that expands when the user clicks on a button.
 * @param {Object} props
 * @param {React.ReactChildren} props.children
 * @param {string} props.more - label for the "more" button
 * @param {string} props.add - label for the "+ add" button
 * @param {React.MouseEventHandler=} props.onAdd - onClick for the "+ add" button
 * @param {number} props.start - start with this many elements
 * @param {number=} props.increment - number of elements to add at a time (default: 2)
 */
const ListView = (props) => {
  const [count, setCount] = React.useState(props.start);
  const incr = 'increment' in props ? props.increment : 2;
  const moreButton = count >= props.children.length ? null : (
    <button className="interact more" onClick={() => setCount(i => i + incr)}>
      {props.more}
    </button>
  );
  return (
    <div className="listview">
      <div className="listview-items">
        {props.children.slice(0, count)}
      </div>
      {moreButton}
      <button className="interact add" onClick={props.onAdd}>
        {props.add}
        <span>+</span>
      </button>
    </div>
  );
};

export default ListView;
