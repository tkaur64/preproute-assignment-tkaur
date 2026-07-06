import {
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface AppBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const AppBreadcrumbs = ({ items }: AppBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      separator="/"
      sx={{
        mb: 4,

        "& .MuiBreadcrumbs-separator": {
          color: "text.secondary",
          mx: 0.75,
        },
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography
            key={item.label}
            sx={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "150%",
              color: "text.secondary",
            }}
          >
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            underline="none"
            component="button"
            onClick={item.onClick}
            sx={{
              fontSize: 12,
              fontWeight: 400,
              lineHeight: "150%",
              color: "text.secondary",
              cursor: item.onClick ? "pointer" : "default",

              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;