import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";


export default function AddCabin() {
    const [showForm, setShowForm] = useState(false);
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button variations="primary" size="medium">Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    )
}

/*export default function AddCabin() {
    const [showForm, setShowForm] = useState(false);
    return (
        <div>
            <Button variations="primary" size="medium" onClick={() => setShowForm((show) => !show)}>Add New Cabin</Button>
            {showForm && <Modal onClose={() => setShowForm(false)}><CreateCabinForm onClose={() => setShowForm(false)} /></Modal>}
        </div>
    )
}*/
