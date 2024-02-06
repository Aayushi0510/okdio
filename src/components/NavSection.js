import PropTypes from "prop-types";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, List, ListItemText, ListItemButton } from "@mui/material";
import { ROUTES_URL } from "src/constants/url.constant";

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: "relative",
  textTransform: "capitalize",
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
  anchor: PropTypes.string,
};

function NavItem(props) {
  const { item, active, anchor, t } = props;

  const isActiveRoot = active(item.path);
  const { title, path } = item;

  const RootStyle = {
    color: "#ffffff",
    fontWeight: "500",
    bgcolor: "transparent",
    "&:before": { display: "block" },
  };

  const activeRootStyle = {
    color: "#ffffff",
    fontWeight: "500",
    bgcolor: "secondary.main",
    "&:before": { display: "block" },
  };

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot ? activeRootStyle : RootStyle),
        padding: anchor === "top" ? "10px" : "20px",
        marginLeft: anchor === "top" ? 0 : "20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "14px",
        fontFamily: "fontFamily2",
        "&:hover": {
          bgcolor: "secondary.main",
        },
      }}
    >
      <ListItemText disableTypography primary={t(title)} />
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
  anchor: PropTypes.string,
};

export default function NavSection(props) {
  const { navConfig, anchor, t, ...other } = props;
  const { pathname } = useLocation();
  const pathnamee =
    pathname === ROUTES_URL.BOOK ? ROUTES_URL.BOOKCASE : pathname;
  const match = (path) => (path ? path === pathnamee : false);
  // path ? !!matchPath({ path, end: false }, pathname) : false;

  // console.log("pathname", pathname, pathnamee);

  return (
    <Box {...other} sx={{ pt: 0 }}>
      <List
        disablePadding
        sx={{
          ...(anchor === "top" && {
            display: "inline-flex",
            flexWrap: "wrap",
          }),
        }}
      >
        {navConfig.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            active={match}
            anchor={anchor}
            t={t}
          />
        ))}
      </List>
    </Box>
  );
}
