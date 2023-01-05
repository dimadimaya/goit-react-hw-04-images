import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import styles from './App.module.css';
import { fetchImages } from '../services/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    fetchImages(query, page)
      .then(items => {
        if (items.hits.length === 0) {
          setShowButton(false);
          return toast.error('There are no images for your request');
        }
        setItems(prevItems => [...prevItems, ...items.hits]);
        setShowButton(page < Math.ceil(items.total / 12) ? true : false);
        setLoading(false);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setItems([]);
    setShowButton(false);
    setShowModal(false);
    setLargeImageURL('');
    setLoading(false);
  };

  const toggleModal = () => setShowModal(showModal => !showModal);

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const getImageUrl = url => {
    console.log(url);
    setLargeImageURL(url);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        items={items}
        getImageUrl={getImageUrl}
        toggleModal={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
      {loading && <Loader />}
      {showButton && <Button loadMore={loadMore} />}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
