import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import BeerCard from './components/BeerCard.js'
import loading from './components/img/loading.gif'

function App() {
  const [beerList, setBeerList] = useState([])
  const [value, setValue] = useState([])
  const [sortedValue, setSortedValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [maxItemsPerPage, setMaxItemsPerPage] = useState(10)
  const [showList, setShowList] = useState([])
  const [maxPageNumber, setMaxPageNumber] = useState (0)

  const loadBeerList = async () => {
    await axios.get('http://localhost:5000/beer')
      .then((response) => setBeerList(response.data))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    loadBeerList()
  }, [])

  function handleReset() {
    loadBeerList()
  }
  const handleSearch = async (event) => {
    event.preventDefault()
    return await axios.get(`http://localhost:5000/beer?q=${value}`)
      .then((response) => {
        setBeerList(response.data)
        setValue('')
      })
  }
  const handleFilter = async (event) => {
    let value = event.target.value
    setSortedValue(value)
    return await axios.get(`http://localhost:5000/beer?_sort=${value}&_order=asc`)
      .then((response) => {
        setBeerList(response.data)
      })
  }

  function paginator(itensArray, actualPage, itensPerPage) {
    let page = actualPage || 1
    let perPage = itensPerPage || maxItemsPerPage
    let offset = (page - 1) * perPage
    let paginatedItems = itensArray.slice(offset).slice(0, itensPerPage)
    let totalPages = Math.ceil(itensArray.length / perPage)

    return {
      page: page,
      perPage: perPage,
      prevPag: page - 1 ? page - 1 : null,
      nextPag: (totalPages > page) ? page + 1 : null,
      total: itensArray.length,
      totalPages: totalPages,
      data: paginatedItems
    }
  }

  useEffect(() => {
    setShowList(paginator(beerList, 1, maxItemsPerPage).data)
  }, [beerList])

  useEffect(() => {
    setShowList(paginator(beerList, currentPage, maxItemsPerPage).data)
  }, [maxItemsPerPage, currentPage])

  useEffect(() => {
    setMaxPageNumber(paginator(beerList, currentPage, maxItemsPerPage).totalPages)
  },[showList])

  function handleNextPage() {
    if (currentPage < maxPageNumber) {
      setCurrentPage(currentPage + 1)
    }
  }
  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function handleMaxPageItemChange(event) {
    setMaxItemsPerPage(event.target.value)
  }

  return (
    <div className='App'>
      <div><h2>The Beer Database</h2></div>

      <div className="nav-container">
        <div className="search-bar">
          <div className="search-term">
            <input type='text' placeholder='Search' value={value} onChange={(event) => setValue(event.target.value)}></input>
            <form onSubmit={handleSearch}>
            <div className='btn-group'>
              <button type='submit' color='dark'>Search</button>
              <button color='info' onClick={() => handleReset()}>Reset</button>
            </div>
          </form>
          </div>
          
          <div className="sort-by">
            <h4>sort by:</h4>
            <select style={{ borderRadius: '5px' }} onChange={handleFilter} value={sortedValue}>
              <option>Select filter</option>
              <option value='name'>Name</option>
              <option value='country'>Country</option>
              <option value='category'>Category</option>
              <option value='city'>City</option>
              <option value='state'>State</option>
            </select>
          </div>
        </div>
        <div className="pag-nav">
          <div className="prev-button">
            <button type='button' className='nav-buttons' onClick={handlePreviousPage}>Prev</button>
          </div>
          <div className="page-of-pages">
            <div className='page-counter'>{currentPage} of {maxPageNumber}</div>
          </div>
          <div className="next-button">
            <button type='button' className='nav-buttons' onClick={handleNextPage}>Next</button>
          </div>
          <div className="max-page-limit">
            <select name='pages' onChange={handleMaxPageItemChange} className='max-items'>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
              <option value='25'>25</option>
              <option value='30'>30</option>
              <option value='35'>35</option>
              <option value='40'>40</option>
              <option value='45'>45</option>
              <option value='50'>50</option>
            </select>
          </div>
        </div>
      </div>

      <div className="body-content-cards">
        {
          showList.length > 0 ? showList.map((beer, index) => {
            return (<BeerCard beer={beer} key={index} />)
          }) : <img src={loading}></img>

        }
      </div>
    </div>
  )
}

export default App;
