import { useState } from "react";
import PropTypes from 'prop-types'
import React from 'react'
import CoreFunctions from "./CoreFunctions";
import { useAlert } from 'react-alert'
import ReactTooltip from 'react-tooltip';


function GetFilesOrDirectories(props) {
    const alert = useAlert()
    const [sourcePath, setText] = useState('')
    var [fetchResult, setResults] = useState({})
    const [error, setError] = useState('');
    var [initialLoad, setLoad] = useState(true)
    const [filterResults, setFilterResults] = useState('')
    const [loading, setLoading] = useState(false)

    var buttonText = '';
    if (props.isWebAPI === 'true') {
        buttonText = 'Directories'
    }
    if (props.isWebAPI === 'false') {
        buttonText = 'Files'
    }
    const onSubmit = (e) => {
        fetchResult = {}
        setError('')
        e.preventDefault()

        if (!sourcePath) {
            alert.show('I\'m not lazy, but I would need Source Directory Path to continue!')
            return
        }

        //console.log(props)
        var param = `${encodeURIComponent(sourcePath)}`;

        const fetchDataFromServer = async () => {
            try {
                var response;
                if (props.isWebAPI === 'true') {
                    response = await fetch(`${process.env.REACT_APP_NODEJS_PORT}loadDirectories?sourcePath=${param}`)
                }
                if (props.isWebAPI === 'false') {
                    response = await fetch(`${process.env.REACT_APP_NODEJS_PORT}loadFiles?sourcePath=${param}&extension=.ps1`)
                }
                if (response.ok) {
                    fetchResult = await response.json();
                    setLoad(false)
                    setResults(fetchResult)
                    //console.log(fetchResult[0])
                }
                else {
                    setLoad(false)
                    setResults(null)
                    //console.log(response.status)
                    setError('How did you get here? Oh, an invalid request or unexpected error occurred')
                }
            }
            catch (error) {
                setLoad(false)
                setResults(null)
                //console.log(error)
                setError('They\'re fairly regular, but this time an invalid request or unexpected error occurred')
            }
        }
        fetchDataFromServer();
    }

    const toggleSelected = (key) => {
        setResults(fetchResult.map((result) =>
            result.key === key ? { ...result, selected: !result.selected } : result))
    }

    const stopDotNetProcess = async () => {
        try {
            setError('')
            setLoading(true)

            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_NODEJS_PORT}killAllProcess?processName=dotnet.exe`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    setLoading(false)
                    console.log(result)
                    result.includes('terminated the process') ? alert.show('All \'dot net\' processes are terminated successfully') : alert.show('An error occurred while terminating processes or no processes are running')
                })
                .catch(error => {
                    setLoading(false)
                    console.log('error', error)
                    setError('We\'re testing your patience! but an invalid request or unexpected error occurred')
                });

        } catch (error) {
            setLoading(false)
            console.log(error)
            setError('Go ahead -- hold your breath! Oh no, invalid request or unexpected error occurred')
        }
    }

    return (
        <>
            <form className='add-form' onSubmit={onSubmit}>
                <div className="form-control">
                    <label>Source Directory</label>
                    <input type='text' placeholder="C:\Source" value={sourcePath} onChange={(e) => setText(e.target.value)} ></input>
                    <input type='submit' data-tip={`Get ${buttonText}`} value={`Get ${buttonText}`} className='btn btn-block'></input>
                </div>
            </form>
            {fetchResult?.length > 0 ?
                <div>
                    <input type='text' className='input input-left' placeholder="filter the results (lower case)" value={filterResults} onChange={(e) => setFilterResults(e.target.value)} ></input>
                    {props.isWebAPI === 'true' ? <button className="btn btn-rightCorner" data-tip="It is highly recommended to run this at the end" onClick={stopDotNetProcess} disabled={loading}>
                        {loading && (
                            <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                            />
                        )}
                        <span>Stop all "dot net" process</span>
                    </button> : <></>}
                    <div className='center'>
                        <p>{buttonText}</p>
                    </div><div className='task'>
                        {fetchResult.filter(result => result.path.toString().toLowerCase().includes(filterResults)).map((result) => (
                            <><label>  <h3><input type='checkbox' width={1} onChange={toggleSelected.bind(null, result.key)} checked={result.selected}></input>&nbsp;&nbsp;&nbsp;{result.path}</h3></label>
                                {result.selected.toString() === 'true' ? <CoreFunctions sourcePath={sourcePath} filePath={result.path} isWebAPI={props.isWebAPI}></CoreFunctions> : <></>}
                            </>
                        ))}
                    </div>
                    <ReactTooltip /></div> : (!initialLoad && fetchResult?.length < 1) ?
                    <div className='task'><h3>No files or directories found</h3></div>
                    : <></>}
            {error ? <div className='task'>
                <h3>{error}</h3>
            </div> : <></>}
        </>
    )
}

GetFilesOrDirectories.propTypes = {
    isWebAPI: PropTypes.string.isRequired
}

export default GetFilesOrDirectories