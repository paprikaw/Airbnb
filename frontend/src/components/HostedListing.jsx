import * as React from 'react';
import PropTypes from 'prop-types';

export default function HostedListing (props) {
  return (
      <div>
          {props.children}
      </div>
  );
}

HostedListing.propTypes = {
  children: PropTypes.element
};
