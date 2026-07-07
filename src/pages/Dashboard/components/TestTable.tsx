import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { Test } from "../../../types/test";
import { formatDate } from "../../../utils/date";
import { getStatusChip } from "../../../helpers/test";

interface TestTableProps {
  tests: Test[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onView: (testId: string) => void;
  onEdit: (testId: string) => void;
}



const TestTable = ({
  tests,
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
}: TestTableProps) => {

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "auto",
        flexDirection: "column",
        height: "100%",

      }}
    >
      <TableContainer sx={{
        flex: 1,
        overflow: "auto",
      }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: "#F8FAFC",
              }}
            >
              <TableCell>
                <Typography sx={{ fontWeigh: 600 }}>Test Name</Typography>
              </TableCell>

              <TableCell>
                <Typography sx={{ fontWeigh: 600 }}>Subject</Typography>
              </TableCell>

              <TableCell>
                <Typography sx={{ fontWeigh: 600 }}>Difficulty</Typography>
              </TableCell>

              <TableCell>
                <Typography sx={{ fontWeigh: 600 }}>Status</Typography>
              </TableCell>

              <TableCell>
                <Typography sx={{ fontWeigh: 600 }}>Created On</Typography>
              </TableCell>

              <TableCell align="center">
                <Typography sx={{ fontWeigh: 600 }}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tests.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{ py: 6 }}
                >
                  No tests found.
                </TableCell>
              </TableRow>
            ) : (
              tests.map((test) => {
                const chip = getStatusChip(test.status);
                return (
                  <TableRow
                    key={test.id}
                    hover
                  >
                    <TableCell>
                      <Typography

                        noWrap
                        sx={{
                          maxWidth: 280,
                          fontWeight: 500,
                        }}
                      >
                        {test.name}
                      </Typography>
                    </TableCell>

                    <TableCell>{test.subject}</TableCell>

                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {test.difficulty}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={chip.label}
                        size="small"
                        color={
                          chip.color
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {formatDate(test.created_at)}
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton size="small" onClick={() => onView(test.id)}>
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit(test.id)}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                        >
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })


            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
};

export default TestTable;