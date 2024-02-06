import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Button, Typography, Container } from "@mui/material";
// components
import { MotionContainer, varBounceIn } from "../../components/animate";
import { RootStyle } from "./Page404.theme";

export default function Page404({ t }) {
  return (
    <RootStyle title="404 Page Not Found | Okudio">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                {t("message.SORRY_PAGE_NOT_FOUND")}
              </Typography>
            </motion.div>
            <Typography sx={{ color: "text.secondary" }}>
              {t("message.SORRY_PAGE_NOT_FOUND_TEXT")}
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/svg/404.svg"
                sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                loading="lazy"
              />
            </motion.div>

            <Button
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}
            >
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
