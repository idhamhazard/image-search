import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState([]);
  const [searchImage, setSearchImage] = useState("")
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/search/photos?page=1&query=${search}&client_id=${apiKey}`);
      setQuery(response.data.results);
      setSearchImage(search)
      setSearch("")
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="bg-primary h-44 flex items-center">
        <div className="container">
          <div className="flex justify-center mb-2">
            <h1 className="text-white">Image Search</h1>
          </div>
          <div className="flex justify-center">
            <form action="" className="max-w-md w-full relative" onSubmit={handleSubmit}>
              <input type="text" placeholder="Search Image..." className="w-full py-2 px-4 rounded-md text-sm focus:outline-none border-2 focus:border-blue-500" onChange={(e) => setSearch(e.target.value)} value={search} />
              <button className="absolute top-2 end-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="max-w-6xl w-full mx-auto mt-4">
        <p className="underline">Results for {searchImage}</p>
        {loading ? <p className="font-medium text-2xl">Loading...</p> : null}
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-2">
          {query.map((e) => {
            return (
              <a href={e.urls.regular} target="_blank" key={e.id}>
                <img className="h-72 w-full object-cover rounded-lg shadow-md" src={e.urls.small} alt="" />
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;
