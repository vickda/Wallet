import React, { useState, useMemo } from "react";
import { FaReceipt, FaTrash } from "react-icons/fa6";

import "./Contacts.css";

const Contacts = () => {
  // State for storing contacts
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "234-567-8901",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      phone: "345-678-9012",
    },
    {
      id: 4,
      name: "David Lee",
      email: "david@example.com",
      phone: "456-789-0123",
    },
    {
      id: 5,
      name: "Emma Watson",
      email: "emma@example.com",
      phone: "567-890-1234",
    },
    {
      id: 6,
      name: "Frank Ocean",
      email: "frank@example.com",
      phone: "678-901-2345",
    },
    // Add more contacts as needed
  ]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handler for adding a new friend (to be implemented)
  const handleAddFriend = () => {
    alert("Add friend functionality to be implemented");
  };

  // Memoized sorted and filtered contacts based on search term
  const sortedContacts = useMemo(() => {
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, searchTerm]);

  // Memoized grouped contacts by first letter of name
  const groupedContacts = useMemo(() => {
    const groups = {};
    sortedContacts.forEach((contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
    });
    return groups;
  }, [sortedContacts]);

  return (
    <div className="contacts-container">
      {/* Header section with title, search bar, and add friend button */}
      <div className="contacts-header">
        <h1>My Contacts</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button className="add-friend-btn" onClick={handleAddFriend}>
          Add New Friend
        </button>
      </div>

      {/* Main content area with grouped contacts */}
      <div className="contacts-content">
        {Object.keys(groupedContacts)
          .sort()
          .map((letter) => (
            <div key={letter} className="contact-group">
              <h2 className="group-letter">{letter}</h2>
              <ul className="contact-list">
                {groupedContacts[letter].map((contact) => (
                  <li key={contact.id} className="contact-item">
                    {/* Contact avatar */}
                    <div className="contact-avatar">{contact.name[0]}</div>
                    {/* Contact information */}
                    <div className="contact-info">
                      <h3>{contact.name}</h3>
                      <p>{contact.email}</p>
                      <p>{contact.phone}</p>
                    </div>
                    {/* Contact action buttons */}
                    <div className="contact-actions">
                      <button className="split-bill-btn">
                        <FaReceipt className="button-icon" />
                        Split Bill
                      </button>
                      <button
                        className="delete-contact-btn"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <FaTrash className="button-icon" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export { Contacts };
