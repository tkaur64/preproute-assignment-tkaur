import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import loginIllustration from "../../assets/images/login-illustration.svg";
import logo from "../../assets/images/preproute-logo.svg";

import { ROUTES } from "../../constants/routes";
import type { LoginRequest } from "../../types/auth";
import { login } from "../../api/authApi";
import { saveToken, saveUser } from "../../utils/storage";
import { getErrorMessage } from "../../utils/error";




interface LoginFormValues {
  userId: string;
  password: string;
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const response = await login(data);

      saveToken(response.data.token);
      saveUser(response.data.user);

      navigate(ROUTES.DASHBOARD);
    } catch (error) {

      setErrorMessage(getErrorMessage(error));

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      {/* LEFT PANEL */}

      <Box
        sx={{
          flex: 1,
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#EEF4FF",
        }}
      >
        <Box
          component="img"
          src={loginIllustration}
          alt="Login Illustration"
          sx={{
            width: "80%",
            maxWidth: 500,
          }}
        />
      </Box>

      {/* RIGHT PANEL */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 430,
          }}
        >
          <Stack spacing={4}>
            <Box
              component="img"
              src={logo}
              alt="Preproute"
              sx={{
                width: 150,
              }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "text.secondary",
                }}
              >
                Login
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                Use your company provided Login credentials
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {/* USER ID */}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.secondary",
                    }}
                  >
                    User ID
                  </Typography>

                  <Controller
                    name="userId"
                    control={control}
                    rules={{
                      required: "User ID is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder="Enter User ID"
                        error={!!errors.userId}
                        helperText={errors.userId?.message}
                      />
                    )}
                  />
                </Box>

                {/* PASSWORD */}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.secondary",
                    }}
                  >
                    Password
                  </Typography>

                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        placeholder="Enter Password"
                        type="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Box>

                <Link
                  component="button"
                  underline="none"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "primary.main",
                    alignSelf: "flex-start",

                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot password?
                </Link>
                <Snackbar
                  open={!!errorMessage}
                  autoHideDuration={4000}
                  onClose={() => setErrorMessage("")}
                >
                  <Alert severity="error">
                    {errorMessage}
                  </Alert>
                </Snackbar>
                <Button
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                  sx={{
                    width: '100%',
                    maxWidth: 510
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;