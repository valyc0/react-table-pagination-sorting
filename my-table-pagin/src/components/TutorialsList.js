import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import ExportToExcel from "../utils/ExportToExcel";


const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const [spinner, setSpinner] = useState(false);

  const pageSizes = [3, 6, 9];
  const fileName = "myfile"; // here enter filename for your excel file

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getSortIcon = (accessor) => {
    if (accessor === sortField) {
      return order === 'asc' ? ' 🔼' : ' 🔽';
    }
    return null;
  };

  const handleSortingChange = (accessor) => {
    console.log("handleSortingChange:" + accessor);
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    //handleSorting(accessor, sortOrder);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    if (sortField) {
      //const sort = "`${sortField},${order}`";
      const sort = sortField + "," + order;
      params["sort"] = sort;
    }

    return params;
  };

  const retrieveTutorials = () => {
    const params = getRequestParams(searchTitle, page, pageSize);
    setSpinner(true);
    TutorialDataService.getAll(params)
      .then((response) => {
        setSpinner(false);
        const { tutorials, totalPages } = response.data;

        setTutorials(tutorials);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveTutorials, [page, pageSize, sortField, order]);

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    //setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    //setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const handleExportClick = () => {
    const params = getRequestParams(searchTitle, 0, 1000000);
    setSpinner(true);
    TutorialDataService.getAll(params)
      .then((response) => {
        const { tutorials } = response.data;
        setSpinner(false);
        ExportToExcel.exportFile(fileName, tutorials);

      })
      .catch((e) => {
        console.log(e);
      });

  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  // definizione delle colonne associate a campi oggetto
  const columns = [
    {
      header: "Employee Id",
      accessorKey: "id",
      sortable: true,
    },
    {
      header: "Employee title",
      accessorKey: "title",
      sortable: true,
    },
    {
      header: "Employee description",
      accessorKey: "description",
      sortable: false,
    },
  ];

  return (

    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTutorials}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="col-md-6">
          <h4>Tutorials List</h4>

        </div>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessorKey}
                  onClick={column.sortable ? () => handleSortingChange(column.accessorKey) : null}
                >
                  {column.header}  {getSortIcon(column.accessorKey)}
                </th>
              ))}
            </tr>

          </thead>
          <tbody>
            {
              tutorials.map((tutorial, index) =>
                <tr key={tutorial.id} onClick={() => setActiveTutorial(tutorial, index)}>
                  {columns.map((column) => (
                    <td key={column.accessorKey}>{tutorial[column.accessorKey]}</td>
                  ))
                  }

                </tr>
              )
            }
          </tbody>
        </table>

        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <select class="form-select form-select-sm" aria-label=".form-select-sm example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
        <button type="button" className="btn btn-primary" onClick={handleExportClick} ><i className="bi bi-0-square"></i>Export</button>
        

      </div>
      <div className="col-md-6">
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          {spinner ? <div className="spinner-border"></div> : <div></div>}
        </div>
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>


          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsList;
