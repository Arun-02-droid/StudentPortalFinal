/**
 * Utility functions for the student portal
 */

/**
 * Returns the current date in "DD Month" format
 * @returns {string} Formatted date
 */
export const formatDate = () => {
    const today = new Date();
    const options = { day: 'numeric', month: 'long' };
    return today.toLocaleDateString('en-GB', options);
  };
  
  /**
   * Downloads a file from the given path
   * @param {string} filePath - Path to the file
   */
  export const downloadFile = (filePath) => {
    console.log(`Downloading: ${filePath}`);
    
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };