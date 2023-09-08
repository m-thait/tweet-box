import React, { ChangeEvent, useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./SearchBox.module.scss";

export interface SearchBoxProps {
  onChange: (text: string) => void;
  onClear?: () => void;
}
export const SearchBox = ({ onChange, onClear }: SearchBoxProps) => {
  const [searchText, setSearchText] = useState("");

  const handleClear = useCallback(() => {
    setSearchText("");
    if (onClear) {
      onClear();
    }
  }, [onClear]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchText(value);
      if (value.length > 1) {
        onChange(value);
      } else {
        if (onClear) {
          onClear();
        }
      }
    },
    [onClear, onChange]
  );

  return (
    <Box data-testid="tree-select-search-box">
      <TextField
        placeholder="Search"
        variant="outlined"
        hiddenLabel
        fullWidth
        autoComplete="off"
        spellCheck={false}
        value={searchText}
        onChange={handleChange}
        className={styles.textField}
        inputProps={{ "data-testid": "tree-select-search-box-input" }}
        InputProps={{
          classes: { input: styles.searchInput },
          endAdornment: searchText.length > 0 && (
            <IconButton
              aria-label="clear search text"
              onClick={handleClear}
              className={styles.closeIcon}
              disableTouchRipple
              data-testid="tree-select-search-box-clear"
            >
              <CloseIcon className={styles.closeIcon} />
            </IconButton>
          ),
          startAdornment: <SearchIcon className={styles.searchIcon} />,
        }}
      />
    </Box>
  );
};
