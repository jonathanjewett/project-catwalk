import React from 'react';
import Search from './Search';
import './list-view.scss';

/**
 * Recursively searches inside an object for a string.
 * @param {string} needle
 * @param {any} hay
 * @returns {boolean}
 */
const recursiveFind = (needle, hay) =>
  typeof hay === 'string' && hay.indexOf(needle) !== -1 ||
  typeof hay === 'object' && hay !== null &&
    Object.values(hay).some(value => recursiveFind(needle, value));

/** Generates an ID from text. */
const genID = (text) => text.replace(/\s+/g, '-').toLowerCase();

/**
 * Displays elements in a list that expands when the user clicks on a button.
 * @param {Object} props
 * @param {React.ReactChildren} props.children
 * @param {string} props.more - label for the "more" button
 * @param {string} props.add - label for the "+ add" button
 * @param {React.MouseEventHandler=} props.onAdd - onClick for the "+ add" button
 * @param {number} props.start - start with this many elements
 * @param {string=} placeholder - placeholder for search bar
 * @param {number=} props.increment - number of elements to add at a time (default: 2)
 */
const ListView = (props) => {
  const [count, setCount] = React.useState(props.start);
  const [search, setSearch] = React.useState('');
  let children = props.children;
  if (search.length >= 3) {
    children = children.filter(child => recursiveFind(search, child.props));
  }
  const itemsRef = React.createRef();
  React.useEffect(() => {
    if (count !== props.start && itemsRef.current) {
      itemsRef.current.scrollTop = itemsRef.current.scrollHeight;
    }
  }, [count]);
  const incr = 'increment' in props ? props.increment : 2;
  const moreButton = count >= props.children.length ? null : (
    <button
      id={genID(props.more)}
      className="interact more"
      onClick={() => setCount(i => i + incr)}
    >
      {props.more}
    </button>
  );
  if (count < children.length) {
    children = children.slice(0, count);
  }
  return (
    <div className="listview">
      <Search value={search} set={setSearch} placeholder={props.placeholder}/>
      <div className="listview-items" ref={itemsRef}>
        {children}
      </div>
      {moreButton}
      <button
        id={genID(props.add)}
        className="interact add"
        onClick={props.onAdd}
      >
        {props.add}
        <span>+</span>
      </button>
    </div>
  );
};

export default ListView;
