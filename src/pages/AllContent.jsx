import { useEffect, useState } from "react";
import { Box, Card, Typography, Modal, Button, Skeleton } from "@mui/material";
import { FixedSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getMovieDetail,
  getTMDBDetails,
  clearTMDBData,
} from "../redux/action/moviesAction";
import { getMovieInfo } from "../service/movieInfo";
import { getTMDBdetail } from "../service/TMDBservice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 600,
  bgcolor: "#00031c",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 8,
  p: 6,
  overflow: "scroll",
};

function AllContent() {
  const { allMoviesData } = useSelector((state) => state.moviesReducer) || [];
  const { moviesCategories } =
    useSelector((state) => state.moviesReducer) || [];
  const dispatch = useDispatch();

  const [isBackdropLoading, setIsBackDropLoading] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [movieData, setMovieData] = useState([]);
  const [serachValue, setSearchValue] = useState("");

  const columnCount = 6;
  const cellWidth = 235;
  const cellHeight = 400;
  const itemCount = movieData?.length; // Total number of items
  const rowCount = Math.ceil(itemCount / columnCount); // Calculate number of rows

  const onMovieClickHandler = async (movie) => {
    try {
      setIsBackDropLoading(true);
      const getMovieDetails = await getMovieInfo(movie.stream_id);
      if (getMovieDetails.status !== 200) return;
      if (movie.tmdb) {
        const tmdbResp = await getTMDBdetail(movie.tmdb);
        if (tmdbResp.status !== 200) return;
        dispatch(getMovieDetail(getMovieDetails.data));
        dispatch(getTMDBDetails(tmdbResp.data));
        dispatch(getMovieDetail(getMovieDetails.data));
        navigate(`/movies/${movie.stream_id}?category_id=${movie.category_id}`);
      } else {
        dispatch(getMovieDetail(getMovieDetails.data));
        dispatch(clearTMDBData());
        dispatch(getMovieDetail(getMovieDetails.data));
        navigate(`/movies/${movie.stream_id}?category_id=${movie.category_id}`);
      }
    } catch (error) {
      console.log("test");
    } finally {
      setIsBackDropLoading(false);
    }
  };

  useEffect(() => {
    if (allMoviesData) {
      setMovieData(allMoviesData);
    }
  }, [allMoviesData]);

  const onCategoryClickHandler = (categoryID) => {
    const filteMovieByCategory = allMoviesData.filter(
      (item) => item.category_id == categoryID
    );
    setMovieData(filteMovieByCategory);
    setOpen(false);
  };

  const MoviesInCategory = (categoryId) => {
    return allMoviesData?.filter((movie) => movie.category_id == categoryId);
  };

  const onSearchHandler = (value) => {
    setSearchValue(value);
    if (!value.trim()) {
      // If the search value is empty, reset the movieData to show all movies
      setMovieData(allMoviesData);
    } else {
      // Filter movies based on the search value
      const searchedMovies = allMoviesData.filter((movie) =>
        movie.name.toLowerCase().includes(value.toLowerCase())
      );
      setMovieData(searchedMovies);
    }
  };

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const itemIndex = rowIndex * columnCount + columnIndex; // Calculate item index
    if (itemIndex >= itemCount) {
      return null; // Return null if item index exceeds the total count
    }

    const movie = movieData?.[itemIndex];

    return (
      <div key={key} style={{ ...style }}>
        {movie ? (
          <Box className="movie_card">
            <img
              src={movie.stream_icon}
              width="220px"
              height="380px"
              alt="movie_poster"
              style={{ borderRadius: "8px" }}
              onClick={() => onMovieClickHandler(movie)}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop in case placeholder image also fails to load
                e.target.src =
                  "https://popcornusa.s3.amazonaws.com/placeholder-movieimage.png"; // Set placeholder image
              }}
            />
            <Typography component="p">{movie?.name}</Typography>
          </Box>
        ) : (
          <Skeleton
            variant="rectangular"
            width={220}
            height={380}
            style={{ borderRadius: "8px" }}
          />
        )}
      </div>
    );
  };

  return (
    <Box className="All-Content-container">
      {isBackdropLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isBackdropLoading}
        >
          <CircularProgress style={{ color: "#6c52ee" }} />
        </Backdrop>
      )}
      <Box className="header-container">
        <Button className="button" onClick={() => handleOpen()}>
          Categories
        </Button>
        <input
          placeholder="Find Movies, series..."
          type="text"
          name="text"
          value={serachValue}
          className="input"
          onChange={(e) => onSearchHandler(e.target.value)}
        />
      </Box>
      <Box className="content-grid">
        {!movieData?.length && (
          <Typography className="not-found-title">No Movie Found!</Typography>
        )}
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeGrid
              width={width}
              height={height}
              columnCount={columnCount}
              columnWidth={cellWidth}
              rowCount={rowCount}
              rowHeight={cellHeight}
            >
              {cellRenderer}
            </FixedSizeGrid>
          )}
        </AutoSizer>
      </Box>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="Category-model" sx={style}>
            {moviesCategories?.map((category) => {
              const { category_name, category_id } = category;
              const movieCount = MoviesInCategory(category_id);
              return (
                <Card
                  className="category-card"
                  sx={{ backgroundColor: "transparent" }}
                  key={category_id}
                  onClick={() => onCategoryClickHandler(category_id)}
                >
                  <Typography className="category_name">
                    {category_name} <span>({movieCount?.length})</span>
                  </Typography>
                </Card>
              );
            })}
          </Box>
        </Modal>
      )}
    </Box>
  );
}

export default AllContent;
