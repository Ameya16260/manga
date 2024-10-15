import React, { useEffect } from 'react';
import './BookList.css';

const BookList = ({ books, onSelect, onSelect2, selectedBookId }) => {
    useEffect(() => {
        if (selectedBookId) {
            console.log("Selected book ID:", selectedBookId);
        }
    }, [selectedBookId]);
    return (
        <div className='booklist-main'>
            {books.map((book) => (
                <button
                    className={`booklist-button ${book.id === selectedBookId ? "selected" : ''}`}
                    key={book.id}
                    onClick={() => {
                        onSelect(book.id);
                        onSelect2(book.chapter_ids[0]);
                    }}
                >
                    {book.title}
                </button>
            ))}
        </div>
    );
};

export default BookList;
