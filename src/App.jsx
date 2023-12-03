import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([]);
  const [searchImage, setSearchImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalImages, setTotalImages] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const allPages = 20;

  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const resetPage = () => {
    setPage(1);
    fetchData();
  };

  const handlePrevPage = () => {
    setPage((state) => state - 1);
    scrollTop();
  };

  const handleNextPage = () => {
    setPage((state) => state + 1);
    scrollTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return null;
    resetPage();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/search/photos?&query=${search}&page=${page}&per_page=${allPages}&client_id=${apiKey}`);
      setQuery(response.data.results);
      setTotalImages(response.data.total);
      setTotalPages(response.data.total_pages);
      setSearchImage(search);
    } catch (err) {
      setError(err.message + ". Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <header className="bg-primary h-44 flex items-center">
        <div className="container">
          <div className="flex justify-center mb-2">
            <h1 className="text-white">The Powerful Search engine</h1>
          </div>
          <div className="flex justify-center">
            <form action="" className="max-w-lg w-full relative" onSubmit={handleSubmit}>
              <input type="text" placeholder="Search Image..." className="w-full py-2 px-4 rounded-md text-sm focus:outline-none border-2 focus:border-blue-500" onChange={(e) => setSearch(e.target.value)} />
              <button className="absolute top-2 end-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-label="icon search">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto mt-4">
        <div className="container">
          <div>
            <p className="text-lg">
              Showing results for <span className="text-blue-600">{searchImage}</span>{" "}
            </p>
            <p className="font-medium text-sm text-slate-500">Total {totalImages} Images have been found </p>
          </div>

          {loading ? <p className="font-medium">Loading...</p> : null}
          {error ? <h2 className="text-red-600 text-lg">{error}</h2> : null}

          <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-2">
            {query.map((e) => {
              return (
                <a href={e.urls.regular} target="_blank" key={e.id}>
                  <img className="h-52 w-full object-cover shadow-md" src={e.urls.small} alt="image" />
                </a>
              );
            })}
          </div>
          <div className="flex justify-center items-center mt-4 gap-4 py-4">
            {page > 1 && (
              <button className="bg-primary py-2 px-4 text-white rounded-lg" onClick={handlePrevPage}>
                {" "}
                Prev Page
              </button>
            )}

            {(page > 1) & (page <= totalPages) ? (
              <p className="text-sm font-medium">
                Page {page} of {totalPages}
              </p>
            ) : null}

            {page < totalPages && (
              <button className="bg-primary py-2 px-4 text-white rounded-lg" onClick={handleNextPage}>
                Next Page
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
