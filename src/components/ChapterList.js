import React from 'react';
import './ChapterList.css';

const ChapterList = ({ books, selectedBookId, selectedChapterId, onSelect }) => {
    const selectedBook = books.find(book => book.id === selectedBookId);

    if (!selectedBook) {
        return <p>Please select a book to see its chapters.</p>;
    }

    return (
        <div className='chapter-main'>
            {selectedBook.chapter_ids.map((chapterId, index) => (
                <button
                    className={`chapter-button ${chapterId === selectedChapterId ? 'selected' : ''}`}
                    key={chapterId}
                    onClick={() => onSelect(chapterId)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default ChapterList;
