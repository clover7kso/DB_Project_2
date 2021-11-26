import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div>
      <ul className="nav-links">
        <Link to="/Hospital">
          <li>Hospital</li>
        </Link>
        <Link to="/Statistic">
          <li>Statistic</li>
        </Link>
      </ul>
    </div>
  );
}
