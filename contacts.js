const fs = require("fs").promises;

const path = require("path");

const uniqid = require("uniqid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contents = await fs.readFile(contactsPath, { encoding: "utf8" });
    return JSON.parse(contents);
    } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result;
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const removedContact = contacts.filter(
      (contact) => contact.id === contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return removedContact[0];
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: uniqid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
