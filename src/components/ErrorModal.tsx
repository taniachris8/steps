import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css"

type ErrorModalProps = {
  show: boolean;
  onClose: () => void;
  message?: string;
};

function ErrorModal({
  show,
  onClose
}: ErrorModalProps) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Body>
        <p>Введите расстояние в формате X.Y, например: 1.0</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
