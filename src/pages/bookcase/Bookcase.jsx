import React, { useState, useEffect } from "react";
// css
import "./bookcase.scss";
// npm
import { Card, Stack, Container, Box, Paper } from "@mui/material";
// component
import BookCard from "src/components/cards/BookCard";
import { CustomAutoComplete, CustomBackdrop } from "src/components";
// constants
import { API_URL } from "src/constants/url.constant";
import { API_STATUS_CODE } from "src/constants/content.constant";
// utils
import { postMethod } from "src/utils";

export default function Bookcase(props) {
  const { t } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategorySelected, setSubCategorySelected] = useState("");

  const fetchCategory = async (req) => {
    try {
      setLoading(true);

      const paylaod = {
        search: req?.search || "",
        per_page: req?.perPage || "0",
      };
      const response = await postMethod(
        API_URL.GET_BOOK_CATEGORY_LIST + `?page=${req?.pageNumber || 1}`,
        paylaod,
        false,
        true
      );
      if (response?.status === API_STATUS_CODE.SUCCESS) {
        setLoading(false);
        if (response?.data?.message === "You are not authorized") {
          // logout();
        } else {
          const newData = response?.data?.data;

          if (Array.isArray(newData)) {
            setCategories(newData);
          }
        }
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchFilterList = async (req) => {
    try {
      setLoading(true);

      const paylaod = {
        category_id: req?.categoryId || "",
        search: req?.search || "",
        per_page: req?.perPage || "0",
      };
      const response = await postMethod(
        API_URL.GET_BOOK_FILTER_LIST,
        paylaod,
        false,
        true
      );
      if (response?.status === API_STATUS_CODE.SUCCESS) {
        setLoading(false);
        const newData = response?.data?.data;

        if (Array.isArray(newData)) {
          setSubCategories(newData);
        }
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchData = async (req) => {
    try {
      setLoading(true);

      const paylaod = {
        filter_id: req?.filterId || "",
        search: req?.search || "",
        per_page: req?.perPage || "0",
      };
      const response = await postMethod(
        API_URL.GET_BOOK_LIST + `?page=${req?.pageNumber || 1}`,
        paylaod,
        false,
        true
      );
      if (response && response?.status === API_STATUS_CODE.SUCCESS) {
        const newData = response?.data?.data;
        setData(newData);

        setLoading(false);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  const handleCategorySelect = (val) => {
    setCategorySelected(val);
    const request = {
      categoryId: val?.id,
    };
    fetchFilterList(request);
  };
  const handleSubCategorySelect = (val) => {
    setSubCategorySelected(val);
    const request = {
      filterId: val?.id,
    };
    fetchData(request);
  };

  const handleSelectedBookClick = (b) => {
    props?.handleSelectedBook && props?.handleSelectedBook(b);
  };

  // console.log("data", data);
  // console.log("categories", categories, categorySelected, subCategorySelected);
  // console.log("subCategories", subCategories);
  return (
    <CustomBackdrop loading={loading}>
      <Container maxWidth="xl" className="bookPage">
        <Card sx={{ padding: "20px" }}>
          {/* selection bar start */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "start", sm: "center" }}
            justifyContent={{ xs: "flex-start" }}
            gap={15}
          >
            <Box
              sx={{ width: "300px", display: "flex", flexDirection: "column" }}
            >
              <Box
                component="label"
                sx={{
                  color: "#ABAFB3",
                  fontFamily: "fontFamily2",
                  fontSize: "18px",
                  fontWeight: "fontWeightMedium",
                }}
              >
                {t("Category")}
              </Box>
              <CustomAutoComplete
                options={categories || []}
                id="categories"
                labelField="category_name"
                onChange={(val) => handleCategorySelect(val)}
              />
            </Box>
            <Box
              sx={{ width: "300px", display: "flex", flexDirection: "column" }}
            >
              <Box
                component="label"
                sx={{
                  color: "#ABAFB3",
                  fontFamily: "fontFamily2",
                  fontSize: "18px",
                  fontWeight: "fontWeightMedium",
                }}
              >
                {t("Sub Category")}
              </Box>
              <CustomAutoComplete
                options={subCategories || []}
                id="subCategories"
                labelField="filter_name"
                onChange={(val) => handleSubCategorySelect(val)}
              />
            </Box>
          </Stack>
          <Paper className="bookPage-content">
            {Array.isArray(data) && data?.length > 0 ? (
              data.map((x) => (
                <BookCard
                  card={x}
                  key={x.id}
                  handleSelectedBook={(b) => handleSelectedBookClick(b)}
                />
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {t("message.NO_RECORDS_FOUND")}
              </Box>
            )}
          </Paper>
        </Card>
      </Container>
    </CustomBackdrop>
  );
}
