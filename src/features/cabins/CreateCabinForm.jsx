import { useForm } from 'react-hook-form'
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinEdit;
  const isEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEdit ? editValues : {} });
  const { errors } = formState;

  const { isCreating, mutate } = useCreateCabin();
  const { editCabin, isLoading } = useEditCabin();


  const isWorking = isCreating || isLoading;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEdit) {
      editCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset();
          onClose?.();
        }
      });
    } else {
      mutate({ ...data, image }, {
        onSuccess: () => {
          reset();
          onClose?.();
        }
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose ? 'modal' : 'regular'}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input type="text" id="name" defaultValue="" disabled={isWorking} {...register("name", { required: "Please enter name" })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" defaultValue={0} disabled={isWorking}
          {...register("maxCapacity",
            {
              required: "Please enter name",
              min: {
                value: 1,
                message: "Capacity should be at least 1"
              }

            })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input type="number" id="regularPrice" defaultValue={0} disabled={isWorking} {...register("regularPrice", {
          required: "Please enter name",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isWorking}  {...register("discount", {
          required: "Please enter name",
          validate: (value) => value < Number(getValues().regularPrice) || 'Discount should be less than regular price'
        })} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking}
          {...register("description", { required: "Please enter description" })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" type="file"  {...register("image", { required: isEdit ? false : "Please select image" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variations="secondary" size="medium" type="reset" disabled={isWorking} onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button variations="primary" size="medium" disabled={isWorking}>{isEdit ? "Edit Cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form >
  );
}

export default CreateCabinForm;
