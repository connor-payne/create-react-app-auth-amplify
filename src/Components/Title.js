import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const GreyTextTypography = withStyles({
  root: {
    color: "#828282"
  }
})(Typography);

export default function Title(props) {
  return (
    <GreyTextTypography component="h2" variant="h6" gutterBottom>
      {props.children}
    </GreyTextTypography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};