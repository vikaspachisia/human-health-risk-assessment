import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormPrompt(props) {
  return (
    <Dialog
      open={props.openDailog}
      TransitionComponent={Transition}
      keepMounted
      // onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div style={{ height: "40px" }} className="container">
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h5 style={{ lineHeight: "30px", fontSize: "15px", fontWeight: "bold" }}>
              {props.title}
            </h5>
            {props.isCloseBtnAppear === true ? (
              <button
                onClick={props.onSetOpenDailog}
                type="button"
                className="btn btn-light"
                style={{ height: "30px", fontSize: "14px", padding: "0px 20px", borderRadius: "20px", }}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            ) : null}
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <div style={{ fontSize: "14px" }}>{props.children}</div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
