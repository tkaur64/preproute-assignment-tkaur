import { TEST_TYPE_OPTIONS } from "../../constants/test";
import { ROUTES } from "../../constants/routes";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppBreadcrumbs from "../../components/AppBreadcrumbs/AppBreadcrumbs";
import TestTypeSelector from "./components/TestTypeSelector";

import type { TestType } from "../../types/test";


const CreateTest = () => {
  const [selectedTestType, setSelectedTestType] =
    useState<TestType>("chapterwise");
  const navigate = useNavigate();

  const handleTestTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    value: TestType
  ) => {
    if (value !== null) {
      setSelectedTestType(value);
    }
  };
  return (
    <>
      <AppBreadcrumbs
        items={[
          {
            label: "Test Creation",
            onClick: () => navigate(ROUTES.DASHBOARD),
          },
          {
            label: "Create Test",
          },
          {
            label: TEST_TYPE_OPTIONS.find((opt) => opt.value === selectedTestType)?.label ?? '',
          },
        ]}
      />
      <TestTypeSelector
        value={selectedTestType}
        onChange={setSelectedTestType}
      />
    </>

  )
}

export default CreateTest;