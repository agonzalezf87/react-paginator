import { useState } from "react"

const App = () => {
  const [start, setStart] = useState(1)
  const [total, setTotal] = useState(25)
  const [offset, setOffset] = useState(3)
  const [current, setCurrent] = useState(1)
  const [show, setShow] = useState(5)
  const [pages, setPages] = useState(Math.round(total / offset))

  const paginate = () => {
    let result = []

    for (let i = start; i <= pages; i++) {
      result.push(i)
    }

    return result
  }

  var paginator = paginate()

  const handleNext = (ev) => {
    ev.preventDefault()
    current != pages ? setCurrent(current + 1) : setCurrent(pages)
    if (current != pages) paginator = paginate()
  }
  
  const handlePrev = (ev) => {
    ev.preventDefault()
    current != start ? setCurrent(current - 1) : setCurrent(start)
    if (current != start) paginator = paginate()
  }

  return (
    <>
      <div className="w-screen h-screen">
        <h1 className="w-full text-2xl text-center text-gray-800 font-bold p-4 mb-8">React.JS Paginator</h1>
        <ul className="w-full h-fit flex justify-center items-center gap-x-2 text-lg flex-wrap">
          <li><a
            className={`hover:underline ${current === start && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handlePrev} 
          >Prev</a></li>
          {paginator.map(item => (
            item != current
              ?
                <li key={item}><a className="hover:underline" href="#" onClick={(ev) => ev.preventDefault()}>{item}</a></li>
              :
                <li key={item}><a className="font-bold underline cursor-default" href="#" onClick={(ev) => ev.preventDefault()}>{item}</a></li>
          ))}
          <li><a 
            className={`hover:underline ${current === pages && 'cursor-default text-gray-400 hover:no-underline'}`} 
            href="#" 
            onClick={handleNext} 
          >Next</a></li>
        </ul>
      </div>
    </>
  )
}

export { App }