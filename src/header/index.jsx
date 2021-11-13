import React from 'react';
import Favicon from '../favicon.svg';
import './Header.scss';
import { Price } from '../common';

/**
 * @param {Object} props
 * @param {string=} props.announcement
 * @param {{id: number, name: string, base: string, sale: string}} props.discount
 * @param {{id: number, message: string}} props.newProduct
 */
const Header = ({ announcement, discount, newProduct }) => {
  const elements = [];
  if (announcement) {
    elements.push(<em key="announcement">{announcement}</em>);
    elements.push(' — ');
  }
  if (discount) {
    elements.push(
      <span key="discount">
        <a href={`/${discount.id}`}>{discount.name}</a>:
        <Price base={discount.base} sale={discount.sale}/>
      </span>
    );
    elements.push(' — ');
  }
  if (newProduct) {
    elements.push(
      <a href={`/${newProduct.id}`} key="new">
        {newProduct.message}
      </a>
    );
    elements.push(' — ');
  }
  elements.pop();
  return (
    <header>
      <div className="branding">
        <div>
          <Favicon/>
          <h1>Project Catwalk</h1>
        </div>
      </div>
      <div className="highlights">
        {elements}
      </div>
    </header>
  );
};

export default Header;
