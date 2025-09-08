import { AppError } from "../errors/app.error";
import { Contact } from "../models/contact.model";
import { filterUpdateBody } from "../utils/filterUpdateBody";
import { addContactDto } from "../zod/add-contact.schema";
import { updateContactDto } from "../zod/update-contact.schema";

const deleteContact = async (contactId: string) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new AppError(`No contact with id : ${contactId} found.`, 404);
  }

  return contact;
};

const updateContact = async (
  contactId: string,
  updateContactDto: updateContactDto,
) => {
  const filteredDto = filterUpdateBody(updateContactDto);
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: filteredDto,
    },
    {
      new: true, // to get updated model after update operation
    },
  ).select({
    _id: 1,
    name: 1,
    email: 1,
    type: 1,
    address: 1,
    businessId: 1,
  });

  if (!updatedContact) {
    throw new AppError(`No contact with id : ${contactId} found.`, 404);
  }

  return updatedContact;
};

const addContact = async (addContactDto: addContactDto) => {
  const existingContact = await Contact.findOne({
    email: addContactDto.email,
  });

  if (existingContact) {
    throw new AppError("Contact with this email already exists.", 409);
  }

  const newContact = await Contact.create({
    email: addContactDto.email,
    name: addContactDto.name,
    businessId: addContactDto.businessId,
    address: addContactDto.address,
    type: addContactDto.type,
  });

  return newContact;
};

const getAllContacts = async (businessId: string, search: string) => {
  const contacts = await Contact.find({
    businessId: businessId,
    name: { $regex: search, $options: "i" },
  })
    .select({
      _id: 1,
      name: 1,
      email: 1,
      type: 1,
      address: 1,
      businessId: 1,
    })
    .exec();

  return contacts;
};
export { updateContact, deleteContact, getAllContacts, addContact };
