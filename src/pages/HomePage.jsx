import { useState, useEffect } from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import HeroSection from "../components/HeroSection";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { getMovieInfo } from "../service/movieInfo";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getMovieDetail, getTMDBDetails } from "../redux/action/moviesAction";
import { useDispatch } from "react-redux";
import { getTMDBdetail } from "../service/TMDBservice";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  cssEase: "ease-in-out",
};

function HomePage() {
  const dispatch = useDispatch();
  const { allMoviesData } = useSelector((state) => state.moviesReducer) || [];
  const { moviesCategories } =
    useSelector((state) => state.moviesReducer) || [];
  const [recentlyAddedMovies, setRecentlyAddedMovies] = useState([]);

  const [isBackdropLoading, setIsBackDropLoading] = useState(false);
  const navigate = useNavigate();

  const getMovieDetailHandler = async (movie) => {
    try {
      setIsBackDropLoading(true);
      const getMovieDetails = await getMovieInfo(movie.stream_id);
      if (getMovieDetails.status !== 200) return;
      const tmdbResp = await getTMDBdetail(movie.tmdb);
      if (tmdbResp.status !== 200) return;
      console.log("tmdbResp", tmdbResp.data, getMovieDetails.data);
      dispatch(getMovieDetail(getMovieDetails.data));
      dispatch(getTMDBDetails(tmdbResp.data));
      navigate(`/movies/${movie.stream_id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBackDropLoading(false);
    }
  };

  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    // Calculate epoch time for 7 days ago
    const sevenDaysAgo = currentTime - 7 * 24 * 60 * 60; // 7 days * 24 hours * 60 minutes * 60 seconds
    // Filter data for last 7 days
    const lastSevenDaysData = allMoviesData?.filter((movie) => {
      // Convert 'added' epoch time to number
      const addedEpochTime = parseInt(movie.added);

      // Check if 'added' epoch time is within the last 7 days
      return addedEpochTime >= sevenDaysAgo && addedEpochTime <= currentTime;
    });
    // Set filtered data into state
    setRecentlyAddedMovies(lastSevenDaysData);
  }, [allMoviesData]);

  const onCategoryClickHandler = () => {};

  // Define a predefined color palette
  const colorPalette = ["#ff5733", "#33ff57", "#3357ff", "#ff33f9", "#f933ff"];

  //stream_icon num

  return (
    <Box className="home_Container">
      {isBackdropLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdropLoading}
        >
          <CircularProgress style={{ color: "#6c52ee" }} />
        </Backdrop>
      )}
      <HeroSection />
      <Box className="Popular_Movies-container">
        <Box
          style={{
            display: "flex",
            alineItem: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography className="title">New Release</Typography>
          <Button
            onClick={() => navigate(`/AllContent?allMovies=${true}`)}
            className="view_all-btn"
            style={{ marginRight: "90px" }}
          >
            View all <i className="fa-solid fa-chevron-right icon"></i>
          </Button>
        </Box>
        <Box className="Popular_Movies-content">
          <Slider {...settings}>
            {recentlyAddedMovies?.map((movie) => {
              const { num, stream_icon } = movie;
              return (
                <Card key={num} onClick={() => getMovieDetailHandler(movie)}>
                  <img src={stream_icon} alt="movie_poster" />
                </Card>
              );
            })}
          </Slider>
        </Box>
      </Box>
      <Box className="Popular_Movies-container">
        <Box
          style={{
            display: "flex",
            alineItem: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography className="title">All Categories</Typography>
          <Button
            onClick={() => navigate(`/AllContent?allcategory=${true}`)}
            className="view_all-btn"
            style={{ marginRight: "90px" }}
          >
            View all <i className="fa-solid fa-chevron-right icon"></i>
          </Button>
        </Box>
        <Box className="Popular_Movies-content">
          <Slider {...settings}>
            {moviesCategories?.map((category) => {
              const { category_id, category_name } = category;
              // const randomColor = getRandomColor();
              // Use predefined color palette
              const predefinedColor =
                colorPalette[category_id % colorPalette.length];

              return (
                <Card
                  className="category-card"
                  sx={{ backgroundColor: predefinedColor }}
                  key={category_id}
                  onClick={() => onCategoryClickHandler(category_id)}
                >
                  <Typography className="category_name">
                    {category_name}
                  </Typography>
                </Card>
              );
            })}
          </Slider>
        </Box>
      </Box>
      <Box className="Popular_Movies-container">
        <Box
          style={{
            display: "flex",
            alineItem: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography className="title">New Release</Typography>
          <Button className="view_all-btn" style={{ marginRight: "90px" }}>
            View all <i className="fa-solid fa-chevron-right icon"></i>
          </Button>
        </Box>

        <Box className="Popular_Movies-content">
          <Slider {...settings}>
            {recentlyAddedMovies?.map((movie) => {
              const { num, stream_icon } = movie;
              return (
                <Card key={num} onClick={() => getMovieDetailHandler(movie)}>
                  <img src={stream_icon} alt="movie_poster" />
                </Card>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
