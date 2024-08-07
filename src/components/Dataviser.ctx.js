/**
 * @ Author: Mo David
 * @ Create Time: 2024-07-02 20:58:02
 * @ Modified time: 2024-08-03 16:41:07
 * @ Description:
 * 
 * This holds some information about the app which we don't keep in the store.
 * For instance, reference to the currently active charts and visualizations.
 */

// Utils context
import { UtilsContext } from "./utils/utils.context"

export const DataviserCtx = UtilsContext({
    
  // Stores all our current charts and what not
  dvisuals: [
    { id: '_' + crypto.randomUUID(), static: true, class: 'overview', type: 'line', title: 'Migration Over Time per Province', subtitle: 'Immigration over time.', x: 0, y: 0, w: 16, h: 6, orient: 'cols', exclude: [ 'sum' ] },
    { id: '_' + crypto.randomUUID(), static: true, class: 'overview', type: 'chord', title: 'Migration Across Provinces', subtitle: 'Note that the totals shown here are only across the selected provinces.', x: 0, y: 6, w: 16, h: 9, orient: '', exclude: [ 'sum' ], deepFilter: true, },
    { id: '_' + crypto.randomUUID(), static: true, class: 'overview', type: 'choropleth', title: 'Heat Map of Immigration per Province', subtitle: '', x: 16, y: 0, w: 16, h: 9, orient: '' },
    { id: '_' + crypto.randomUUID(), static: true, class: 'overview', type: 'bar', title: 'Total Migration per Province', subtitle: '', x: 16, y: 9, w: 16, h: 6, orient: '', exclude: [ 'sum' ], },
    { id: '_' + crypto.randomUUID(), static: true, class: 'regional', type: 'form', title: 'Select a Province', subtitle: '', x: 0, y: 0, w: 6, h: 15, orient: '', exclude: [ 'sum' ], },
    { id: '_' + crypto.randomUUID(), static: true, class: 'regional', type: 'sankey', title: 'Province Sankey Plot', subtitle: '', x: 6, y: 0, w: 26, h: 15, orient: '', exclude: [ 'sum' ], },
  ],

  // Associates keys with colors from the palette
  colorTable: {},

  // The palette to use for all the visualizations
  // These colors were generated through chroma-js
  palette: [ '#22333B', '#EDCB96', '#F08080', '#721817', '#0B6E4F' ],

  // Width and height
  width: 1.0,
  height: 0.85,
  headerHeight: 0.15,

  // The number of rows and columns
  rowCount: 15,
  colCount: 32,

  // The subject we're focusing on in the next page
  subject: null,
});

export const DataviserManager = (function() {
  
  const _ = {};

  /**
   * Adds a new dvisual component to the state.
   * 
   * @param   { State }   state     The dataviser state.
   * @param   { object }  options   The options for the new dvisual.
   */
  _.dvisualCreate = function(state, options) {
    
    // Grab the details of the options
    const id = crypto.randomUUID();
    const title = options.title ?? 'New graph';
    const subtitle = options.subtitle ?? 'click the icon on the upper right to edit this graph.'
    
    // Position and sizing
    const x = options.x ?? 0;
    const y = options.y ?? 0;
    const w = options.w ?? 10;
    const h = options.h ?? 6;

    // Get the existing visuals
    const dvisuals = state.get('dvisuals').filter(dvisual => dvisual);
    
    // Append the new visual
    dvisuals.push({
      id, title, subtitle, x, y, w, h
    })

    // Update the state
    state.set({ dvisuals })
  }

  /**
   * Updates the state of one of the dvisual components.
   * 
   * @param   { State }   state     The dataviser state.
   * @param   { object }  options   The options for the updated dvisual.
   */
  _.dvisualUpdate = function(state, options) {

    // Grab the id
    const id = options.id ?? options.i ?? null;

    // Nothing to update
    if(!id) return;

    // Get the selected visual and the old ones
    const dvisual = state.get('dvisuals').filter(dvisual => dvisual.id == id)[0];
    const dvisuals = state.get('dvisuals').filter(dvisual => dvisual.id != id);

    // Replace the old dvisual
    dvisuals.push({ ...dvisual, ...options });

    // We don't want a rerender here so we manually change it
    state._.dvisuals = dvisuals;
  }

  /**
   * Removes one of the dvisual components.
   * 
   * @param   { State }   state     The dataviser state.
   * @param   { object }  options   The options for the updated dvisual.
   */
  _.dvisualRemove = function(state, options) {
    
    // Grab the id
    const id = options.id ?? options.i ?? null;

    // Nothing to update
    if(!id) return;

    // Exclude the dvisual with the given id
    const dvisuals = state.get('dvisuals').filter(dvisual => dvisual.id != id);

    // Nothing to remove
    if(dvisuals.length == state.get('dvisuals').length)
      return;

    // Update the state
    state.set({ dvisuals })
  }

  /**
   * Retrieves a color from the palette with the given key.
   * If the key is not in the color table, an association is generated for that key.
   * 
   * @param   { State }   state     The dataviser state.
   * @param   { object }  options   The options for the updated dvisual.
   */
  _.paletteGet = function(state, options) {

    // Grab the key we want
    const key = options.key ?? '';
    
    // Grab the state components we need
    const palette = state.get('palette');
    const colorTable = state.get('colorTable');

    // Check if key in table, and if not generate new color
    if(!colorTable[key]) {
      colorTable[key] = palette[Math.floor(Math.random() * palette.length)];
    
      // Update the state
      state._.colorTable = colorTable;
    }

    // Return the color
    return colorTable[key];
  }

  return {
    ..._,
  }
})()

export default {
  DataviserCtx,
  DataviserManager,
}