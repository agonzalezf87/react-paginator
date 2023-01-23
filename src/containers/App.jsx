import { useEffect, useState } from "react"
import { MdChevronLeft, MdChevronRight, MdFirstPage, MdLastPage } from 'react-icons/md'
import products from '../helpers/products.json'

const App = () => {
  let startPage = 1
  const [currentPage, setCurrentPage] = useState(1)
  const [paginator, setPaginator] = useState([])
  const [populator, setPopulator] = useState([])
  const dataOffset = 10
  const pages = Math.ceil(products.length / dataOffset) 
  const pagOffset = 7
  const data = products.length

  const pagesArray = []
  
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i)
  }

  useEffect(() => {
    if (currentPage >= pagOffset) startPage = pagOffset % 2 === 0 ? pagOffset / 2 : (currentPage - Math.ceil(pagOffset / 2))
    setPaginator(paginate())
    setPopulator(populate(products))
  },[currentPage])

  useEffect(() => {
    console.log(populator)
  },[populator])
  
  const paginate = () => {
    return startPage === 1 ? Array.from([...pagesArray].splice(0, pagOffset)) : (pages - currentPage) < pagOffset ? Array.from([...pagesArray].splice((pages - pagOffset), pagOffset)) : Array.from([...pagesArray].splice(startPage, pagOffset))
  }

  const populate = (arr) => {
    return startPage === 1 ? Array.from(arr.splice(0, pagOffset)) : (pages - currentPage) < pagOffset ? Array.from(arr.splice((pages - pagOffset), pagOffset)) : Array.from(arr.splice(startPage, pagOffset))
  }
    
  const handleNextPag = (ev) => {
    ev.preventDefault()
    currentPage != pages ? setCurrentPage(currentPage + 1) : null
  }
  
  const handlePrevPag = (ev) => {
    ev.preventDefault()
    currentPage === 1 ? null : setCurrentPage(currentPage - 1)
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
      <div className="w-4/5 h-screen m-auto">
        <h1 className="w-full text-2xl text-center text-gray-800 font-bold p-4 mb-8 ease-in-out transition-all duration-300">React.JS Paginator</h1>
        <div>
          <div>
            <div></div>
          </div>
        </div>
        <div className="w-full h-12 flex justify-between items-center border-t border-indigo-300 pt-4 px-4">
          <div className="w-1/2 lg:w-1/4 h-full flex items-center text-gray-600">
            <p className="sm:block text-sm text-center"><span className="font-semibold">{currentPage > 1 ? ((dataOffset * currentPage) - dataOffset) + 1 : currentPage}</span> to <span className="font-semibold">{currentPage < pages ? currentPage * dataOffset : data}</span><span className="hidden sm:inline"> items of </span><span className="font-semibold hidden sm:inline">{data}</span></p>
          </div>
          <div className="w-1/2 lg:w-2/4">
            <ul className="w-full h-fit flex justify-end items-center select-none text-blue-900 font-medium">
              <li className="flex items-center w-6 h-10 bg-zync-100">
                <a
                  className={`inline-flex justify-center items-center w-full h-full ${currentPage === 1 ? 'cursor-default text-indigo-200' : ''}`} 
                  href="#" 
                  onClick={handlePrevPag} 
                  ><MdChevronLeft className="w-6 h-6"/>
                </a>
              </li>
              <li className="flex items-center w-6 h-10 bg-zync-100">
                <a 
                  className={`inline-flex justify-center items-center w-full h-full ${currentPage === 1 ? 'cursor-default text-indigo-200' : ''}`} 
                  href="#" 
                  id="first"
                  onClick={handleFirstPage}
                ><MdFirstPage className="w-6 h-6"/></a>
              </li>
              {paginator.map(item => (
                pages > pagOffset
                  ?
                    <li key={item} className={`hidden sm:flex items-center w-6 h-10 text-center bg-zync-100 ${item === currentPage ? 'border-b-2 border-indigo-700 mx-1' : ''}`}><a className={`inline-flex justify-center items-center w-full h-full`} href="#" onClick={handleCurrentPage}><span className={`inline-flex text-base leading-none ${item === currentPage ? 'font-extrabold text-xl' : ''}`}>{item}</span></a></li>
                  :
                    <li key={item} className={`hidden sm:flex items-center w-6 h-10 text-center bg-zync-100 ${item === currentPage ? 'border-b-2 border-indigo-700 mx-1' : ''}`}><a className={`inline-flex justify-center items-center w-full h-full`} href="#" onClick={handleCurrentPage}><span className={`inline-flex text-base leading-none ${item === currentPage ? 'font-extrabold text-xl' : ''}`}>{item}</span></a></li>
              ))}
              {pages > pagOffset &&
                <>
                  <li className="flex items-center w-6 h-10 bg-zync-100">
                    <a 
                      className={`inline-flex justify-center items-center w-full h-full ${currentPage === pages ? 'cursor-default text-gray-200' : ''}`} 
                      href="#" 
                      id="last"
                      onClick={handleLastPage}
                    ><MdLastPage className="w-6 h-6"/></a>
                  </li>
                </>
              }
              <li className="flex items-center w-6 h-10 bg-zync-100">
                <a 
                  className={`inline-flex justify-center items-center w-full h-full ${currentPage === pages ? 'cursor-default text-gray-200' : ''}`} 
                  href="#" 
                  onClick={handleNextPag} 
                ><MdChevronRight className="w-6 h-6"/></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export { App }