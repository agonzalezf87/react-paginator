import { useEffect, useState } from "react"
import products from '../helpers/products.json'

const App = () => {
  let startPage = 1
  const [currentPage, setCurrentPage] = useState(1)
  const dataOffset = 15
  const pages = Math.ceil(products.length / dataOffset) 
  const pagOffset = 5

  const pagesArray = []
  
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i)
  }

  const paginate = () => {
    if (currentPage > pagOffset) startPage = (currentPage - 3)

    return (startPage === 1) ? Array.from([...pagesArray].splice(0, pagOffset)) : Array.from([...pagesArray].splice(startPage, pagOffset))
  }

  var paginator = paginate()

  const handleNextPag = (ev) => {
    ev.preventDefault()
    currentPage != pages ? setCurrentPage(currentPage + 1) : null
    if (currentPage != pages) paginator = paginate()
  }
  
  const handlePrevPag = (ev) => {
    ev.preventDefault()
    currentPage === 1 ? null : setCurrentPage(currentPage - 1)
    if (currentPage != startPage) paginator = paginate()
  }

  const handleCurrentPage = (ev) => {
    ev.preventDefault()
    const keyVal = ev.target.firstChild.data
    keyVal === 'First' 
      ? setCurrentPage(1) 
      : keyVal === 'Last' 
      ? setCurrentPage(pages) 
      : parseInt(keyVal) != currentPage 
      ? setCurrentPage(parseInt(keyVal))
      : null
  }

  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="w-full text-2xl text-center text-gray-800 font-bold p-4 mb-8">React.JS Paginator</h1>
        <div className="w-full h-auto my-4 px-12">
          <p className="text-center">Number of products: <span className="text-lg font-bold">{products.length}</span></p>
          <p className="text-center">Showing <span className="text-lg font-bold">{dataOffset}</span> products per page</p>
          <p className="text-center">Showing <span className="text-lg font-bold">{pages}</span> pages of products</p>
        </div>
        <ul className="w-full h-fit flex justify-center items-center gap-x-2 text-lg flex-wrap select-none mt-12">
          <li><a
            className={`hover:underline ${currentPage === 1 && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handlePrevPag} 
          >Prev</a></li>
          <li><a className={`hover:underline ${currentPage === 1 && 'cursor-default text-gray-400 hover:no-underline'}`} href="#" onClick={handleCurrentPage}>First</a></li>
          {paginator.map(item => (
            pages > pagOffset
              ?
                <li key={item}><a className={`hover:underline ${item === currentPage && 'font-bold underline'}`} href="#" onClick={handleCurrentPage}>{item}</a></li>
              :
                <li key={item}><a className={`hover:underline ${item === currentPage && 'font-bold underline'}`} href="#" onClick={handleCurrentPage}>{item}</a></li>
          ))}
          {pages > pagOffset &&
            <>
              <li><a className={`hover:underline ${currentPage === pages && 'cursor-default text-gray-400 hover:no-underline'}`} href="#" onClick={handleCurrentPage}>Last</a></li>
            </>
          }
          <li><a 
            className={`hover:underline ${currentPage === pages && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handleNextPag} 
          >Next</a></li>
        </ul>
      </div>
    </>
  )
}

export { App }