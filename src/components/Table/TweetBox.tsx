import styles from "./TweetBox.module.scss";
import { Box } from "@mui/material";

export const TweetBox = (message: string | undefined) => {
    return (
      <Box className={styles.container}>
          <Box className={styles.whitebox}>
            <Box className={styles.tweet}> 
              {/* <p> What's happening? </p> */}
              {message}
            </Box>
            <Box className={styles.privacy}>
              <i className="fa-solid fa-globe-asia"></i>
              <span> Everyone can reply</span>
            </Box>
            <Box className={styles.bottom}>
              <Box className={styles.icons}>
                <i className="fas fa-expand"></i>
                <i className="far fa-file-image"></i>
                <i className="fas fa-map-marker-alt"></i>
                <i className="far fa-grin"></i>
                <i className="far fa-user"></i>
              </Box>
              <Box className={styles.right}>
                <span className={styles.count}> 145 </span>
                <button> Tweet </button>
              </Box>
            </Box>
          </Box>
        </Box>
    )
  }