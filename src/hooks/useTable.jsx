import React, { useEffect, useState } from "react";
// css
import "src/styles/useTable.scss";
// library
import {
  Table,
  TableHead,
  TableRow,
  usePagination,
  TableSortLabel,
  TableContainer,
  Box,
  Grid,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { visuallyHidden } from "@mui/utils";
import toastr from "toastr";
import { useTranslation } from "react-i18next";

export const useTable = (
  rows,
  columns,
  defaultSort,
  callFrom,
  totalRows,
  page = 0,
  rowsPerPage,
  setPage,
  allData
) => {
  const { t } = useTranslation();
  // const pages = [5, 10, 25];
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const totalPage = totalRows;

  const pageLimit =
    totalPage > rowsPerPage
      ? Math.ceil(totalPage / rowsPerPage)
      : totalPage < 6
      ? 1
      : totalPage;

  const { items: paginationItems } = usePagination({
    count: pageLimit || 5,
    page: page > 0 ? page : 1,
  });

  const TblContainer = (props) => (
    <TableContainer sx={{ width: "100%", ...props.sx }}>
      <Table
        size={"medium"}
        aria-label={props.name}
        data-testid={props.name}
        sx={{
          // [`& .${tableCellClasses.root}`]: {
          //   borderBottom: "none",
          // },
          // marginLeft: "10px",
          minWidth: 750,
          border: "1px solid #DDDFE1",
        }}
      >
        {props.children}
      </Table>
    </TableContainer>
  );

  useEffect(() => {
    try {
      setOrder("asc");
      setOrderBy(defaultSort);
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TblHead = (props) => {
    const { headSx, handleRefresh, handleDelete, selected } = props;
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };
    const newColumns = callFrom === "export" ? columns?.slice(1) : columns;
    return (
      <TableHead>
        <TableRow>
          {newColumns?.map((column) => {
            return (
              <TableCell
                key={"useTblCol" + column.id}
                align={column.numeric ? "right" : "left"}
                padding={column.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === column.name ? order : false}
                style={{
                  whiteSpace: "nowrap",
                  width: column.width,
                  border: "1px solid #DDDFE1",
                }}
              >
                {column.sort === false ? (
                  column?.icon === "reloadDelete" ? (
                    <>
                      <Box
                        component="span"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <img
                          src="/svg/reloadIcon.svg"
                          width={20}
                          height={20}
                          alt=""
                          title="Refresh Data"
                          loading="lazy"
                          onClick={handleRefresh}
                          className="pointer"
                        />{" "}
                        {handleDelete ? (
                          <img
                            src="/svg/deleteIcon.svg"
                            width={20}
                            height={20}
                            className="secondary pointer"
                            alt=""
                            title="Delete Data"
                            loading="lazy"
                            onClick={() => {
                              selected && selected?.length > 0
                                ? handleDelete()
                                : toastr.error("Nichts zum Löschen ausgewählt");
                            }}
                          />
                        ) : null}
                      </Box>
                    </>
                  ) : (
                    <Box
                      component="span"
                      sx={{
                        color: "#6A707E",
                        fontFamily: "fontFamily2",
                        fontSize: "16px",
                        fontWeight: "400",
                        lineHeight: "19.36px",
                        ...headSx,
                      }}
                    >
                      {t(column?.label)}
                    </Box>
                  )
                ) : (
                  <TableSortLabel
                    active={orderBy === column.name}
                    direction={orderBy === column.name ? order : "asc"}
                    onClick={() => handleSortRequest(column.name)}
                    aria-label={`Sort by ${column.label}`}
                    sx={{
                      color: "#6A707E",
                      fontFamily: "fontFamily2",
                      fontSize: "16px",
                      fontWeight: "400",
                      lineHeight: "19.36px",
                      ...headSx,
                    }}
                  >
                    {t(column?.label)}

                    {orderBy === column.name ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const TblPagination = () => {
    return (
      <Grid container className="tablePagination" mt={4}>
        <Grid item className="tablePagination-item">
          <div className="tablePagination-item-results">
            {t("pagination.results", {
              currentPage: allData?.currentPage,
              lastPage: rows?.length, // allData?.last_page,
              total: allData?.total_record,
            })}
          </div>
        </Grid>
        <Grid item className="tablePagination-item">
          <div className="tablePagination-item-wrap">
            <ul>
              {allData?.currentPage &&
                paginationItems?.map(({ type, selected, ...item }, index) => {
                  let children = null;

                  if (type === "start-ellipsis" || type === "end-ellipsis") {
                    children = "…";
                  } else if (type === "page") {
                    children = (
                      <button
                        type="button"
                        style={{
                          fontWeight: selected ? "bold" : undefined,
                        }}
                        className={selected ? "selected" : null}
                        {...item}
                        onClick={() => handleChangePage(item.page)}
                      >
                        {item.page}
                      </button>
                    );
                  } else {
                    children = (
                      <button
                        type="button"
                        {...item}
                        onClick={() =>
                          handleChangePage(
                            type === "previous"
                              ? page - 1
                              : page === 0
                              ? page + 2
                              : page + 1
                          )
                        }
                      >
                        {type === "previous" ? t("Previous") : t("Next")}
                      </button>
                    );
                  }

                  return (
                    <li
                      key={index}
                      style={{
                        display:
                          (type === "next" && pageLimit === 1) ||
                          (type === "next" && pageLimit === page) ||
                          (type === "next" && totalPage < 2) ||
                          (type === "previous" &&
                            page === 0 &&
                            pageLimit > 0) ||
                          (type === "previous" && page === 1 && pageLimit > 0)
                            ? "none"
                            : "inherit",
                      }}
                    >
                      {children}
                    </li>
                  );
                })}
            </ul>
          </div>
        </Grid>
      </Grid>
    );
  };

  const dynamicSort = (property, order) => {
    try {
      if (property && order) {
        var sort_order = 1;
        if (order === "desc") {
          sort_order = -1;
        }
        return function (a, b) {
          // a should come before b in the sorted order
          let valueA = a[property];
          let valueB = b[property];
          if (property === "csid") {
            valueA = Number(valueA);
            valueB = Number(valueB);
          }
          if (
            property === "EventDate" ||
            property === "ObjectDate" ||
            property === "CarInspectionDate" ||
            property === "date"
          ) {
            valueA = new Date(valueA)?.getTime();
            valueB = new Date(valueB)?.getTime();
          }

          if (valueA < valueB) {
            return -1 * sort_order;
            // a should come after b in the sorted order
          } else if (valueA > valueB) {
            return 1 * sort_order;
            // a and b are the same
          } else {
            return 0 * sort_order;
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const finalRecords = () => {
    try {
      if (!Array.isArray(rows)) return [];

      return rows
        ?.slice()
        ?.sort(dynamicSort(orderBy, order))
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } catch (error) {
      console.error("finalRecords", error);
    }
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    finalRecords,
    handleChangePage,
    dynamicSort,
  };
};
