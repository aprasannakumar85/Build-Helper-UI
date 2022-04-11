import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import ReactTooltip from 'react-tooltip';

function CoreFunctions(props) {
    const alert = useAlert()
    const isWebAPI = props.isWebAPI.toString()
    const sourcePath = props.sourcePath.toString()
    const filePath = props.filePath.toString()
    const [error, setError] = useState('');
    var [loadFileEditResult, setLoadFileEditResult] = useState('')
    const [settingsFilePath, setSettingsFilePath] = useState('')
    const [msBuildPath, setMsBuildPath] = useState('C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Professional\\MSBuild\\Current\\Bin\\MSBuild.exe')
    const [slnPath, setSlnPath] = useState('')
    const [projDir, setProjDir] = useState('')
    const [portNumber, setPortNumber] = useState('')
    const [powerShellFilePath, setPowerShellFilePath] = useState(`${sourcePath}\\${filePath}`)
    const [loadingEditFile, setEditFile] = useState(false)
    const [loadingRunAPI, setRunAPI] = useState(false)
    const [loadingStopAPI, setStopAPI] = useState(false)
    const [loadingSaveFile, setSaveFile] = useState(false)
    var [loadAPIResult, setLoadAPIResult] = useState('')

    const RunAPI = async () => {
        try {
            setError('')
            setLoadAPIResult('')

            if (!msBuildPath && isWebAPI === 'true') {
                alert.show('Live long and prosper, and I would need MS build exe file\'s full path to continue!')
                return
            }

            if (!slnPath && isWebAPI === 'true') {
                alert.show('You seem like a nice person, but I would need solution file\'s full path to continue!')
                return
            }

            if (!projDir && isWebAPI === 'true') {
                alert.show('Your time is very important to me, so I would need project directory\'s path to continue!')
                return
            }

            setRunAPI(true)
            setLoadAPIResult('It\'s not you. It\'s me, please watch this space for updates...')
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "msBuildPath": msBuildPath,
                "slnPath": slnPath,
                "projDir": projDir
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_NODEJS_PORT}executeApi`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    //console.log(result)
                    setRunAPI(false)
                    setLoadAPIResult(result)
                })
                .catch(error => {
                    console.log('error', error)
                    setRunAPI(false)
                    setLoadAPIResult(error)
                });

        } catch (error) {
            setRunAPI(false)
            setLoadAPIResult(error)
            console.log(error)
            setError('This is not a joke, but it\'s an invalid request or unexpected error occurred')
        }
    }

    const stopAPI = async () => {
        try {
            setError('')
            setLoadAPIResult('')

            if (loadingStopAPI) {
                alert.show('As if you had any other choice! Please wait for a moment.')
                return
            }

            if (!portNumber && isWebAPI === 'true') {
                alert.show('That\'s a bummer, I would need the port number of the Web API to Stop it!')
                return
            }

            setStopAPI(true)
            setLoadAPIResult('Computing chance of success, please watch this space for updates...')
            var requestOptions = {
                method: 'POST',
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_NODEJS_PORT}killAPIprocess?processNumber=${portNumber}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    //console.log(result)
                    setStopAPI(false)
                    setLoadAPIResult(result)
                })
                .catch(error => {
                    console.log('error', error)
                    setStopAPI(false)
                    setLoadAPIResult(error)
                    setError('We\'re building the buildings as fast as we can, but an invalid request or unexpected error occurred')
                });

        } catch (error) {
            console.log(error)
            setStopAPI(false)
            setLoadAPIResult(error)
            setError('Where did all the internets go? Oh no, invalid request or unexpected error occurred')
        }
    }

    const LoadFileEdit = async () => {
        try {
            setLoadFileEditResult('')
            setError('')

            if (!settingsFilePath && isWebAPI === 'true') {
                alert.show('I swear it\'s almost done, but I would need launchSettings file\'s path to continue!')
                return
            }

            if (!powerShellFilePath && isWebAPI === 'false') {
                alert.show('Load it and they will come, but I would need the powershell\'s file path to continue!')
                return
            }

            setEditFile(true)

            var param = isWebAPI === 'true' ? `${encodeURIComponent(settingsFilePath)}` : `${encodeURIComponent(powerShellFilePath)}`;
            fetch(`${process.env.REACT_APP_NODEJS_PORT}loadSettings?settingsFilePath=${param}`)
                .then(response => response.text())
                .then(result => {
                    loadFileEditResult = result.toString();
                    loadFileEditResult = ValidateJSON(loadFileEditResult) ? JSON.stringify(JSON.parse(loadFileEditResult), undefined, 4) : loadFileEditResult;
                    setLoadFileEditResult(loadFileEditResult)
                    //console.log(result)
                    setEditFile(false)
                    alert.show('Looking for exact change? No problem, please scroll down!!')
                })
                .catch(error => {
                    setLoadFileEditResult('')
                    setError('Don\'t panic, an invalid request or unexpected error occurred')
                    console.log('error', error)
                    setEditFile(false)
                });
        }
        catch (error) {
            setLoadFileEditResult(error)
            //console.log(error)
            setError('Well, this is embarrassing, an invalid request or unexpected error occurred')
            setEditFile(false)
        }
    }

    const SaveFile = async () => {
        try {
            setError('')
            setLoadAPIResult('')

            if (!settingsFilePath && isWebAPI === 'true') {
                alert.show('I swear it\'s almost done, but I would need launchSettings file\'s path to continue!')
                return
            }

            if (loadFileEditResult === '' && isWebAPI === 'true') {
                alert.show('Are we there yet? NO, file\'s content is missing!')
                return
            }

            if (!ValidateJSON(loadFileEditResult)) {
                alert.show('I\'m sorry Dave, something is wrong with the file\'s content, please fix that to continue!')
                return
            }

            setSaveFile(true)
            setLoadAPIResult('I feel like I\'m supposed to be loading something, so  watch this space...')

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = loadFileEditResult;
            setLoadFileEditResult('')

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            var param = `${encodeURIComponent(settingsFilePath)}`
            fetch(`${process.env.REACT_APP_NODEJS_PORT}updateSettings?filePath=${param}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    //console.log(result)
                    setLoadAPIResult(result)
                    setSaveFile(false)
                    RunAPI()
                })
                .catch(error => {
                    console.log('error', error)
                    setSaveFile(false)
                    setLoadAPIResult(error)
                    setError('Invalid request or unexpected error occurred, please check the JSON file and try again')
                });
        } catch (error) {
            setLoadAPIResult(error)
            console.log(error)
            setError('The bits are not flowing, maybe because it\'s an invalid request or unexpected error occurred')
            setSaveFile(false)
        }
    }

    const RunPScontent = async () => {
        try {
            setError('')
            setLoadAPIResult('')

            if (!powerShellFilePath && isWebAPI === 'false') {
                alert.show('Load it and they will come, but I would need the powershell\'s file path to continue!')
                return
            }
            setRunAPI(true)
            setLoadAPIResult('Get some coffee, come back and watch this space...')

            var requestOptionsGet = {
                method: 'GET',
                redirect: 'follow'
            };

            var param = `${encodeURIComponent(powerShellFilePath)}`;
            var fileContent = ''
            await fetch(`${process.env.REACT_APP_NODEJS_PORT}loadSettings?settingsFilePath=${param}`, requestOptionsGet)
                .then(response => response.text())
                .then(result => fileContent = result)
                .catch(error => {
                    console.log('error', error)
                    setError('Don\'t panic, an invalid request or unexpected error occurred')
                    setRunAPI(false)
                });

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");

            if (fileContent === '') {
                setLoadAPIResult('Well, this is embarrassing. File\'s content is missing, please check the path!')
                setRunAPI(false)
                return
            }

            var raw = fileContent;

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch(`${process.env.REACT_APP_NODEJS_PORT}executePowerShell`, requestOptions)
                .then(response => response.text())
                .then(result => {
                    console.log(result)
                    setLoadAPIResult(result)
                    setRunAPI(false)
                })
                .catch(error => {
                    console.log('error', error)
                    setRunAPI(false)
                    setLoadAPIResult(error)
                });


        } catch (error) {
            setLoadAPIResult(error)
            console.log(error)
            setError('The bits are not flowing, maybe because it\'s an invalid request or unexpected error occurred')
            setRunAPI(false)
        }
    }

    function ValidateJSON(json) {
        try {
            JSON.parse(json)
        } catch (e) {
            return false
        }
        return true
    }

    return (
        <>
            <div className='container'>
                <div>
                    <div>
                        {isWebAPI === 'true' ? <button className="btn btn-edit" data-tip="click to edit the launchSettings.json" onClick={LoadFileEdit} disabled={loadingEditFile}>
                            {loadingEditFile && (
                                <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                />
                            )}
                            <span>{`Edit ${isWebAPI === 'true' ? 'Settings File' : 'File'}`}</span>
                        </button> : <></>}
                        <button className="btn btn-run" data-tip="click to execute/run" onClick={isWebAPI === 'true' ? RunAPI : RunPScontent} disabled={loadingRunAPI}>
                            {loadingRunAPI && (
                                <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                />
                            )}
                            <span>{`Run ${isWebAPI === 'true' ? 'API' : 'File'}`}</span>
                        </button>
                        {isWebAPI === 'true' ? <button className="btn btn-stop" data-tip="click to stop the API" onClick={stopAPI} disabled={loadingStopAPI}>
                            {loadingStopAPI && (
                                <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                />
                            )}
                            <span>Stop the API</span>
                        </button> : <></>}
                        {loadAPIResult?.length > 0 ?
                            <div><textarea readOnly={true} value={loadAPIResult} className='textareaSmall' spellCheck="false" />
                                <button className="btn btn-stop" data-tip="close the output text field" onClick={() => setLoadAPIResult('')}><span>Close</span>&nbsp;&nbsp;&nbsp;<i
                                    className="fa fa-solid fa-arrow-up"
                                    style={{ marginRight: "5px" }}
                                /></button><ReactTooltip />
                            </div> : <></>}
                    </div>
                </div>

                <div className='add-form'>
                    <div className="form-control">
                        {isWebAPI === 'true' ? <><input type='text' placeholder="launchSettings.json" value={settingsFilePath} onChange={(e) => setSettingsFilePath(e.target.value)}></input><span className='span'>e.g.,C:\Source\api\Medications\Properties\launchSettings.json</span>
                            <input type='text' placeholder="MS build exe full path" value={msBuildPath} onChange={(e) => setMsBuildPath(e.target.value)}></input><span className='span'>MS build exe full path</span>
                            <input type='text' placeholder=".sln file full path" value={slnPath} onChange={(e) => setSlnPath(e.target.value)}></input>
                            <input type='text' placeholder=".csProj file directory's path" value={projDir} onChange={(e) => setProjDir(e.target.value)}></input><span className='span'>e.g.,C:\Source\api\Medications</span>
                            <input type='text' placeholder="web API port number. e.g., 63182" value={portNumber} onChange={(e) => setPortNumber(e.target.value)}></input><span className='span'>Port Number is required to stop</span>
                            <div className="about-section-small">
                                <p>Please note that this tool does not use IIS Express but dotnet CLI. So, the Port Number should be taken from API's profile (not IIS Express)  </p>
                            </div></> :
                            <>
                                <input type='text' placeholder=".ps1 file full path" value={powerShellFilePath} onChange={(e) => setPowerShellFilePath(e.target.value)}></input>
                                <span className='span'>please verify the path</span>
                            </>}
                    </div>
                </div>
                {error ? <div className='task'>
                    <h3>{error}</h3>
                </div> : <></>}
            </div>
            {loadFileEditResult?.length > 0 && isWebAPI === 'true' ? <div className='task'>
                <button className="btn btn-run" data-tip="Save and run the API" disabled={loadingSaveFile} onClick={SaveFile}>
                    {loadingSaveFile && (
                        <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                        />
                    )}
                    <span>{'Save & Run API'}</span>
                </button>
                <input type='button' value='Cancel' data-tip="close the result text field" className='btn btn-edit' onClick={() => setLoadFileEditResult('')} />
                <textarea readOnly={false} value={loadFileEditResult} className='textareaLarge' spellCheck="false" onChange={(e) => setLoadFileEditResult(e.target.value)} />
                <ReactTooltip /></div> : <></>}
            <ReactTooltip />
        </>
    )
}

export default CoreFunctions