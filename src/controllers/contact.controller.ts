import { Request, Response, NextFunction } from "express";
import {
  addContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "../services/contact.service";

const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteContact(id);
    res.json({
      success: true,
      message: "Contact deleted successfully",
      contactId: id,
    });
  } catch (err) {
    next(err);
  }
};

const GetAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await getAllContacts(req.businessId ?? "");
    res.json({
      success: true,
      users: contacts,
    });
  } catch (err) {
    next(err);
  }
};

const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);

    res.json({
      success: true,
      message: "Contact updated successfully.",
      contact: {
        updatedContact,
      },
    });
  } catch (err) {
    next(err);
  }
};

const Add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newContact = await addContact(req.body);

    res.status(201).json({
      success: true,
      message: "Contact added successfully.",
      id: newContact._id,
      email: newContact.email,
      name: newContact.name,
    });
  } catch (err) {
    next(err);
  }
};

export { Add, Update, Delete, GetAll };
