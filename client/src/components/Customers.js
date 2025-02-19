import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "../css/customers.css";

function Customer({ customer }) {
  return (
    <div className="customer-item">
      <h3>{customer.first_name} {customer.last_name}</h3>
    </div>
  );
}

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5000/customers");
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
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

  return (
    <div id="container" className="customers-container">
      <h1>Customer List</h1>
      <div className="customer-list">
        {currentItems.map((customer, index) => (
          <Customer key={index} customer={customer} />
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