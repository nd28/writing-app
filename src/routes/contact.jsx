import { useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";
import { getContact } from "../contacts";

const AVATAR_URL = "https://placekitten.com/g/200/200";

export async function loader({ params }) {
  // console.log(params);
  const contact = await getContact(params.contactId);
  return contact;
}

// const contact = {
//   first: "Your",
//   last: "Name",
//   avatar: AVATAR_URL,
//   twitter: "DavidNilesh28",
//   notes: "Some Notes",
//   favourite: true,
// };

export default function Contacts() {
  const contact = useLoaderData();
  if (contact === undefined) {
    return <p>Error Occured</p>;
  }
  return (
    <div id="contact">
      <div>
        <img src={contact.avatar || null} alt={contact.twitter} />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favourite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              href={`http://twitter.com/${contact.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confrim you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favourite = ({ contact }) => (
  <Form method="post">
    <button
      value={!contact.favorite}
      name="favourite"
      aria-label={
        contact.favorite ? "Remove from favourite" : "Add to favourite"
      }
    >
      {contact.favorite ? "★" : "☆"}
    </button>
  </Form>
);
