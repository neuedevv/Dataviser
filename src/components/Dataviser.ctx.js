/**
 * @ Author: Mo David
 * @ Create Time: 2024-07-02 20:58:02
 * @ Modified time: 2024-07-03 04:22:50
 * @ Description:
 * 
 * This holds some information about the app which we don't keep in the store.
 * For instance, reference to the currently active charts and visualizations.
 */

import { createContext } from "react"

export const DataviserContextInitial = {
  
  // Stores all our current charts and what not
  dvisuals: [
    { title: 'Migration Over Time', subtitle: '', x: 0, y: 0, w: 16, h: 6 },
    { title: 'Chord Graph', subtitle: '', x: 0, y: 8, w: 16, h: 9 },
    { title: 'Heat Map', subtitle: '', x: 16, y: 0, w: 16, h: 9 },
    { title: 'Plot Graph', subtitle: '', x: 16, y: 8, w: 16, h: 6 },
  ],
};

export const DataviserContext = createContext(
  DataviserContextInitial
); 

export default {
  DataviserContextInitial,
  DataviserContext,
}