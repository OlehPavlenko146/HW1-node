const contactsActions = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await contactsActions.listContacts());
      break;

    case "get":
      const contact = await contactsActions.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id = ${id} is not exist`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsActions.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contactsActions.removeContact(id);
      if (!removedContact) {
        throw new Error(`Contact with id = ${id} is not exist`);
      }
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
