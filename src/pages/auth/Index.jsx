import { useState } from "react";
import { Box, TextField, Button, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { useDispatch } from "react-redux";
import {
  allMoviesData,
  getAllMoviesCategory,
} from "../../redux/action/moviesAction";
import { setLocalStorageData } from "../../helper/helper";
import { getMoviesCategory } from "../../service/movieInfo";
import { GET_MOVIES } from "../../config/config";

function Login() {
  const inputFields = [
    {
      id: "email",
      label: "Email Address",
      name: "email",
      autoComplete: "email",
      type: "email",
    },
    {
      id: "firstName",
      label: "First Name",
      name: "firstName",
      autoComplete: "fname",
      type: "text",
    },
    {
      id: "Username",
      label: "User Name",
      name: "Username",
      autoComplete: "Uname",
      type: "text",
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
    },
    {
      id: "url",
      label: "Server URL",
      name: "url",
      type: "text",
      autoComplete: "url",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State to store form data and errors
  const [formData, setFormData] = useState({
    email: "pk5324120@gmail.com",
    firstName: "Pradeep",
    Username: "iptvload",
    password: "4mjq603uk8",
    url: "http://hi-ott.me/",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // Handler function to update form data on change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler function to validate form data
  const validateFormData = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.Username) {
      newErrors.Username = "Username is required";
    }
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.url) {
      newErrors.url = "Server URL is required";
    } else if (!/^https?:\/\//i.test(formData.url)) {
      newErrors.url =
        "Invalid URL. Please enter a URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler function to submit form data
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (validateFormData()) {
        const loginData = {
          baseUrl: formData.url,
          username: formData.Username,
          password: formData.password,
        };
        const URL = `${formData.url}player_api.php?username=${formData.Username}&password=${formData.password}`;
        const resp = await axios.get(URL);
        if (resp.status !== 200 || resp.data.user_info.status !== "Active")
          return;
        const MOVIESURL = `${formData.url}player_api.php?username=${formData.Username}&password=${formData.password}&${GET_MOVIES}`;
        const moviesResp = await axios.get(MOVIESURL);
        if (moviesResp.status !== 200) return;
        dispatch(allMoviesData(moviesResp?.data));
        setLocalStorageData("USER_INFO", loginData);
        const allMoviesCategory = await getMoviesCategory();

        if (allMoviesCategory.status !== 200) return;
        dispatch(getAllMoviesCategory(allMoviesCategory?.data));
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="login_container">
      <Box className="bg-video-container">
        <MediaPlayer
          title="Sprite Fight"
          src="https://customer-342mt1gy0ibqe0dl.cloudflarestream.com/33abd2fe01a7f0e6fab0be92a12f3cde/downloads/default.mp4"
          autoPlay
          muted // Set muted state
          className="video-player"
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        >
          <MediaProvider />
        </MediaPlayer>
      </Box>
      {!isVideoPlaying && (
        <Box className="video-poster">
          <img
            src="https://streamvid.gavencreative.com/wp-content/uploads/2023/06/spider_ex2.jpg"
            alt="Poster"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      )}
      <Box className="Login_content">
        <Box className="Login-form">
          <img
            src="https://streamvid.gavencreative.com/wp-content/uploads/2023/02/logo.svg"
            alt="logo"
          />
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              {inputFields.map((field) => (
                <Grid key={field.id} item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    className="Input-field"
                    id={field.id}
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    autoComplete={field.autoComplete}
                    value={formData[field.name]}
                    onChange={handleChange}
                    error={!!errors[field.name]} // Set error based on presence of error message
                    helperText={errors[field.name]} // Display error message
                  />
                </Grid>
              ))}
            </Grid>
            <br />
            <br />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="button signupbtn"
            >
              {isLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Watch Now"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
