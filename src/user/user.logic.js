/**
 * @ Author: Mo David
 * @ Create Time: 2024-07-13 15:58:45
 * @ Modified time: 2024-08-12 13:50:53
 * @ Description:
 * 
 * A file that holds the logic specific to the files we're using.
 */

export const UserLogic = (function() {

  const _ = {}

  /**
   * A function that extracts metadata from the filenames of our files.
   * Extracts the date of the file from the filename.
   * 
   * @param   { string }  filename  The name of the file to parse.
   * @return  { object }            Contains date information about the file.
   */
  _.metaParser = function(filename) {
    
    // Define some other params abt the file
    const dateString = filename.split('_').slice(-1)[0].split('.')[0];
    const months = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];
    
    // Define the date params
    const day = parseInt(dateString.slice(-2))
    const month = months.indexOf(dateString.slice(0, 3).toLowerCase())
    const year = 2024;
    const date = (new Date(year, month, day)).getTime();

    // Return the metadata
    return { day, month, year, date };
  }

  /**
   * Tells us whether or not metaA comes before or after metaB.
   * 
   * @param   { object }  metaA   The first metadata instance.
   * @param   { object }  metaB   The second metadata instance.
   * @return  { number }          -1 means metaA < metaB, 0 means theyre the same, 1 means metaA > metaB
   */
  _.metaComparator = function(metaA, metaB) {
    if(metaA.date > metaB.date)
      return 1;
    if(metaA.date < metaB.date)
      return -1;
    return 0;
  }

  /**
   * Returns the minimum value of each property in the metadata.
   * 
   * @param   { object }  metadata  The meta data to get the minimum of.
   * @return  { object }            An object containing the minimum of each metadata property.
   */
  _.getMetaMin = function(metadata) {

    // Stores the minimum of each metadata property
    const out = {};

    // For each piece of metadata...
    Object.keys(metadata).forEach(metadataKey => {
      
      // Grab the metadata piece
      const d = metadata[metadataKey];
      
      // For each metadata property
      Object.keys(d).forEach(key => {
        
        // If the key hasn't been placed in the out object
        if(!Object.keys(out).includes(key))
          out[key] = d[key]

        // Otherwise, compare the values
        if(out[key] > d[key])
          out[key] = d[key]
      })
    })
    
    return out;
  }

  /**
   * Returns the maximum value of each property in the metadata.
   * 
   * @param   { object }  metadata  The meta data to get the maximum of.
   * @return  { object }            An object containing the maximum of each metadata property.
   */
  _.getMetaMax = function(metadata) {

    // Stores the maximum of each metadata property
    const out = {};

    // For each piece of metadata...
    Object.keys(metadata).forEach(metadataKey => {
      
      // Grab the metadata piece
      const d = metadata[metadataKey];
      
      // For each metadata property
      Object.keys(d).forEach(key => {
        
        // If the key hasn't been placed in the out object
        if(!Object.keys(out).includes(key))
          out[key] = d[key]

        // Otherwise, compare the values
        if(out[key] < d[key])
          out[key] = d[key]
      })
    })
    
    return out;
  }

  return {
    ..._,
  }
})();

export default {
  UserLogic,
}
