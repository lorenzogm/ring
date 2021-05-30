import ReactDatasheet from 'react-datasheet'
import styled from 'styled-components'
import Button from '@ring/components/Button'

import 'react-datasheet/lib/react-datasheet.css'
import { SpreadsheetProps } from './index.d'

export default function Spreadsheet({ data, setData }: SpreadsheetProps) {
  const valueRenderer: ReactDatasheet.ValueRenderer<
    ReactDatasheet.Cell<any, any>,
    unknown
    // @ts-expect-error no idea, no time
  > = (cell) => cell.value
  const onCellsChanged: ReactDatasheet.CellsChangedHandler<
    ReactDatasheet.Cell<any, any>,
    unknown
  > = (changes) => {
    const dataUpdated = data
    changes.map(({ row, col, value }) => {
      // @ts-expect-error no idea, no time
      dataUpdated[row][col] = { ...data[row][col], value }
    })

    setData(dataUpdated)
  }
  const onContextMenu: ReactDatasheet.ContextMenuHandler<
    ReactDatasheet.Cell<any, any>,
    unknown
  > = (e, cell) => (cell.readOnly ? e.preventDefault() : null)

  return (
    <>
      <ReactDatasheetStyled
        data={data as ReactDatasheet.Cell<any, any>[][]}
        valueRenderer={valueRenderer}
        onContextMenu={onContextMenu}
        onCellsChanged={onCellsChanged}
      />
      <Button onClick={addRow}>Add row</Button>
    </>
  )

  function addRow() {
    setData([
      ...data,
      Array.from({ length: data[0].length }, () => ({ value: '' })),
    ])
  }
}

const ReactDatasheetStyled = styled(ReactDatasheet)`
  width: 100%;
  .data-grid-container {
  }
`