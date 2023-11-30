import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function extractBookIdFromUrl(url) {
  const urlSegments = url.split("/");
  return urlSegments[urlSegments.length - 1];
}
function formatDate(releasedDate) {
  const date = new Date(releasedDate);
  return date.toDateString();
}
function App() {
  const [books, setBooks] = useState([]);
  const apiURL = "https://www.anapioficeandfire.com/api/books?pageSize=30";
  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data.", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [apiURL]);

  return (
    <div className="App">
      <h1>Game of Thrones Kitapları</h1>
      <h2>API'den liste alın ve görüntüleyin</h2>

      {/* Fetch data  API */}
      <div>
        <button className="fetch-button" onClick={() => fetchData()}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* API'den gelen veriyi gösterin */}

      {/* Her kitap için aşağıdaki JSX'i kullanın*/}
      <div className="books">
        {books.map((book) => {
          const bookId = extractBookIdFromUrl(book.url);
          return (
            <div className="book" key={bookId}>
              <h3>Book Number: {bookId}</h3>
              <h2>{book.name}</h2>

              <div className="details">
                <p>👨: {book.authors.join(", ")}</p>
                <p>📖: {book.numberOfPages}</p>
                <p>🏘️: {book.country}</p>
                <p>⏰: {formatDate(book.released)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
