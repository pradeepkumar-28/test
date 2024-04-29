import { Box, IconButton, Tooltip } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const menuData = [
    {
      id: 1,
      name: "Search",
      icon: <i className="fa-solid fa-magnifying-glass icon"></i>,
    },
    {
      id: 2,
      name: "Movies",
      icon: <i className="fa-solid fa-film icon"></i>,
    },
    {
      id: 3,
      name: "Series",
      icon: <i className="fa-solid fa-video icon"></i>,
    },
    {
      id: 4,
      name: "Live TV",
      icon: <i className="fa-solid fa-tv icon"></i>,
    },
    {
      id: 5,
      name: "podcast",
      icon: <i className="fa-solid fa-podcast icon"></i>,
    },
  ];

  return (
    <Box style={{ display: "flex" }}>
      <Box className="Sidebar_container">
        <Box className="menu-container">
          <img
            src="https://streamvid.gavencreative.com/wp-content/uploads/2023/02/logo_sin.svg"
            className="logo"
            alt="logo"
          />

          <Box className="sidebar-menu-container">
            {menuData.map((item) => {
              return (
                <Tooltip key={item.id} title={item.name} placement="right">
                  <IconButton className="iconButton">{item.icon}</IconButton>
                </Tooltip>
              );
            })}
          </Box>
          <Tooltip title="settings" placement="right">
            <IconButton
              className="iconButton"
              onClick={() => navigate("/login")}
            >
              <i className="fa-solid fa-user icon"></i>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}

export default Sidebar;
