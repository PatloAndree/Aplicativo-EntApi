import MUIDataTable, { MUIDataTableProps } from "mui-datatables";
import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";

type Props = {} & MUIDataTableProps;
export default function MUITable({ options, ...restProps }: Props) {


  const customToolbar = () => {
    return (
      <Button
        variant="outlined"
      >
        CSV
      </Button>
    );
  };

  const opciones = useMemo(() => (options ? options : {}), [options]);
  const getTheme = () => {
    return createTheme({
      components: {
        MuiFormControl: {
          styleOverrides: {
            root: {
              padding: "1rem !important",
            },
          },
        },
        MUIDataTable: {
          styleOverrides: {
            root: {
              backgroundColor: "rgba(0,0,0,0) !important",
              boxShadow: "none !important",
              //fontFamily: "inherit !important",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            fixedHeader: {
              backgroundColor: "transparent",
              color: "rgba(0,0,0) !important",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              //fontFamily: "inherit",
              color: "rgba(0,0,0,0.7)",
              whiteSpace: "pre-line",
              padding: "0.5rem 0.75rem",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              //fontFamily: "inherit",
              color: "inherit",
            },
          },
        },
        MUIDataTableFooter: {
          styleOverrides: {
            root: {
              marginTop: "1rem",
            },
          },
        },
      },
    });
  };
  return (
    <ThemeProvider theme={getTheme()}>
      <MUIDataTable
        {...restProps}
        options={{
          filter: false,
          selectableRows: "none",
          responsive: "vertical",
          print:"false",
          search:"false",
          download:'false',
          viewColumns:'false',
          // customToolbar, 
          ...opciones,
        }}
      />
    </ThemeProvider>
  );
}
