import React, { useEffect, useState } from "react";

function Images() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(function () {
    //API CALLs
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((resp) => resp.json())
      .then((response) => {
        setLoading(false);
        setPhotos(response);
        setFilteredPhotos(response);
        //console.log("Response is", response);
      });
  }, []);

  useEffect(() => {
    if (searchValue) {
      const matchingPhotos = photos.filter((photo) => {
        return photo.title.includes(searchValue);
      });
      setFilteredPhotos(matchingPhotos);
    } else {
      setFilteredPhotos(photos);
    }
  }, [searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {" "}
      <input
        placeholder="Search Product"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {filteredPhotos.map((photo) => {
        return (
          <div key={photo.id}>
            <img src={photo.url} style={{ height: 100, width: 100 }} />
            <p>{photo.title}</p>
          </div>
        );
      })}
    </>
  );
}

export default Images;
