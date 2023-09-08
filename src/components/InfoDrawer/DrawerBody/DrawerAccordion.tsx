import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import color from "@moodys/mdc-frontend.theming.colors";
import { accordionItems } from "@constants/drawer";
import styles from "./DrawerBody.module.scss";

export const getAccordionBarColor = (score: number) => {
  switch (score) {
    case 1:
      return color.globalGreen600;
    case 2:
      return color.globalCyan600;
    case 3:
      return color.globalYellow600;
    case 4:
      return color.globalOrange600;
    case 5:
      return color.globalRed600;
    default:
      return "";
  }
};

interface AccordionProps {
  accordionData?: accordionItems[];
}

export const DrawerAccordion = ({
  accordionData,
}: AccordionProps): JSX.Element | null => {
  if (!accordionData) return null;
  return (
    <Box>
      {accordionData.map(({ titles, score, description, content }) => {
        return (
          <Accordion
            className={styles.accordionWrapper}
            key={`accordion-${score}`}
            disableGutters={true}
            data-testid={`accordion-${score}`}
          >
            <AccordionSummary
              className={styles.accordionSummary}
              expandIcon={<ExpandMore />}
              data-testid={`accordion-button-${score}`}
            >
              <div
                className={styles.accordionBar}
                data-testid={`accordion-color-${score}`}
                style={{ backgroundColor: getAccordionBarColor(score) }}
              />
              <Box className={styles.accordionTitleWrapper}>
                {titles.map((title) => (
                  <Typography
                    component="span"
                    className={styles.accordionTitle}
                    key={title}
                  >
                    {title}
                  </Typography>
                ))}
              </Box>
              <Typography
                component="span"
                className={styles.accordionDescription}
                data-testid={`accordion-description-${score}`}
              >
                {description}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                className={styles.accordionContent}
                data-testid={`accordion-content-${score}`}
              >
                {content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
