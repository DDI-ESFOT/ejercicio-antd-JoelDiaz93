import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Modal, Descriptions, Rate } from "antd";

export default function Movie({ list }) {
  const { Meta } = Card;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [omdbId, setOmdbId] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (omdbId) {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${omdbId}`
        );
        const data = await response.json();
        console.log("data", data);
        setCurrentMovie(data);
      }
    };

    getData();
  }, [omdbId]);

  const handleExit = () => {
    setIsModalVisible(false);
  };

  const handleViewMore = (movieId) => {
    console.log("movieId", movieId);
    setOmdbId(movieId);
    setIsModalVisible(true);
  };

  return (
    <>
      <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {list.map((movie) => (
          <Col span={6} className="gutter-row">
            <Card
              style={{ width: 220 }}
              cover={<img alt="Not Found Image" src={movie.Poster} />}
              actions={[
                <Button
                  type="link"
                  onClick={() => handleViewMore(movie.imdbID)}
                >
                  Ver más
                </Button>,
              ]}
            >
              <Card.Meta title={movie.Title} description={movie.Year} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Detalles de la película"
        visible={isModalVisible}
        footer={[
          <Button key="close" type="primary" onClick={handleExit}>
            Cerrar
          </Button>,
        ]}
      >
        {currentMovie && (
          <Descriptions bordered>
            <Descriptions.Item label="Título" span={3}>
              {currentMovie.Title}
            </Descriptions.Item>
            <Descriptions.Item label="Year" span={3}>
              {currentMovie.Year}
            </Descriptions.Item>
            <Descriptions.Item label="Released" span={3}>
              {currentMovie.Released}
            </Descriptions.Item>
            <Descriptions.Item label="Genre" span={3}>
              {currentMovie.Genre}
            </Descriptions.Item>
            <Descriptions.Item label="Rate" span={3}>
              <Rate allowHalf defaultValue={(currentMovie.imdbRating)/2} />
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}
