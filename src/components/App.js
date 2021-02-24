import React, { useState, useEffect } from "react";
import "../styles/App.css";
import { Input, Space, Row, Col, Modal } from "antd";
import Movie from "./Movie";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [title, setTitle] = useState(null);
  const { Search } = Input;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${title}`
      );
      const data = await response.json();
      console.log("NewTitles", data.Search);
      setMovieList(data.Search);
    };

    getData();
  }, [title]);

  const onSearch = (value) => setTitle(value);

  return (
    <>
      <Space direction="vertical">
        <Row justify="center">
          <Col span={12}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </Col>
        </Row>
        <Space>
          {title !== null ? (
            <Movie list={movieList} />
          ) : (
            <h1>NO HAY RESULTADOS</h1>
          )}
        </Space>
      </Space>
    </>
  );
}

export default App;
