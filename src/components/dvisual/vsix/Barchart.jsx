/**
 * @ Author: Mo David
 * @ Create Time: 2024-07-09 11:09:03
 * @ Modified time: 2024-07-15 17:08:51
 * @ Description:
 * 
 * Creates a bar chart using the visx library.
 */

import * as React from 'react'

// Visx
import { AnimatedAxis, AnimatedGridRows } from '@visx/react-spring'
import { Group } from '@visx/group'
import { Bar } from '@visx/shape'
import { useTooltip, useTooltipInPortal, TooltipWithBounds } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import * as Scale from '@visx/scale'

/**
 * The linechart component.
 * 
 * @component
 */
export function Barchart(props={}) {

  // Grab the props
  const _data = props.data;             // Contains all the data of all the series
  const _width = props.width ?? 0;      // The width of the visual
  const _height = props.height ?? 0;    // The height of the visual
  const _margin = props.margin ?? 50;   // The margins
  
  // Create the actual data we want
  const _chartData = []
  const _sumDf = {}

  // Create the sum df
  _data.forEach(data => {
    const df = data.y
    
    Object.keys(df).forEach(col => {
      Object.keys(df[col]).forEach(row => {
        if(!_sumDf[col]) _sumDf[col] = {};
        if(!_sumDf[col][row]) _sumDf[col][row] = 0;
        
        // Sum them all
        _sumDf[col][row] += df[col][row];
      })
    })
  })
  
  // Add the immigration stats

  // Add the emmigration stats
  Object.keys(_sumDf).forEach(col => {
    _chartData.push({
      x: col,
      y: Object.values(_sumDf[col]).reduce((a, b) => (a + b), 0)
    })
  })

  // Get the top 5 or smth
  _chartData.sort((a, b) => b.y - a.y);
  _chartData.splice(5);

  // Tooltip state
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { containerRef: _containerRef, TooltipInPortal: _TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  })

  // scales, memoize for performance
  const xScale = Scale.scaleBand({
    range: [0, _width],
    round: true,
    domain: _chartData.map(d => d.x),
    padding: 0.4,
  })

  const yScale = Scale.scaleLinear({
    range: [_height - _margin, 0],
    round: true,
    domain: [0, 6000],  // ! dont hardcode this part
  })

  /**
   * For the tooltip.
   * 
   * @param   { Event }   event 
   * @param   { object }  datum 
   */
  const onMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);

    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };
  
  return (
    <div style={{ position: 'relative'}}>
      <svg ref={ _containerRef } width={ _width } height={ _height }>
        <Group>
          {_chartData.map((d) => {

            const barWidth = xScale.bandwidth();
            const barHeight = _height - _margin - yScale(d.y);
            const barX = xScale(d.x);
            const barY = _height - barHeight - _margin / 2;

            return (
              <Bar
                key={`bar-${d.x}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="rgba(23, 200, 217, 1)"
                onMouseOver={ (e) => onMouseOver(e, d) }
                onMouseOut={ (e) => hideTooltip(e) }
              />
            );
          })}
        </Group>
        <AnimatedAxis orientation="bottom"
          top={_height - _margin / 2 } 
          scale={ xScale }
          stroke={ 'rgba(0, 0, 0, 0.5)' }
          tickLineProps={{
            stroke: 'rgba(0, 0, 0, 0)'
          }}
        />
        <AnimatedAxis orientation="left"
          scale={ yScale }
          top={ _margin / 2 } 
          left={ _margin }
          numTicks={ 4 }
          stroke={ 'rgba(0, 0, 0, 0)' }
          tickLineProps={{
            stroke: 'rgba(0, 0, 0, 0.5)'
          }}
        />
      </svg>
      {tooltipOpen && (
        <_TooltipInPortal
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <strong>{tooltipData.x}</strong><br />
          {tooltipData.y}
        </_TooltipInPortal>
      )}
    </div>
  )
}