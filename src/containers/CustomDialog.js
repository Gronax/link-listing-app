import React, { Component } from 'react';

// Icons
import { Clear } from '@material-ui/icons';

// Material Components
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// Redux Related
import { connect } from 'react-redux';
import { closeDialog } from '../redux/Modules/dialog';

class CustomDialog extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  /**
   * Close Dialog
   */
  handleClose() {
    const { content, label, action } = this.props;
    this.props.closeDialog(content, label, action);
  }

  /**
   * Close Dialog and
   * Handle Button Action
   */
  handleAction() {
    this.handleClose();
    this.props.action();
  }

  render() {
    const { isOpen, content, label } = this.props;
    const buttonStyle = { textTransform: 'none', height: 36, margin: '1rem' };

    return (
      <Dialog open={isOpen} onClose={this.handleClose}>
        <DialogTitle>
          <Clear
            onClick={this.handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          />
        </DialogTitle>

        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center">
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleAction}
            style={buttonStyle}
          >
            {label}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ dialog }) => {
  const { isOpen, content, label, action } = dialog;

  return {
    isOpen,
    content,
    label,
    action,
  };
};

export default connect(mapStateToProps, { closeDialog })(CustomDialog);
