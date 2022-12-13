let CONTACTS = [
  {
    id: 3,
  },

  {
    id: 1,
    first: "Nilesh",
    last: "Suthar",
  },
  {
    id: 2,
    first: "Pankaj",
    last: "Suthar",
    favourite: true,
  },
  {
    id: 4,
    first: "C(K)",
    last: "B",
    favourite: true,
  },
].sort((a, b) => a.id - b.id);

if (!window.localStorage.getItem("contacts"))
  window.localStorage.setItem("contacts", JSON.stringify(CONTACTS));
else CONTACTS = [...JSON.parse(window.localStorage.getItem("contacts"))];

function updateLocalStorage() {
  window.localStorage.setItem("contacts", JSON.stringify(CONTACTS));
}

export async function createContact(contactInfo) {
  const newContact = {
    id: CONTACTS.length + 1,
    first: "Sam (Sameer)",
    last: "Suthar",
    favourite: true,
    ...contactInfo,
  };
  CONTACTS.push(newContact);
  updateLocalStorage();
  return newContact;
}
export async function getContacts() {
  return [...CONTACTS];
}
export async function getContact(id) {
  const foundContact = CONTACTS.find((contact) => contact.id === +id);
  return foundContact ?? {};
}
export async function updateContact(id, updateData) {
  const index = CONTACTS.findIndex((contact) => contact.id === +id);
  const foundContact = CONTACTS[index];
  const newContact = { ...foundContact, ...updateData };
  CONTACTS[index] = newContact;
  updateLocalStorage();
}
