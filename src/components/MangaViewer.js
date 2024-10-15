import React, { useState, useEffect } from 'react';
import './Manga.css';
const MangaViewer = ({ chapter, chapterid, books, book, onSelect, onSelect2 }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [goingToPreviousChapter, setGoingToPreviousChapter] = useState(false);

    useEffect(() => {
        if (chapter && chapter.pages) {
            if (goingToPreviousChapter) {
                setCurrentPage(chapter.pages.length - 1);
                setGoingToPreviousChapter(false);
            } else {
                setCurrentPage(0);
            }
        }
    }, [chapter]);

    const goToNextPage = () => {
        if (chapter && currentPage < chapter.pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else if (books[book - 1].chapter_ids.at(-1) > chapterid) {
            onSelect(chapterid + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else if (books[book - 1].chapter_ids.at(0) < chapterid) {
            setGoingToPreviousChapter(true);
            onSelect(chapterid - 1);
        }
    };

    const handleImageClick = (e) => {
        const imageWidth = e.target.offsetWidth;
        const clickX = e.nativeEvent.offsetX;

        if (clickX < imageWidth / 2) {
            goToNextPage();
        } else {
            goToPreviousPage();
        }
    };

    if (!chapter || !chapter.pages || chapter.pages.length === 0) {
        return <div>Loading chapter...</div>;
    }

    return (<div>

        <div className='manga-main'>
            <img
                src={chapter.pages[currentPage]?.image?.file}
                alt={`Page ${currentPage + 1}`}
                onClick={handleImageClick}
                style={{ cursor: 'pointer', width: '100%', height: '80vh' }}
            />

        </div>
        <div className='page'>{currentPage + 1}/{chapter.pages.length}</div>
    </div>
    );
};

export default MangaViewer;
