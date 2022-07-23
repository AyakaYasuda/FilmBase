import ReactDom from 'react-dom';
import classes from './Modal.module.scss';

const Backdrop = ({ onCloseModal }) => {
  return <div className={classes.backdrop} onClick={onCloseModal} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalEl = document.getElementById('overlays');

const Modal = ({ onCloseModal, children }) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onCloseModal={onCloseModal} />,
        portalEl
      )}
      {ReactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalEl)}
    </>
  );
};

export default Modal;
