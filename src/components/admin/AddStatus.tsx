import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { createStatus } from "../../api/service-statuses";
import { toast } from "../../utils/alerts";
import ErrorMessage from "../UI/ErrorMessage";

const AddStatus: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
        <ErrorMessage message="status name"></ErrorMessage>
      return;
    }

    setLoading(true);

    try {
      await createStatus(name);
      toast.success("success")
      setName("");
    } catch  {
        toast.error("create status faild")
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 400, margin: "0 auto", mt: 4 }}>
      <TextField
        label="Status Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Add Status"}
      </Button>

  
    </Stack>
  );
};

export default AddStatus;
