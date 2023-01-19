import { useEffect, useState } from "react"
import products from '../helpers/products.json'

const App = () => {
  const [start, setStart] = useState(0)
  const [offset, setOffset] = useState(5)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    console.log(current)
  },[current])

  const paginate = () => {
    let pagStart = start,
        mainArray = [],
        result = []
    ;

    if (current > offset) pagStart = current - 3

    for (let i = 0; i < products.length; i++) {
      mainArray.push(i+1)
    }

    result = Array.from([...mainArray].splice(pagStart, offset))

    return result
  }

  var paginator = paginate()

  const handleNext = (ev) => {
    ev.preventDefault()
    current != products.length ? setCurrent(current + 1) : setCurrent(products.length)
    if (current != products.length) paginator = paginate()
  }
  
  const handlePrev = (ev) => {
    ev.preventDefault()
    current != 1 ? setCurrent(current - 1) : setCurrent(start)
    if (current != start) paginator = paginate()
  }

  const handleCurrent = (ev) => {
    ev.preventDefault()
    setCurrent(parseInt(ev.target.firstChild.data))
  }

  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="w-full text-2xl text-center text-gray-800 font-bold p-4 mb-8">React.JS Paginator</h1>
        <ul className="w-full h-fit flex justify-center items-center gap-x-2 text-lg flex-wrap">
          <li><a
            className={`hover:underline ${current === 1 && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handlePrev} 
          >Prev</a></li>
          {products.length > offset && current > offset &&
            <li className="text-gray-500 select-none">...</li>
          }
          {paginator.map(item => (
            products.length > offset
              ?
                <li key={item}><a className={`hover:underline ${item === current && 'font-bold underline'}`} href="#" onClick={handleCurrent}>{
                  item < 10 ? ` ${item}` : item
                  }</a></li>
              :
                <li key={item}><a className={`hover:underline ${item === current && 'font-bold underline'}`} href="#" onClick={handleCurrent}>{
                  item < 10 ? ` ${item}` : item
                  }</a></li>
          ))}
          {products.length > offset && (products.length-current) > 3 &&
            <>
              <li className="text-gray-500 select-none">...</li>
              <li><a className={`hover:underline ${products.length === current && 'font-bold underline'}`} href="#" onClick={handleCurrent}>{products.length}</a></li>
            </>
          }
          <li><a 
            className={`hover:underline ${current === products.length && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handleNext} 
          >Next</a></li>
        </ul>
      </div>
    </>
  )
}

export { App }