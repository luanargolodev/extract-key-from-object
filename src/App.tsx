import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { saveAs } from 'file-saver'
import typeFilter from './utils/typeFilter'

type TypeFilter = {
  value: string
  label: string
  tooltipText: string
  svgImage: string
  link: string
}

const extractSvgImages = (typeFilter: TypeFilter[]): string[] => {
  return typeFilter.map((filter) => filter.svgImage)
}

const extractValue = (typeFilter: TypeFilter[]): string[] => {
  return typeFilter.map((filter) => filter.value)
}

function formatFilterTypeSvgs(filter: string): string {
  filter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  filter = filter.replace(/\s+/g, '-')

  return filter
}

const extractAndSaveSvgImages = (
  typeFilter: TypeFilter[],
  fileName: string
): void => {
  const svgImages: string[] = extractSvgImages(typeFilter)
  const values: string[] = extractValue(typeFilter)

  const symbolImages = svgImages.map((svg, i) => {
    const id = `${formatFilterTypeSvgs(values[i])}`
    return svg
      .replace(/<svg/g, `<symbol id="${id}"`)
      .replace(/<\/svg>/g, '</symbol>')
  })

  const fileContents = symbolImages.join('\n') + '\n'

  const blob = new Blob([fileContents], { type: 'text/plain;charset=utf-8' })

  saveAs(blob, fileName)
}

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    extractAndSaveSvgImages(typeFilter, 'svgImages.txt')
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
