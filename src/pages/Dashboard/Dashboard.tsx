import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "./components/DashboardHeader";
import SearchBar from "./components/SearchBar";
import TestTable from "./components/TestTable";

import { getAllTests } from "../../api/testApi";
import { ROUTES } from "../../constants/routes";
import type { Test } from "../../types/test";
import { getErrorMessage } from "../../utils/error";
import useDebounce from "../../hooks/useDebounce";


const Dashboard = () => {
  const navigate = useNavigate();

  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const fetchTests = async () => {
    try {
      setLoading(true);

      const response = await getAllTests();

      setTests(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);


  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleView = (testId: string) => {
    navigate(
      ROUTES.PREVIEW.replace(":id", testId)
    );
  };

  const handleEdit = (testId: string) => {
    navigate(
      ROUTES.CREATE_TEST.replace(":id", testId)
    );
  };

  const filteredTests = useMemo(() => {
    if (!debouncedSearch.trim()) {
      return tests;
    }

    const search = debouncedSearch.toLowerCase();

    return tests.filter(
      (test) =>
        test.name.toLowerCase().includes(search) ||
        test.subject.toLowerCase().includes(search)
    );
  }, [tests, debouncedSearch]);

  const paginatedTests = useMemo(() => {
    return filteredTests.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredTests, page, rowsPerPage]);
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: 0
    }}>
      <DashboardHeader
        title="Dashboard"
        buttonText="Create New Test"
        onButtonClick={() => navigate(ROUTES.CREATE_TEST.replace("/:id?", ""))}
      />
      <Box sx={{ mb: 3, width: { xs: "100%", sm: 350 } }}><SearchBar
        value={searchTerm}
        onChange={handleSearch}
      /></Box>


      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 8,
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            minHeight: 0
          }}
        >
          <TestTable
            tests={paginatedTests}
            count={filteredTests.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onView={handleView}
            onEdit={handleEdit}
          />
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;