import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreHorizontalFill from "@iconify/icons-eva/more-horizontal-fill";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// ----------------------------------------------------------------------

export default function UserMoreMenu({ row, pathname }) {
  const navigate = useNavigate();

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (row) => {
    setIsOpen(false);
    navigate({
      pathname: pathname,
      state: { id: row?._id, name: row?.name },
    });
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreHorizontalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
            onClick={() => handleClick(row)}
          />
        </MenuItem>
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
            // onClick={() => dispatch(deleteProject(row.id))}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
