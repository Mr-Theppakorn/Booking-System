import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateBooking from './CreateBooking'
export default function AddBooking() {


    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button variations="primary" size="medium">Add new booking</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateBooking />
            </Modal.Window>
        </Modal>
    )
}