import React, { useState, useMemo } from "react";
import { FaReceipt, FaTrash } from "react-icons/fa6";
import "./Contacts.css";

const Contacts = () => {
  // State management
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
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchType, setSearchType] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");

  // Memoized computations
  const sortedContacts = useMemo(() => {
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [contacts, searchTerm]);

  const groupedContacts = useMemo(() => {
    const groups = {};
    sortedContacts.forEach((contact) => {
      const firstLetter = contact.name[0].toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(contact);
    });
    return groups;
  }, [sortedContacts]);

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFriend = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchValue("");
    setSearchError("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() === "") {
      setSearchError(`Please enter a valid ${searchType}`);
    } else {
      setSearchError(`No user found with this ${searchType}`);
    }
  };

  const handleDeleteContact = (contactId) => {
    // Implement delete functionality here
    console.log(`Delete contact with id: ${contactId}`);
  };

  // Render helpers
  const renderContactGroup = (letter) => (
    <div key={letter} className="contact-group">
      <h2 className="group-letter">{letter}</h2>
      <ul className="contact-list">
        {groupedContacts[letter].map(renderContactItem)}
      </ul>
    </div>
  );

  const renderContactItem = (contact) => (
    <li key={contact.id} className="contact-item">
      <div className="contact-avatar">{contact.name[0]}</div>
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
      </div>
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
  );

  // Modal Code For Adding Friend
  const renderModal = () => (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Friend</h2>
        <form onSubmit={handleSearch}>
          <div className="search-type">
            <label>
              <input
                type="radio"
                value="email"
                checked={searchType === "email"}
                onChange={() => setSearchType("email")}
              />
              Email
            </label>
            <label>
              <input
                type="radio"
                value="phone"
                checked={searchType === "phone"}
                onChange={() => setSearchType("phone")}
              />
              Phone
            </label>
          </div>
          <input
            type={searchType === "email" ? "email" : "tel"}
            placeholder={`Enter ${searchType}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          {searchError && <p className="error-message">{searchError}</p>}
          <div className="modal-actions">
            <button type="submit" className="search-btn">
              Search
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h1>My Contacts</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-friend-btn" onClick={handleAddFriend}>
          Add New Friend
        </button>
      </div>

      <div className="contacts-content">
        {Object.keys(groupedContacts).sort().map(renderContactGroup)}
      </div>

      {isModalOpen && renderModal()}
    </div>
  );
};

export { Contacts };
