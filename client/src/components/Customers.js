import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../css/customers.css";
import Item from "./Item.js";

function Customer({ customer, onDelete, onReturnRental, onEditCustomer }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [rentalId, setRentalId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible);

  const handleReturnRental = () => {
    if (rentalId) {
      onReturnRental(customer.customer_id, rentalId);
      setRentalId(""); // Clear rental ID input after returning
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    await onEditCustomer(editedCustomer);
    setIsEditing(false); // After saving, exit edit mode
  };

  return (
    <div className="customer-item">
      <h3 onClick={toggleDetails}>
        {customer.customer_id}. {customer.first_name} {customer.last_name}, {customer.email}
      </h3>

      {isDetailsVisible && (
        <div className="customer-details">
          {isEditing ? (
            <div className="edit-form">
              <h4>Edit Customer:</h4>
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={editedCustomer.first_name}
                onChange={handleEditChange}
              />
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={editedCustomer.last_name}
                onChange={handleEditChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedCustomer.email}
                onChange={handleEditChange}
              />
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={handleEditToggle}>Cancel</button>
            </div>
          ) : (
            <>
              {customer.rentals && customer.rentals.length > 0 ? (
                <div className="rentals">
                  <h4>Rentals:</h4>
                  <ul>
                    {customer.rentals.map((rental) => (
                      <li key={rental.rental_id}>
                        {rental.rental_id}: {rental.movie_title} (Rented on {rental.rental_date})
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No rentals found for this customer.</p>
              )}

              <div className="return-rental">
                <input
                  type="text"
                  placeholder="Enter Rental ID"
                  value={rentalId}
                  onChange={(e) => setRentalId(e.target.value)}
                />
                <button onClick={handleReturnRental}>Return Rental</button>
              </div>
              <button onClick={() => onDelete(customer.customer_id)}>Delete Customer</button>
              <button onClick={handleEditToggle}>Edit Customer</button>
              <button onClick={toggleDetails}>Cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("customer_id");
  const [addingUser, setAddingUser] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  const itemsPerPage = 10;

  // Fetch customers and their rentals when the component is mounted
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/customers");
        if (response.ok) {
          const data = await response.json();
          // Assuming your API returns customer data without rentals, you can fetch rentals separately
          const customersWithRentals = await Promise.all(
            data.map(async (customer) => {
              const rentalResponse = await fetch(`http://localhost:5000/customers/${customer.customer_id}/rentals`);
              if (rentalResponse.ok) {
                const rentals = await rentalResponse.json();
                return { ...customer, rentals };
              }
              return customer; // If rentals are not found, just return customer without rentals
            })
          );
          setCustomers(customersWithRentals);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(customers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(customers.length / itemsPerPage));
  }, [itemOffset, customers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customers.length;
    setItemOffset(newOffset);
  };

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();

    const searchData = new URLSearchParams({
      query: searchQuery,
      type: searchType.toLowerCase() === "customer id" ? "customer_id" : "name",
    }).toString();

    try {
      const response = await fetch(`http://localhost:5000/customers?${searchData}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        console.error("Failed to fetch search results");
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setCustomers([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email } = newCustomer;

    if (first_name && last_name && email) {
      try {
        const response = await fetch("http://localhost:5000/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCustomer),
        });

        if (response.ok) {
          const addedCustomer = await response.json();
          setCustomers([...customers, addedCustomer]);
          setAddingUser(false); // Hide the form after successful submission
          setNewCustomer({ first_name: '', last_name: '', email: '' }); // Reset form fields
        } else {
          console.error("Failed to add customer");
        }
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    } else {
      console.error("Please fill in all fields");
    }
  };

  const handleCancelAdd = () => {
    setAddingUser(false);
    setNewCustomer({ first_name: '', last_name: '', email: '' });
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/customers/${customerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.customer_id !== customerId));
      } else {
        console.error("Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleReturnRental = async (customerId, rentalId) => {
    try {
      const response = await fetch(`http://localhost:5000/customers/${customerId}/rentals/${rentalId}/return`, {
        method: "PUT",
      });

      if (response.ok) {
        console.log(`Rental ${rentalId} returned successfully.`);
      } else {
        console.error("Failed to return rental");
      }
    } catch (error) {
      console.error("Error returning rental:", error);
    }
  };

  const handleEditCustomer = async (editedCustomer) => {
    try {
      const response = await fetch(`http://localhost:5000/customers/${editedCustomer.customer_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedCustomer),
      });

      if (response.ok) {
        const updatedCustomer = await response.json();
        setCustomers(customers.map((customer) => 
          customer.customer_id === updatedCustomer.customer_id ? updatedCustomer : customer
        ));
        console.log("Customer updated successfully.");
      } else {
        console.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <div id="container" className="customers-container">
      <div className="customer_search" style={{ display: "inline-flex" }}>
        <h1>Search customers:</h1>
        <form className="example" onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">?</button>
        </form>
      </div>

      <div className="searchBy" style={{ display: "inline-flex" }}>
        <p>Search By</p>
        <select
          name="customer_search"
          id="customer_search"
          value={searchType}
          onChange={handleSelectChange}
        >
          <option value="Name">First/Last Name</option>
          <option value="Customer ID">Customer ID</option>
        </select>
      </div>

      <button onClick={() => setAddingUser(true)}>Add a User</button>

      {addingUser && (
        <form onSubmit={handleAddCustomer}>
          <h3>Add New Customer</h3>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={newCustomer.first_name}
            onChange={handleNewCustomerChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={newCustomer.last_name}
            onChange={handleNewCustomerChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newCustomer.email}
            onChange={handleNewCustomerChange}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancelAdd}>
            Cancel
          </button>
        </form>
      )}

      <div className="customer-list">
        {currentItems.map((customer, index) => (
          <Customer
            key={index}
            customer={customer}
            onDelete={handleDeleteCustomer}
            onReturnRental={handleReturnRental}
            onEditCustomer={handleEditCustomer}
          />
        ))}
      </div>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

export default Customers;
