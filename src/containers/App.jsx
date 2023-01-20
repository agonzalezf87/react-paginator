import { useEffect, useState } from "react"
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/md'
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
    if (currentPage >= pagOffset) startPage = (currentPage - 3)
    
    return startPage === 1 ? Array.from([...pagesArray].splice(0, pagOffset)) : (pages - currentPage) < pagOffset ? Array.from([...pagesArray].splice((pages - pagOffset), pagOffset)) : Array.from([...pagesArray].splice(startPage, pagOffset))
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

  const handleFirstPage = (ev) => {
    ev.preventDefault()
    currentPage !== 1 && setCurrentPage(1)
  }

  const handleLastPage = (ev) => {
    ev.preventDefault()
    currentPage !== pages && setCurrentPage(pages)
  }

  const handleCurrentPage = (ev) => {
    ev.preventDefault()
    let keyVal = parseInt(ev.target.innerText)

    keyVal != currentPage && setCurrentPage(keyVal)
  }

  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="w-full text-2xl text-center text-gray-800 font-bold p-4 mb-8 ease-in-out transition-all duration-300">React.JS Paginator</h1>
        <div className="w-full h-auto my-4 px-12">
          <p className="text-center">Number of products: <span className="text-lg font-bold">{products.length}</span></p>
          <p className="text-center">Showing <span className="text-lg font-bold">{dataOffset}</span> products per page</p>
          <p className="text-center">Showing <span className="text-lg font-bold">{pages}</span> pages of products</p>
        </div>
        <ul className="w-full h-fit flex justify-center items-center gap-x-1 text-lg select-none mt-12">
          <li className="bg-gray-200 rounded-md border border-gray-400 flex items-center py-1"><a
            className={`inline-block w-full h-full hover:underline ${currentPage === 1 && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handlePrevPag} 
          ><MdChevronLeft style={{ height: '24px', width: '24px' }} /></a></li>
          <li className="bg-gray-200 rounded-md border border-gray-400 flex items-center py-1"><a 
            className={`inline-block w-full h-full hover:underline ${currentPage === 1 && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            id="first"
            onClick={handleFirstPage}
          ><MdFirstPage style={{ height: '24px', width: '24px' }}/></a></li>
          {paginator.map(item => (
            pages > pagOffset
              ?
                <li key={item} className="bg-gray-200 rounded-md border border-gray-400 text-base w-8 py-1 text-center"><a className={`inline-block w-full h-full hover:underline ${item === currentPage && 'font-bold'}`} href="#" onClick={handleCurrentPage}>{item}</a></li>
              :
                <li key={item} className="bg-gray-200 rounded-md border border-gray-400 text-base w-8 py-1 text-center"><a className={`inline-block w-full h-full hover:underline ${item === currentPage && 'font-bold'}`} href="#" onClick={handleCurrentPage}>{item}</a></li>
          ))}
          {pages > pagOffset &&
            <>
              <li className="bg-gray-200 rounded-md border border-gray-400 flex items-center py-1"><a 
              className={`inline-block w-full h-full hover:underline ${currentPage === pages && 'cursor-default text-gray-400 hover:no-underline'}`} 
              href="#" 
              id="last"
              onClick={handleLastPage}
            ><MdLastPage style={{ height: '24px', width: '24px' }} /></a></li>
            </>
          }
          <li className="bg-gray-200 rounded-md border border-gray-400 flex items-center py-1"><a 
            className={`inline-block w-full h-full hover:underline ${currentPage === pages && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handleNextPag} 
          ><MdChevronRight style={{ height: '24px', width: '24px' }} /></a></li>
        </ul>
      </div>
    </>
  )
}

export { App }