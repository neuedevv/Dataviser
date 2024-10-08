/**
 * @ Author: Mo David
 * @ Create Time: 2024-07-25 17:44:22
 * @ Modified time: 2024-08-02 20:48:42
 * @ Description:
 * 
 * Represents how we get user input through dvisuals.
 */

import * as React from 'react'
import { useMemo } from 'react'

// Chakra
import { Heading, Text } from '@chakra-ui/react'
import { Divider, Flex, Select, VStack } from '@chakra-ui/react'

// State managers
import { DataviserCtx, DataviserManager } from '../Dataviser.ctx';

/**
 * A form component.
 * 
 * @component
 */
export function DForm(props={}) {

  // Get the state
  const _dataviserState = DataviserCtx.useCtx();

  // The form title and subtitle
  const _title = props.title ?? 'Form';
  const _subtitle = props.title ?? 'Fill in the necessary information.'
  const _data = props.data ?? [];
  const _suggestions = _data[0] ? Object.keys(_data[0].y) : [];

  /**
   * Run the callback after selecting an option.
   * 
   * // ! fix this infinite loop ????
   */
  function onSelect(e) {
    if(_dataviserState.get('subject') != e.target.value && e.target.value)
      _dataviserState.set({ subject: e.target.value });
  }
  
  return (<>
    <_DFormHeader title={ _title } subtitle={ _subtitle } />
    <Select placeholder='none selected' size="sm" onChange={ e => onSelect(e) }>
      { _suggestions.map(suggestion => {

        // Create the option
        return (<option key={ suggestion } value={ suggestion }>{ suggestion }</option>)
      })}
    </Select>
  </>)
}

/**
 * The form header.
 * 
 * @component 
 */
function _DFormHeader(props={}) {

  // The title and subtitle
  const _title = props.title ?? 'Form';
  const _subtitle = props.title ?? 'Fill in the necessary information.'

  return (
    <VStack align="left">
      <Flex>
        <VStack p="0" m="0" mr="1em" spacing="0" align="left">
          <b><Heading fontSize="1rem">
            { _title }
          </Heading></b>
          <Text fontSize="0.5rem">
            { _subtitle }
          </Text>
        </VStack>
      </Flex>
      <Divider />
    </VStack>
  ) 
}