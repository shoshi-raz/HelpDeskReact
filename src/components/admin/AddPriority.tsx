import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import ErrorMessage from "../UI/ErrorMessage";
import { createPriority } from "../../api/service-priorities";
import { toast } from "../../utils/alerts";

const AddPriority: React.FC = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      return  <ErrorMessage message="priority name"></ErrorMessage>
      
    }

    setLoading(true);

    try {
      await createPriority(name);
      toast.success("priority added")
      setName(""); 
    } catch {
      toast.error("Failed to create priority");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: 400, margin: "0 auto", mt: 4 }}>
      <TextField
        label="Priority Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Add Priority"}
      </Button>

    </Stack>
  );
};

export default AddPriority;
