import styled from "styled-components";
import { formatCurrency } from '../../utils/helpers'
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDelete } from "./useDelete";
import { FaCopy } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  padding: 5px;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;


const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin, selectedIds, setSelectedIds }) => {
    const [onEdit, setOnEdit] = useState(false);
    const { name, maxCapacity, regularPrice, discount, description, image, id } = cabin;
    const { isLoading, mutate } = useDelete();
    const { isCreating, mutate: copyCabin } = useCreateCabin();

    const handleDuplicate = () => {
        copyCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            description,
            image
        })
    }

    const handleCheckbox = (e) => {
        const checked = e.target.checked;

        if (checked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
        } else {
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((selectedId) => selectedId !== id)
            );
        }
    };

    const isChecked = selectedIds.includes(id);

    return (
        <>
            <Table.Row>
                <div><input type="checkbox" checked={isChecked} onChange={handleCheckbox} /></div>
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>{maxCapacity}</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                <Discount>{formatCurrency(discount)}</Discount>
                <div>
                    <button disabled={isCreating} onClick={handleDuplicate}><FaCopy /></button>
                    <Modal>
                        <Modal.Open opens="edit">
                            <button ><FaEdit /></button>
                        </Modal.Open>
                        <Modal.Window name="edit">
                            <CreateCabinForm cabinEdit={cabin} />
                        </Modal.Window>
                        <Modal.Open opens="delete">
                            <button><MdDelete /></button>
                        </Modal.Open>
                        <Modal.Window name="delete">
                            <ConfirmDelete onConfirm={() => mutate(id)} resourceName="cabins" />
                        </Modal.Window>
                    </Modal>

                    <Menus.Menu>
                        <Menus.Toggle id={id} />
                        <Menus.List id={id}>
                            <Menus.Button icon={<FaCopy />} onClick={handleDuplicate}>Duplicate</Menus.Button>
                            <Menus.Button icon={<FaCopy />}>Edit</Menus.Button>
                            <Menus.Button icon={<FaCopy />}>Delete</Menus.Button>
                        </Menus.List>
                    </Menus.Menu>
                </div>
            </Table.Row>

        </>
    );
}

export default CabinRow;