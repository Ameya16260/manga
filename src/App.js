import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import ChapterList from './components/ChapterList';
import MangaViewer from './components/MangaViewer';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://52.195.171.228:8080/books/');
        const booksData = response.data;
        setBooks(booksData);

        if (booksData.length > 0) {
          const firstBook = booksData[0];
          setSelectedBookId(firstBook.id);

          if (firstBook.chapter_ids && firstBook.chapter_ids.length > 0) {
            setSelectedChapterId(firstBook.chapter_ids[0]);
          } else {
            console.warn('No chapters found for the first book');
            setSelectedChapterId(null);
          }
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);


  useEffect(() => {
    const fetchChapter = async () => {
      if (selectedChapterId) {
        try {
          const response = await axios.get(`http://52.195.171.228:8080/chapters/${selectedChapterId}/`);
          setSelectedChapter(response.data);
        } catch (error) {
          console.error('Error fetching chapter:', error);
          setSelectedChapter(null);
        }
      }
    };
    fetchChapter();
  }, [selectedChapterId]);

  return (
    <div className="main">

      <div>
        <BookList books={books} onSelect={setSelectedBookId} onSelect2={setSelectedChapterId} selectedBookId={selectedBookId} />

        {selectedBookId && (
          <ChapterList books={books} selectedBookId={selectedBookId} onSelect={setSelectedChapterId} selectedChapterId={selectedChapterId} />
        )}

        {selectedChapter ? (
          <MangaViewer
            chapter={selectedChapter}
            chapterid={selectedChapterId}
            books={books}
            book={selectedBookId}
            onSelect={setSelectedChapterId}
            onSelect2={setSelectedBookId}
          />
        ) : (
          selectedChapterId && <div>Loading chapter...</div>
        )}
      </div>
    </div>
  );
};

export default App;
