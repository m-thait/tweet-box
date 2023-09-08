import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, TextField } from "@mui/material";
import { LoadingStates } from "@constants/filter";
import styles from "./SearchBox.module.scss";

export interface SearchBoxProps {
  onChange: ((term: string) => void) | undefined;
  onClear?: () => void;
  isFilterLoading: LoadingStates;
}
export const SearchBox = ({
  onChange,
  onClear,
  isFilterLoading,
}: SearchBoxProps) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (
      isFilterLoading === LoadingStates.LOADED &&
      onChange &&
      searchText.length > 2
    ) {
      onChange(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterLoading, onChange]);
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
      if (value.length > 2) {
        if (onChange) {
          onChange(value);
        }
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
        variant="standard"
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
          disableUnderline: true,
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
        }}
      />
      <Divider className={styles.divider} />
    </Box>
  );
};
